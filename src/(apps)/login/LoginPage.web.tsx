import { useState } from "react";
import { View, Text, TextInput, Pressable, Image } from "react-native";
import { Link } from "expo-router";
import { McEyeCloseLineIcon, McEyeLineIcon } from "@/components/icons";
import { useStudentLoginMutation } from "@/queries/auth/auth.query";
import { useAuthStore } from "@/stores/auth-store";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saveId, setSaveId] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { setAccessToken } = useAuthStore();
  const { mutateAsync: studentLogin, isPending } = useStudentLoginMutation();

  const handleLogin = async () => {
    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("올바른 아이디 혹은 이메일 주소를 입력해주세요.");
      return;
    }
    if (!password.trim()) {
      setPasswordError("비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await studentLogin({ email, password });
      setAccessToken(response.access_token);
    } catch {
      setPasswordError("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-[#090909] px-4 sm:px-6">
      {/* 로고 + 부제 */}
      <View className="mb-8 items-center gap-3 lg:mb-10">
        <View className="flex-row items-center gap-3 lg:gap-5">
          <Image
            source={require("@assets/favicon.png")}
            style={{ width: 32, height: 39 }}
            className="lg:h-[47px] lg:w-[39px]"
            resizeMode="contain"
          />
          <Text
            style={{ fontFamily: "Montserrat-SemiBold" }}
            className="text-[28px] tracking-tight text-[#ff3d3d] lg:text-[40px]"
          >
            Super Learn
          </Text>
        </View>
        <Text className="font-sans text-[16px] text-[#b7b7b7] lg:text-[20px]">
          AI 기반 차세대 학습 플랫폼
        </Text>
      </View>

      {/* 로그인 카드 */}
      <View className="w-full max-w-[472px] rounded-xl bg-[#222] p-6 lg:p-10">
        <View className="items-center gap-5 lg:gap-7">
          {/* 제목 */}
          <Text className="font-bold text-[20px] text-white lg:text-[22px]">로그인</Text>

          {/* 입력 영역 */}
          <View className="w-full gap-1">
            {/* 이메일 */}
            <View className="w-full gap-2.5">
              <Text className="font-semibold text-[14px] text-white">이메일</Text>
              <View>
                <TextInput
                  className="h-[42px] w-full rounded bg-[#1c1c1c] px-3 font-sans text-[16px] text-white"
                  placeholder="아이디 혹은 이메일 주소를 입력해주세요."
                  placeholderTextColor="#8e8e8e"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={handleLogin}
                />
                {emailError ? (
                  <View className="px-1 py-0.5">
                    <Text className="font-sans text-[12px] text-[#ff5b5c]">
                      {emailError}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>

            {/* 비밀번호 */}
            <View className="w-full gap-2.5">
              <Text className="font-semibold text-[14px] text-white">비밀번호</Text>
              <View>
                <View className="h-[42px] w-full flex-row items-center rounded bg-[#1c1c1c] px-3">
                  <TextInput
                    className="flex-1 font-sans text-[16px] text-white"
                    placeholder="비밀번호를 입력해주세요."
                    placeholderTextColor="#8e8e8e"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={handleLogin}
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <McEyeLineIcon width={21} height={21} color="#8e8e8e" />
                    ) : (
                      <McEyeCloseLineIcon width={21} height={21} color="#8e8e8e" />
                    )}
                  </Pressable>
                </View>
                {passwordError ? (
                  <View className="px-1 py-0.5">
                    <Text className="font-sans text-[12px] text-[#ff5b5c]">
                      {passwordError}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </View>

          {/* 로그인 버튼 */}
          <View className="w-full gap-3">
            <Pressable
              className="h-[44px] w-full items-center justify-center rounded-lg bg-[#ff0a0a]"
              onPress={handleLogin}
              disabled={isPending}
            >
              <Text className="font-semibold text-[16px] text-white">
                {isPending ? "로그인 중..." : "로그인"}
              </Text>
            </Pressable>

            {/* 하단 옵션 */}
            <View className="w-full flex-row items-center justify-between">
              <Pressable
                className="flex-row items-center gap-2 py-0.5"
                onPress={() => setSaveId(!saveId)}
              >
                <View
                  className={`h-[18px] w-[18px] rounded-sm border border-[rgba(221,221,221,0.87)] ${
                    saveId ? "bg-[#ff0a0a]" : "bg-[#3b3b3b]"
                  }`}
                />
                <Text className="font-medium text-[14px] text-[#949494]">
                  아이디 저장
                </Text>
              </Pressable>

              <View className="flex-row items-center gap-2">
                <Link href="/" asChild>
                  <Pressable>
                    <Text className="font-medium text-[14px] text-[#949494]">
                      회원가입
                    </Text>
                  </Pressable>
                </Link>
                <Text className="font-medium text-[14px] text-[#949494]">/</Text>
                <Link href="/" asChild>
                  <Pressable>
                    <Text className="font-medium text-[14px] text-[#949494]">
                      비밀번호 찾기
                    </Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
