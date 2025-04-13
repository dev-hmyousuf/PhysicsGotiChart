import {
  ThemeProvider,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { ThemedView } from "@/components/ThemedView";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";
import { Platform } from "react-native";

// Custom Light Theme
const LightTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: "#ffffff",
    primary: "#0a84ff",
    card: "#f8f8f8",
    text: "#000000",
    border: "#dcdcdc",
    notification: "#ff453a",
  },
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  });

  useEffect(() => {
    const setNavBar = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await NavigationBar.setPositionAsync("absolute");
        await NavigationBar.setBackgroundColorAsync("#ffffff00");
      } catch (e) {
        console.warn("Error setting navigation bar:", e);
      } finally {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }
    };

    if (Platform.OS === "android") {
      setNavBar();
    }
  }, [fontsLoaded]);

  return (
    <ThemeProvider value={LightTheme}>
      <ThemedView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemedView>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}