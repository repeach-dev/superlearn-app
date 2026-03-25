import { View, Text } from "react-native";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <View className="gap-1">
      <Text className="text-[20px] font-semibold text-white lg:text-[28px]">
        {title}
      </Text>
      {subtitle ? (
        <Text className="text-[13px] text-[#bababa] lg:text-[18px]">
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
