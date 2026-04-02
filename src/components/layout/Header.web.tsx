import { useState } from "react";
import { View, Text, Pressable, Image, StyleProp, ViewStyle, Button } from "react-native";
import { Link, router, usePathname } from "expo-router";
import { MoonIcon, SettingsIcon, UserIcon, McBellRingingLineIcon } from "@/components/icons";
import { isElectron } from "@/utils/platform";
import { NAV_ITEMS, ICON, LOGO } from "@/constants/header";
import axios from "@/api/default-client";
import { usePlayerStore } from "@/stores/player-store";
import ErrorModal from "@/components/ui/ErrorModal";
import {
  headerContainer,
  headerLeftGroup,
  navGroup,
  iconGroup,
  profileButton,
  navItem,
  navText,
  iconButton,
  badge,
  badgeText,
  logoutText,
} from "@/styles/header.variants";
import { useAuthStore } from "@/stores/auth-store";
import { useStudentLoginMutation } from "@/queries/auth/auth.query";
import { useAuthHooks } from "@/hooks/use-auth-hooks";
import { useMyStore } from "@/stores/my.store";
import { useThemeStore } from "@/stores/theme-store";


const P = isElectron ? "electron" : "web";
const dragStyle = isElectron
  ? ({ WebkitAppRegion: "drag" } as unknown as StyleProp<ViewStyle>)
  : undefined;
const noDragStyle = isElectron
  ? ({ WebkitAppRegion: "no-drag" } as unknown as StyleProp<ViewStyle>)
  : undefined;

export default function Header() {
  const pathname = usePathname();
  const { authLogout } = useAuthHooks();
  const { getMyInfo } = useMyStore();
  const myInfo = getMyInfo();
  const [showLoginError, setShowLoginError] = useState(false);
  const { theme, toggleTheme } = useThemeStore();
  return (
    <View className={headerContainer({ platform: P })} style={dragStyle}>
      <View className={headerLeftGroup({ platform: P })} style={noDragStyle}>
        <Link href="/" asChild>
          <Pressable
            className="flex-row items-center"
            accessibilityRole="link"
            aria-label="홈으로 이동"
          >
            <Image source={require("@assets/logo.png")} style={LOGO[P]} resizeMode="contain" />
          </Pressable>
        </Link>

        <View className={navGroup({ platform: P })}>
          {NAV_ITEMS.map(({ label, href }) => {
            const isActive = pathname === href.replace("/(main)", "");
            return (
              <Link key={href} href={href as `/${string}`} asChild>
                <Pressable
                  className={navItem({ active: isActive, platform: P })}
                  style={{ borderCurve: "continuous" }}
                  accessibilityRole="link"
                  aria-label={label}
                >
                  <Text className={navText({ active: isActive, platform: P })}>{label}</Text>
                </Pressable>
              </Link>
            );
          })}
          {/* 플레이어 테스트용 */}
          <Pressable
            onPress={() => {
              if (!myInfo?._id || !myInfo?.email) {
                setShowLoginError(true);
                return;
              }
              usePlayerStore.getState().setPlayerParams({
                contentHash: "135b5aaf012bd123aec76ce8c6d4b60aede31593fbd29dad603d715462a6625b" + ".mp4",
                userId: myInfo.email,
                userPk: myInfo._id,
                packageProductId: "13",
                courseId: "12",
                contentId: "",
              });
              router.push("/player");
            }}
            className={navItem({ active: pathname.includes("/player"), platform: P })}
            style={{ borderCurve: "continuous" }}
            accessibilityRole="link"
            aria-label={"플레이어"}
          >
            <Text className={navText({ active: pathname.includes("/player"), platform: P })}>{"플레이어"}</Text>
          </Pressable>
        </View>
      </View>

      <View className={iconGroup({ platform: P })} style={noDragStyle}>
        <Pressable
          accessibilityRole="button"
          aria-label="다크모드 전환"
          className={iconButton({ platform: P })}
          style={{ borderCurve: "continuous" }}
          onPress={toggleTheme}
        >
          <Text>{theme === "dark" ? "☀️" : "🌙"}</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          aria-label="알림"
          className={iconButton({ platform: P })}
          style={{ borderCurve: "continuous" }}
        >
          <McBellRingingLineIcon width={ICON.size[P]} height={ICON.size[P]} color={ICON.color} />
          <View className={badge({ platform: P })}>
            <Text className={badgeText({ platform: P })} style={{ fontVariant: ["tabular-nums"] }}>
              2
            </Text>
          </View>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          aria-label="설정"
          className={iconButton({ platform: P })}
          style={{ borderCurve: "continuous" }}
        >
          <SettingsIcon width={ICON.size[P]} height={ICON.size[P]} color={ICON.color} />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          aria-label="프로필"
          className={profileButton({ platform: P })}
          style={{ borderCurve: "continuous" }}
        >
          <UserIcon width={ICON.size[P]} height={ICON.size[P]} color={ICON.color} />
        </Pressable>

        <Pressable accessibilityRole="button" aria-label="로그아웃" className="ml-2 pl-2">
          <Text className={logoutText({ platform: P })} onPress={authLogout}>로그아웃</Text>
        </Pressable>
      </View>

      <ErrorModal
        visible={showLoginError}
        message="로그인이 필요한 서비스입니다."
        redirectPath="/login"
      />
    </View>
  );
}
