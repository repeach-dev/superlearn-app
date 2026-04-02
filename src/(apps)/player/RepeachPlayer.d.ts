import { ComponentType } from "react";

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

declare const RepeachPlayer: ComponentType<RepeachPlayerProps>;
export default RepeachPlayer;
