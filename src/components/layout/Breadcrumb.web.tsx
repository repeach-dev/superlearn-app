import { View, Text, Pressable } from "react-native";
import { isElectron } from "@/utils/platform";
import {
  breadcrumbContainer,
  breadcrumbInner,
  breadcrumbText,
  breadcrumbSeparator,
  breadcrumbCurrent,
} from "@/styles/header.variants";

const P = isElectron ? "electron" : "web";

export default function Breadcrumb() {
  return (
    <View className={breadcrumbContainer({ platform: P })}>
      <View className={breadcrumbInner({ platform: P })}>
        <Pressable accessibilityRole="link" aria-label="나의 강의실로 이동">
          <Text className={breadcrumbText({ platform: P })}>나의 강의실</Text>
        </Pressable>
        <Text className={breadcrumbSeparator({ platform: P })}>{">"}</Text>
        <Text className={breadcrumbCurrent({ platform: P })}>나의 클립</Text>
      </View>
    </View>
  );
}
