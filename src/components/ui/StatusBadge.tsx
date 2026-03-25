import { View, Text } from "react-native";

type StatusType = "미확인" | "완전 이해" | "이해 안됨" | "보통";

interface StatusBadgeProps {
  status: StatusType;
}

const STATUS_STYLES: Record<StatusType, { bg: string; border: string; text: string }> = {
  "미확인": {
    bg: "transparent",
    border: "#bababa",
    text: "#bababa",
  },
  "완전 이해": {
    bg: "rgba(0,167,111,0.15)",
    border: "#00a76f",
    text: "#00feaa",
  },
  "이해 안됨": {
    bg: "rgba(238,0,0,0.1)",
    border: "#be3535",
    text: "#ff4a4a",
  },
  "보통": {
    bg: "rgba(245,158,11,0.15)",
    border: "#c07900",
    text: "#f59e0b",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const style = STATUS_STYLES[status];

  return (
    <View
      style={{
        backgroundColor: style.bg,
        borderColor: style.border,
        borderWidth: 1,
      }}
      className="items-center justify-center rounded-md px-2.5 py-1 lg:rounded-lg lg:px-2.5 lg:py-1.5"
    >
      <Text
        style={{ color: style.text }}
        className="text-[11px] font-normal lg:text-[16px]"
      >
        {status}
      </Text>
    </View>
  );
}
