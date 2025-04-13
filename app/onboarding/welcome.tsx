import { ThemedText } from "@/components/ThemedText";
import { OnBoardingLayout } from "@/components/ui/OnBoardingLayout";
import { useThemeColor } from "@/hooks/useThemeColor";
import { generalStyles } from "@/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

export default function OnboardingWelcome() {
  const bg = useThemeColor({}, "background");
  const router = useRouter();

  useEffect(() => {
    const completeOnboarding = async () => {
      await AsyncStorage.setItem("onboarding-complete", "true");
      setTimeout(() => {
        router.replace("/(tabs)");
      }, 1500); // Optional delay for a smoother transition
    };
    completeOnboarding();
  }, []);

  return (
    <OnBoardingLayout nextBgColor={bg} bgColor="#fff" complete>
      <View style={generalStyles.container}>
        <View style={generalStyles.textContainer}>
          <ThemedText
            style={[
              generalStyles.text,
              generalStyles.titleBold,
              { textAlign: "center", color: "#000", fontSize : 35 },
            ]}
          >
            অভিনন্দন! আপনি চার্ট তৈরি করতে প্রস্তুত
          </ThemedText>
          <ThemedText
            style={[
              generalStyles.text,
              generalStyles.description,
              { textAlign: "center", color : "#000" },
            ]}
          >
            দেখানো ধাপে এগিয়ে যান এবং চার্ট তৈরি করে সময় বাঁচান।
          </ThemedText>
        </View>
      </View>
    </OnBoardingLayout>
  );
}