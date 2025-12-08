import { Stack } from "expo-router";
import {
  useFonts as usePoppins,
  Poppins_400Regular,
  Poppins_700Bold,
  Poppins_100Thin,
  Poppins_600SemiBold,
  Poppins_200ExtraLight,
} from "@expo-google-fonts/poppins";
import {
  useFonts as useRoboto,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_600SemiBold,
  Roboto_200ExtraLight,
  Roboto_100Thin,
} from "@expo-google-fonts/roboto";
import "../global.css";
import { StatusBar, View } from "react-native";

export default function RootLayout() {
  const [poppinsLoaded] = usePoppins({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_400Regular,
    Poppins_200ExtraLight,
    Poppins_100Thin,
  });
  const [robotoLoaded] = useRoboto({
    Roboto_700Bold,
    Roboto_600SemiBold,
    Roboto_400Regular,
    Roboto_200ExtraLight,
    Roboto_100Thin,
  });

  if (!poppinsLoaded || !robotoLoaded) return;

  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <StatusBar barStyle={"dark-content"} />
    </View>
  );
}
