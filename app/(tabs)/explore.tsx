import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

export default function AccelerationTimeChart() {
  const [velocity, setVelocity] = useState('');
  const [time, setTime] = useState('');
  const [inputData, setInputData] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [accelerationData, setAccelerationData] = useState([]);

  const addDataPoint = () => {
    if (velocity === '' || time === '') return;
    const newPoint = {
      time: parseFloat(time),
      velocity: parseFloat(velocity),
    };
    setInputData(prev => [...prev, newPoint]);
    setVelocity('');
    setTime('');
  };

  const clearLast = () => {
    setInputData(inputData.slice(0, -1));
  };

  const clearAll = () => {
    setInputData([]);
    setAccelerationData([]);
    setSubmitted(false);
  };

  const calculateAcceleration = () => {
    const sorted = [...inputData].sort((a, b) => a.time - b.time);
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

      if (i === sorted.length - 1) {
        accPoints.push({
          value: acceleration,
          label: `${t2}s`,
        });
      }
    }

    setAccelerationData(accPoints);
    setSubmitted(true);
  };

  const CustomButton = ({ title, onPress, style }) => (
    <TouchableOpacity style={[styles.customButton, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
         

          {!submitted && (
            <>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  placeholder="সময় (s)"
                  keyboardType="numeric"
                  value={time}
                  onChangeText={setTime}
                />
                <TextInput
                  style={styles.input}
                  placeholder="বেগ (m/s)"
                  keyboardType="numeric"
                  value={velocity}
                  onChangeText={setVelocity}
                />
              </View>

              <CustomButton title="Add Data" onPress={addDataPoint} />

              {inputData.length > 0 && (
                <View style={styles.tableWrapper}>
                  <View style={{ flexDirection: 'row' }}>
                    {/* Fixed Column */}
                    <View>
                      <View style={styles.fixedHeaderCell}>
                        <Text style={styles.headerCellText}>Time (s)</Text>
                      </View>
                      <View style={styles.fixedHeaderCell}>
                        <Text style={styles.headerCellText}>Velocity (m/s)</Text>
                      </View>
                    </View>

                    {/* Scrollable Data */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      <View>
                        <View style={styles.row}>
                          {inputData.map((item, index) => (
                            <View key={`time-${index}`} style={styles.dataCell}>
                              <Text style={styles.cellText}>{item.time}</Text>
                            </View>
                          ))}
                        </View>
                        <View style={styles.row}>
                          {inputData.map((item, index) => (
                            <View key={`velocity-${index}`} style={styles.dataCell}>
                              <Text style={styles.cellText}>{item.velocity}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    </ScrollView>
                  </View>
                </View>
              )}

              <View style={styles.buttonRow}>
                <CustomButton title="Clear Last" onPress={clearLast} style={{ flex: 1 }} />
                <CustomButton title="Clear All" onPress={clearAll} style={{ flex: 1 }} />
              </View>

              <CustomButton title="Final Submit" onPress={calculateAcceleration} />
            </>
          )}

          {submitted && (
            <>
              <LineChart
                data={accelerationData}
                width={340}
                height={240}
                spacing={40}
                initialSpacing={0}
                thickness={2}
                yAxisTextStyle={{ color: '#ff4d4f' }}
                xAxisLabelTextStyle={{ color: '#ff4d4f', fontSize: 10 }}
                hideDataPoints={false}
                isAnimated
                hideRules={false}
                stepChart
                areaChart
                color="#007AFF"
                startFillColor="rgb(46, 217, 255)"
                startOpacity={0.8}
                endFillColor="rgb(203, 241, 250)"
                endOpacity={0.3}
              />
              <CustomButton title="Go Back" onPress={clearAll} />
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#ff4d4f',
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    borderColor: '#ccc',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 4,
  },
  tableWrapper: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    overflow: 'hidden',
  },
  fixedHeaderCell: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  headerCellText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  dataCell: {
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cellText: {
    textAlign: 'center',
  },
  customButton: {
    backgroundColor: 'black',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  }
});