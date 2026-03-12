import './global.css';
import { StatusBar } from 'expo-status-bar';
import MyClipsScreen from './src/screens/MyClipsScreen';

export default function App() {
  return (
    <>
      <MyClipsScreen />
      <StatusBar style="auto" />
    </>
  );
}
