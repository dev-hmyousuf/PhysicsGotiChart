  import { LineChart } from "react-native-gifted-charts"; // Chart import
  import { OnBoardingLayout } from "@/components/ui/OnBoardingLayout";
  import { useThemeColor } from "@/hooks/useThemeColor";
  import { generalStyles } from "@/styles";
  import React, { useEffect, useState } from "react";
  import { View, Text, Dimensions } from "react-native";

  export default function OnboardingStepFive() {
    const primary1 = useThemeColor({}, "primary1");
    const primary2 = useThemeColor({}, "primary2");

    const [showChart, setShowChart] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowChart(true);
      }, 1000); // 1s delay

      return () => clearTimeout(timer);
    }, []);

    // Example velocity-time data
    const velocityTimeData = [
      { time: 0, velocity: 0 },
      { time: 2, velocity: 3 },
      { time: 4, velocity: 6 },
      { time: 6, velocity: 9 },
      { time: 8, velocity: 9 },
      { time: 10, velocity: 9 },
      { time: 12, velocity: 5 },
      { time: 14, velocity: 0 },
    ];

    // Calculate acceleration between each time segment
    const calculateAcceleration = () => {
      const sorted = [...velocityTimeData].sort((a, b) => a.time - b.time);
      const accPoints = [];

      for (let i = 1; i < sorted.length; i++) {
        const v1 = sorted[i - 1].velocity;
        const v2 = sorted[i].velocity;
        const t1 = sorted[i - 1].time;
        const t2 = sorted[i].time;

        const acceleration = (v2 - v1) / (t2 - t1);

        accPoints.push({
          value: acceleration,
          label: `${t1}s`,
        });

        // Optional: push a final point at t2 with same acceleration for step continuity
        if (i === sorted.length - 1) {
          accPoints.push({
            value: acceleration,
            label: `${t2}s`,
          });
        }
      }

      return accPoints;
    };

    const accelerationData = calculateAcceleration();

    return (
      <OnBoardingLayout
        nextBgColor={primary2}
        bgColor="#fff"
        nextHref="/onboarding/welcome"
      >
        <View style={generalStyles.container}>
          <View style={generalStyles.textContainer}>
            <Text
              style={[
                generalStyles.text,
                generalStyles.titleBold,
                { color: "#000", fontFamily: "BanglaFont" },
              ]}
            >
              সময় বনাম ত্বরণ চার্ট দেখুন
            </Text>
            <Text
              style={[
                generalStyles.text,
                generalStyles.description,
                { fontFamily: "BanglaFont" },
              ]}
            >
              ‘Final Submit’ এ ক্লিক করে আপনার ডেটা একটি ক্লিন এবং ডাইনামিক সময়
              বনাম ত্বরণ - চার্টে রূপান্তর করুন।
            </Text>
          </View>

          {showChart && (
            <View style={{ marginTop: 30 }}>
              <LineChart
                data={accelerationData}
                width={Dimensions.get("window").width - 60}
                height={200}
                spacing={40}
                initialSpacing={0}
                thickness={2}
                hideDataPoints={false}
                isAnimated
                stepChart
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