import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkOnboarding = async () => {
      const isComplete = await AsyncStorage.getItem("onboarding-complete");

      if (isComplete === "true") {
        router.replace("(tabs)");
      } else {
        router.replace("/onboarding");
      }

      setChecking(false);
    };

    checkOnboarding();
  }, []);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}