import { Pressable, Text } from "react-native";

interface FilterChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export default function FilterChip({ label, active = false, onPress }: FilterChipProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`items-center justify-center rounded-full px-3 py-1.5 lg:px-4 lg:py-1 ${
        active
          ? "bg-[#fc3d46]"
          : "bg-[#515151]"
      }`}
    >
      <Text
        className={`text-[12px] font-medium lg:text-[18px] ${
          active ? "text-white" : "text-white"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
