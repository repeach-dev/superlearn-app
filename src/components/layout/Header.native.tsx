import { View, Text, Button } from "react-native";
import axios from "@/api/default-client";
import { useStudentLoginMutation } from "@/queries/auth/auth.query";

export default function Header() {
  const { mutateAsync: studentLogin } = useStudentLoginMutation();
  const apitest = async () => {
    try {
      const response = await studentLogin({
        email: "repeach_demo",
        password: "123123123",
      },{
        onSuccess: (data) => {
          console.log("data: ", data)
        },
        onError: (error) => {
          console.log("error: ", error)
        }
      });
  // setAccessToken(response.data.access_token);
      // window.location.href = '/';
    } catch (error) {
      console.log('err: ', error)
      alert('err');
    }
  }
  return (
    <View className="items-center border-b border-slate-200 bg-white px-4 py-3">
      <Text className="font-bold text-lg text-orange-500">Super Learn</Text>
      <Button title="test" onPress={apitest} />
    </View>
  );
}
