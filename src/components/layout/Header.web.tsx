import { View, Text, Pressable, Image, StyleProp, ViewStyle } from "react-native";
import { Link, usePathname } from "expo-router";
import {
  MoonIcon,
  SettingsIcon,
  UserIcon,
  McBellRingingLineIcon,
} from "@/components/icons";
import { isElectron } from "@/utils/platform";
import { NAV_ITEMS, ICON, LOGO } from "@/constants/header";
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

const P = isElectron ? "electron" : "web";
const dragStyle = isElectron
  ? ({ WebkitAppRegion: "drag" } as unknown as StyleProp<ViewStyle>)
  : undefined;
const noDragStyle = isElectron
  ? ({ WebkitAppRegion: "no-drag" } as unknown as StyleProp<ViewStyle>)
  : undefined;

export default function Header() {
  const pathname = usePathname();

  return (
    <View className={headerContainer({ platform: P })} style={dragStyle}>
      <View className={headerLeftGroup({ platform: P })} style={noDragStyle}>
        <Link href="/" asChild>
          <Pressable
            className="flex-row items-center"
            accessibilityRole="link"
            aria-label="홈으로 이동"
          >
            <Image
              source={require("@assets/logo.png")}
              style={LOGO[P]}
              resizeMode="contain"
            />
          </Pressable>
        </Link>

        <View className={navGroup({ platform: P })}>
          {NAV_ITEMS.map(({ label, href }) => {
            const isActive = pathname === href.replace("/(tabs)", "");
            return (
              <Link key={href} href={href as `/${string}`} asChild>
                <Pressable
                  className={navItem({ active: isActive, platform: P })}
                  style={{ borderCurve: "continuous" }}
                  accessibilityRole="link"
                  aria-label={label}
                >
                  <Text className={navText({ active: isActive, platform: P })}>
                    {label}
                  </Text>
                </Pressable>
              </Link>
            );
          })}
        </View>
      </View>

      <View className={iconGroup({ platform: P })} style={noDragStyle}>
        <Pressable
          accessibilityRole="button"
          aria-label="다크모드 전환"
          className={iconButton({ platform: P })}
          style={{ borderCurve: "continuous" }}
        >
          <MoonIcon
            width={ICON.size[P]}
            height={ICON.size[P]}
            color={ICON.color}
          />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          aria-label="알림"
          className={iconButton({ platform: P })}
          style={{ borderCurve: "continuous" }}
        >
          <McBellRingingLineIcon
            width={ICON.size[P]}
            height={ICON.size[P]}
            color={ICON.color}
          />
          <View className={badge({ platform: P })}>
            <Text
              className={badgeText({ platform: P })}
              style={{ fontVariant: ["tabular-nums"] }}
            >
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
          <SettingsIcon
            width={ICON.size[P]}
            height={ICON.size[P]}
            color={ICON.color}
          />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          aria-label="프로필"
          className={profileButton({ platform: P })}
          style={{ borderCurve: "continuous" }}
        >
          <UserIcon
            width={ICON.size[P]}
            height={ICON.size[P]}
            color={ICON.color}
          />
        </Pressable>

        <Pressable
          accessibilityRole="button"
          aria-label="로그아웃"
          className="ml-2 pl-2"
        >
          <Text className={logoutText({ platform: P })}>로그아웃</Text>
        </Pressable>
      </View>
    </View>
  );
}
