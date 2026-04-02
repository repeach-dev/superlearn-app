import "../global.css";
import { useEffect } from "react";
import { View } from "react-native";
import { Stack, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import MainLayout from "@/components/_layout";
import { useAuthStore } from "@/stores/auth-store";
import { useThemeStore } from "@/stores/theme-store";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { accessToken } = useAuthStore();
  const { theme } = useThemeStore();
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    "Pretendard-Thin": require("@assets/fonts/pretendard/Pretendard-Thin.ttf"),
    "Pretendard-ExtraLight": require("@assets/fonts/pretendard/Pretendard-ExtraLight.ttf"),
    "Pretendard-Light": require("@assets/fonts/pretendard/Pretendard-Light.ttf"),
    "Pretendard-Regular": require("@assets/fonts/pretendard/Pretendard-Regular.ttf"),
    "Pretendard-Medium": require("@assets/fonts/pretendard/Pretendard-Medium.ttf"),
    "Pretendard-SemiBold": require("@assets/fonts/pretendard/Pretendard-SemiBold.ttf"),
    "Pretendard-Bold": require("@assets/fonts/pretendard/Pretendard-Bold.ttf"),
    "Pretendard-ExtraBold": require("@assets/fonts/pretendard/Pretendard-ExtraBold.ttf"),
    "Pretendard-Black": require("@assets/fonts/pretendard/Pretendard-Black.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const segments = useSegments();

  useEffect(() => {
    if (!fontsLoaded) return;
    const inLoginPage = segments[0] === "login";

    if (!accessToken && !inLoginPage) {
      router.replace("/login");
    } else if (accessToken && inLoginPage) {
      router.replace("/");
    }
  }, [fontsLoaded, accessToken, segments]);

  // 웹: document.documentElement에 dark 클래스 적용
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  if (!fontsLoaded) return null;

  return (
    <View className="flex-1">
      <MainLayout>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(main)" />
        </Stack>
      </MainLayout>
    </View>
  );
}
