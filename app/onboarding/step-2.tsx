import { OnBoardingLayout } from "@/components/ui/OnBoardingLayout";
import { useThemeColor } from "@/hooks/useThemeColor";
import { generalStyles } from "@/styles";
import React from "react";
import { View, Text, Dimensions } from "react-native";

export default function OnboardingStepTwo() {
  const primary1 = useThemeColor({}, "primary1");
  const primary2 = useThemeColor({}, "primary2");

  const BanglaFont = require("@/assets/fonts/banglaUnicode1.ttf")
  return (
    <OnBoardingLayout
      nextBgColor={primary2}
      bgColor="#fff"
      nextHref="/onboarding/step-3"
    >
      <View style={generalStyles.container}>
        <View style={generalStyles.textContainer}>
          <Text style={[generalStyles.text, generalStyles.titleBold, { fontFamily : "BanglaFont" ]}>
            গতি-সময় ডেটা প্রবেশ করান
          </Text>
          <Text style={[generalStyles.text, generalStyles.description, { fontFamily : "BanglaFont" }]}>
            ধাপে ধাপে গতি এবং সময়ের মান যুক্ত করুন। প্রিভিউ, ডিলিট এবং ক্লিয়ার বাটন ব্যবহার করে ডেটা সহজেই পরিচালনা করুন।
          </Text>
        </View>
      </View>
    </OnBoardingLayout>
  );
}