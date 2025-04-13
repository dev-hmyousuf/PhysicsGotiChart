import { ThemedText } from "@/components/ThemedText";
import { OnBoardingLayout } from "@/components/ui/OnBoardingLayout";
import React from "react";
import { Image } from "expo-image";
import { View, Text, } from "react-native";
import { generalStyles } from "@/styles";
import { useThemeColor } from "@/hooks/useThemeColor";


export default function OnboardingStepOne() {

  const primary2 = useThemeColor({}, "primary2");
  
  const BanglaFont = require("@/assets/fonts/banglaUnicode1.ttf")
  return (
    <OnBoardingLayout bgColor="#ffffff" nextBgColor={primary2} nextHref="/onboarding/step-2">
      <View style={[generalStyles.container, { backgroundColor: "#ffffff" }]}>
        <Image
          source={require("@/assets/images/react-logo.png")}
          contentFit="contain"
          style={generalStyles.image}
        />
        <View style={generalStyles.textContainer}>
          <ThemedText
            style={[
              generalStyles.text,
              generalStyles.title,
              { color: "#000000", fontFamily: "BanglaFont" }
            ]}
          >
            Motion Chart Master এ স্বাগতম
          </ThemedText>
          <Text style={[generalStyles.text, generalStyles.description, { fontFamily  : "BanglaFont" } ]}>
            ধাপে ধাপে গতি (Velocity) এবং সময় (Time) এর মান যুক্ত করুন। প্রিভিউ তালিকায় আপনি আপনার ডেটা দেখতে পারবেন।
            প্রয়োজন অনুযায়ী শেষ ডেটা মুছতে ‘ডিলিট’ ব্যবহার করুন অথবা সব ডেটা মুছতে ‘ক্লিয়ার অল’ বাটনে চাপ দিন।
            এরপর আপনার ডেটা অনুযায়ী সময় বনাম গতি বা সময় বনাম ত্বরণ (Acceleration) এর চার্ট দেখতে পারবেন।
          </Text>
        </View>
      </View>
    </OnBoardingLayout>
  );
}