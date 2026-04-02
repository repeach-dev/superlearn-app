import { useEffect, useRef } from "react";
import { View } from "react-native";

interface RepeachPlayerProps {
  contentHash: string;
  contentId: string;
  userId: string;
  userPk: string;
  classId: string;
  maxSessions?: string;
  onReady?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
}

const SDK_URL =
  "https://gcdn.repeach.net/api/player/sdk/repeach-player-sdk.js";

// SDK가 window에 등록되지 않으므로 fetch 후 수동으로 전역 등록
async function loadSDK(): Promise<void> {
  if ((window as any).RepeachPlayer) return;
  const res = await fetch(SDK_URL);
  const code = await res.text();
  const fn = new Function(code + "\nwindow.RepeachPlayer = RepeachPlayer;");
  fn();
}

function generateHash(params: Record<string, string | number>) {
  const json = JSON.stringify(params);
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export default function RepeachPlayer({
  contentHash,
  contentId,
  userId,
  userPk,
  classId,
  maxSessions = "1",
  onReady,
  onPlay,
  onPause,
  onEnded,
  onTimeUpdate,
}: RepeachPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<any>(null);

  // SDK 로드 + 플레이어 초기화
  useEffect(() => {
    if (typeof window === "undefined" || !contentHash) return;
    let cancelled = false;

    loadSDK().then(() => {
      if (!cancelled) initPlayer();
    });

    return () => { cancelled = true; playerRef.current = null; };
  }, [contentHash]);

  // iframe src 설정 + SDK 초기화
  const initPlayer = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // 1. SDK 인스턴스 먼저 생성 + 이벤트 등록 (ready를 놓치지 않기 위해)
    const RPlayer = (window as any).RepeachPlayer;
    if (!RPlayer) return;
    const player = new RPlayer("#repeach-iframe");
    playerRef.current = player;

    player.on("ready", () => {
      // ready 후 자막 주입
      const subtitleSrc = `${process.env.EXPO_PUBLIC_API_URL}/api/v1/student-classroom/subtitles/${contentId}/vtt?language=ko`;
      player.setSubtitles([
        { src: subtitleSrc, lang: "ko", label: "한국어" },
      ]);
      onReady?.();
    });
    player.on("play", () => onPlay?.());
    player.on("pause", () => onPause?.());
    player.on("ended", () => onEnded?.());
    player.on("timeupdate", (data: { currentTime: number; duration: number }) => {
      onTimeUpdate?.(data.currentTime, data.duration);
    });

    // 2. 이벤트 등록 완료 후 iframe src 설정 (이제 ready를 받을 준비 됨)
    const hash = generateHash({
      key: contentHash,
      classId,
      userId,
      userPk,
      maxSessions,
      t: Date.now(),
    });
    iframe.src = `https://gcdn.repeach.net/api/player/basic/${hash}`;
  };

  return (
    <View className="aspect-video w-full bg-black">
      <iframe
        ref={iframeRef}
        id="repeach-iframe"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
        }}
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    </View>
  );
}
