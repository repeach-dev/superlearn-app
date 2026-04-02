import { View, Text, Pressable, Modal } from "react-native";
import { useRouter } from "expo-router";

interface ErrorModalProps {
  visible: boolean;
  title?: string;
  message: string;
  redirectPath?: string;
  buttonText?: string;
}

export default function ErrorModal({
  visible,
  title = "페이지 오류",
  message,
  redirectPath = "/",
  buttonText = "확인",
}: ErrorModalProps) {
  const router = useRouter();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/60">
        <View className="mx-4 w-full max-w-[320px] rounded-xl bg-[#1a1a2e] p-6">
          <Text className="mb-2 text-center text-lg font-bold text-[#1a1a1a] dark:text-white">
            {title}
          </Text>
          <Text className="mb-6 text-center text-sm text-[#9ca3af]">
            {message}
          </Text>
          <Pressable
            className="items-center rounded-lg bg-[#ff3b3b] py-3"
            onPress={() => router.replace(redirectPath as `/${string}`)}
          >
            <Text className="font-semibold text-[#1a1a1a] dark:text-white">{buttonText}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
