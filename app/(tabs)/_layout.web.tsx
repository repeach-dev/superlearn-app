import { Slot } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../src/components/layout/Header';

export default function TabsLayout() {
  return (
    <SafeAreaProvider>
      <View className="flex-1 bg-gray-50">
        <Header />
        <Slot />
      </View>
    </SafeAreaProvider>
  );
}
