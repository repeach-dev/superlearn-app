import { useEffect, useRef } from "react";
import { View } from "react-native";

interface RepeachPlayerProps {
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

function generateHash(params: Record<string, string | number>) {
  const json = JSON.stringify(params);
  return btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export default function RepeachPlayer({
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

  // SDK 스크립트 로드
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 이미 로드되어 있으면 스킵
    if ((window as any).RepeachPlayer) {
      initPlayer();
      return;
    }

    const script = document.createElement("script");
    script.src = SDK_URL;
    script.onload = () => initPlayer();
    document.head.appendChild(script);

    return () => {
      // cleanup: 플레이어 인스턴스 정리
      playerRef.current = null;
    };
  }, [contentId]);

  // iframe src 설정 + SDK 초기화
  const initPlayer = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const hash = generateHash({
      key: contentId,
      classId,
      userId,
      userPk,
      maxSessions,
      t: Date.now(),
    });

    iframe.src = `https://gcdn.repeach.net/api/player/basic/${hash}`;

    const RPlayer = (window as any).RepeachPlayer;
    if (!RPlayer) return;

    const player = new RPlayer(iframe);
    playerRef.current = player;
    player.on("ready", () => onReady?.());
    player.on("play", () => onPlay?.());
    player.on("pause", () => onPause?.());
    player.on("ended", () => onEnded?.());
    player.on("timeupdate", (data: { currentTime: number; duration: number }) => {
      onTimeUpdate?.(data.currentTime, data.duration);
    });
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
