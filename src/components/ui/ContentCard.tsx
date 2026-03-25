import { View, Text, Image, Pressable, ImageSourcePropType } from "react-native";
import { ReactNode } from "react";

interface ContentCardProps {
  title: string;
  subtitle?: string;
  thumbnail?: ImageSourcePropType;
  duration?: string;
  footer?: ReactNode;
  onPress?: () => void;
}

export default function ContentCard({
  title,
  subtitle,
  thumbnail,
  duration,
  footer,
  onPress,
}: ContentCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="w-full overflow-hidden rounded-xl bg-[#222] lg:flex-row lg:rounded-[15px]"
    >
      {/* 썸네일: 모바일 상단, PC 좌측 */}
      {thumbnail ? (
        <View className="relative h-[128px] w-full lg:h-[151px] lg:w-[234px]">
          <Image
            source={thumbnail}
            className="h-full w-full"
            resizeMode="cover"
          />
          {duration ? (
            <View className="absolute bottom-2 right-2 rounded bg-[rgba(0,0,0,0.7)] px-1.5 py-0.5">
              <Text className="text-[11px] text-white lg:text-[14px]">
                {duration}
              </Text>
            </View>
          ) : null}
        </View>
      ) : null}

      {/* 콘텐츠 영역 */}
      <View className="flex-1 gap-1.5 p-4 lg:px-6 lg:py-5">
        <View className="gap-2">
          <Text className="text-[14px] font-semibold text-white lg:text-[20px]">
            {title}
          </Text>
          {subtitle ? (
            <Text className="text-[12px] text-[#bababa] lg:text-[16px]">
              {subtitle}
            </Text>
          ) : null}
        </View>
        {footer ? (
          <View className="pt-3">{footer}</View>
        ) : null}
      </View>
    </Pressable>
  );
}
