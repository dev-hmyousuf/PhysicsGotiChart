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
      nextHref="/onboarding/step-4"
    >
      <View style={generalStyles.container}>
        <View style={generalStyles.textContainer}>
          <Text style={[generalStyles.text, generalStyles.titleBold, { color : "#000", fontFamily : "BanglaFont"}]}>
            প্রিভিউ ও সম্পাদনা করুন
          </Text>
          <Text style={[generalStyles.text, generalStyles.description, { fontFamily  : "BanglaFont" } ]}>
            আপনার গতি-সময় তালিকা দেখুন। ফাইনাল সাবমিট করার আগে প্রয়োজন হলে সম্পাদনা করুন।
          </Text>
        </View>
      </View>
    </OnBoardingLayout>
  );
}