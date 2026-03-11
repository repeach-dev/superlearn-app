import './global.css';
import { StatusBar } from 'expo-status-bar';
import { Text, View, Platform } from 'react-native';

// Electron API type declaration
declare global {
  interface Window {
    electronAPI?: {
      isElectron: boolean;
      getPlatform: () => Promise<{ platform: string; version: string; electron: string }>;
      getAppPath: () => Promise<string>;
    };
  }
}

function getPlatformInfo(): { name: string; emoji: string } {
  // Check Electron first (web environment with electronAPI)
  if (Platform.OS === 'web' && typeof window !== 'undefined' && window.electronAPI?.isElectron) {
    return { name: 'Electron (Desktop)', emoji: '🖥️' };
  }

  switch (Platform.OS) {
    case 'ios':
      return { name: 'iOS', emoji: '📱' };
    case 'android':
      return { name: 'Android', emoji: '🤖' };
    case 'web':
      return { name: 'Web', emoji: '🌐' };
    default:
      return { name: Platform.OS, emoji: '❓' };
  }
}

export default function App() {
  const platformInfo = getPlatformInfo();

  return (
    <View className="flex-1 bg-[#1a1a2e] items-center justify-center p-5">
      <Text className="text-6xl mb-5">{platformInfo.emoji}</Text>
      <Text className="text-3xl font-bold text-white mb-2">SuperLearn</Text>
      <Text className="text-base text-gray-400 mb-8 text-center">
        AI-Powered Smart Learning Platform
      </Text>
      <View className="bg-[#4a4a6a] px-5 py-2.5 rounded-full mb-5">
        <Text className="text-[#00d4ff] text-sm font-semibold">
          Running on: {platformInfo.name}
        </Text>
      </View>
      <Text className="text-gray-500 text-xs">v1.0.0 - PoC Build</Text>
      <StatusBar style="auto" />
    </View>
  );
}
