import { Tabs } from "expo-router";
import { Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function TabsLayout() {
  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerShown: true,
          headerTitleStyle: { fontWeight: "700" },
          tabBarActiveTintColor: "#ef4444",
          tabBarInactiveTintColor: "#9ca3af",
          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: "#f3f4f6",
          },
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
          },
        }}
      >
        <Tabs.Screen
          name="classroom"
          options={{
            title: "나의 강의실",
            tabBarLabel: "강의실",
            tabBarIcon: ({ color }) => (
              <Text style={{ color, fontSize: 20 }}>📚</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="clips"
          options={{
            title: "나의 클립",
            tabBarLabel: "클립",
            tabBarIcon: ({ color }) => (
              <Text style={{ color, fontSize: 20 }}>🎬</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="resources"
          options={{
            title: "학습 자료실",
            tabBarLabel: "자료실",
            tabBarIcon: ({ color }) => (
              <Text style={{ color, fontSize: 20 }}>📁</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="assignments"
          options={{
            title: "과제 제출",
            tabBarLabel: "과제",
            tabBarIcon: ({ color }) => (
              <Text style={{ color, fontSize: 20 }}>📝</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="notices"
          options={{
            title: "공지사항",
            tabBarLabel: "공지",
            tabBarIcon: ({ color }) => (
              <Text style={{ color, fontSize: 20 }}>📢</Text>
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
