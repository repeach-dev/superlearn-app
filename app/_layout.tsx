import "../global.css";
import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import MainLayout from "@/components/_layout";
import { useAuthStore } from "@/stores/auth-store";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { accessToken } = useAuthStore();
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

  if (!fontsLoaded) return null;

  return (
    <MainLayout>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(main)" />
      </Stack>
    </MainLayout>
  );
}
