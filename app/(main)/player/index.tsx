import PlayerPage from "../../../src/(apps)/player/PlayerPage";
import { useLocalSearchParams } from "expo-router";

export default function PlayerRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <PlayerPage id={id ?? ""} />;
}
