import { Pressable, Text } from "react-native";
import { ReactNode } from "react";

interface ActionButtonProps {
  label: string;
  onPress?: () => void;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export default function ActionButton({
  label,
  onPress,
  icon,
  variant = "primary",
  disabled = false,
}: ActionButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`flex-row items-center justify-center gap-1 rounded-lg px-4 py-2 lg:px-5 lg:py-2 ${
        variant === "primary"
          ? "bg-[#fc3d46]"
          : "bg-[#353535]"
      } ${disabled ? "opacity-50" : ""}`}
    >
      {icon}
      <Text
        className={`text-[12px] font-medium lg:text-[18px] ${
          variant === "primary" ? "text-white" : "text-[#e6e7eb]"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
