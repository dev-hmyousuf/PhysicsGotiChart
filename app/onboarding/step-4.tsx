import { LineChart } from "react-native-gifted-charts"; // Chart import
import { OnBoardingLayout } from "@/components/ui/OnBoardingLayout";
import { useThemeColor } from "@/hooks/useThemeColor";
import { generalStyles } from "@/styles";
import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";

export default function OnboardingStepFour() {
  const primary1 = useThemeColor({}, "primary1");
  const primary2 = useThemeColor({}, "primary2");

  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChart(true);
    }, 100); // 1s delay

    return () => clearTimeout(timer);
  }, []);

  const dummyData = [
    { value: 0, label: '0s' },
    { value: 2, label: '1s' },
    { value: 1, label: '2s' },
    { value: 3, label: '3s' },
    { value: 1.5, label: '4s' },
  ];

  return (
    <OnBoardingLayout
      nextBgColor={primary2}
      bgColor="#fff"
      nextHref="/onboarding/step-5"
    >
      <View style={generalStyles.container}>
        <View style={generalStyles.textContainer}>
          <Text style={[generalStyles.text, generalStyles.titleBold, { color: "#000", fontFamily: "BanglaFont" }]}>
            সময় বনাম বেগ চার্ট দেখুন
          </Text>
          <Text style={[generalStyles.text, generalStyles.description, { fontFamily: "BanglaFont" }]}>
            ‘Final Submit’ এ ক্লিক করে আপনার ডেটা একটি ক্লিন এবং ডাইনামিক সময় বনাম বেগ - চার্টে রূপান্তর করুন।
          </Text>
        </View>

        {showChart && (
          <View style={{ marginTop: 30 }}>
            <LineChart
              data={dummyData}
              width={Dimensions.get("window").width - 60}
              height={200}
              spacing={40}
              initialSpacing={0}
              thickness={2}
              hideDataPoints={false}
              isAnimated
              areaChart
              color="#007AFF"
              gradientColor={{
                startColor: "#a1c4fd",
                endColor: "#c2e9fb",
              }}
            />
          </View>
        )}
      </View>
    </OnBoardingLayout>
  );
}