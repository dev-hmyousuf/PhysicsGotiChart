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

export default function VelocityTimeChart() {
  const [velocity, setVelocity] = useState('');
  const [time, setTime] = useState('');
  const [inputData, setInputData] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [chartData, setChartData] = useState([]);

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
    setChartData([]);
    setSubmitted(false);
  };

  const prepareVelocityChart = () => {
    const sorted = [...inputData].sort((a, b) => a.time - b.time);
    const velocityPoints = sorted.map(item => ({
      value: item.velocity,
      label: `${item.time}s`,
    }));
    setChartData(velocityPoints);
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
                  placeholder="Velocity (m/s)"
                  keyboardType="numeric"
                  value={velocity}
                  onChangeText={setVelocity}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Time (s)"
                  keyboardType="numeric"
                  value={time}
                  onChangeText={setTime}
                />
              </View>

              <CustomButton title="Add Data" onPress={addDataPoint} />

              {inputData.length > 0 && (
                <View style={styles.tableWrapper}>
                  <View style={{ flexDirection: 'row' }}>
                    <View>
                      <View style={styles.fixedHeaderCell}>
                        <Text style={styles.headerCellText}>Time (s)</Text>
                      </View>
                      <View style={styles.fixedHeaderCell}>
                        <Text style={styles.headerCellText}>Velocity (m/s)</Text>
                      </View>
                    </View>

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

              <CustomButton title="Final Submit" onPress={prepareVelocityChart} />
            </>
          )}

          {submitted && (
            <>
              <LineChart
                data={chartData}
                width={340}
                color="#007AFF"
                height={240}
                spacing={40}
                initialSpacing={0}
                thickness={2}
                yAxisTextStyle={{ color: '#ff4d4f' }}
                xAxisLabelTextStyle={{ color: '#ff4d4f', fontSize: 10 }}
                hideDataPoints={false}
                isAnimated
                hideRules={false}
                startFillColor="rgb(46, 217, 255)"
                startOpacity={0.8}
                endFillColor="rgb(203, 241, 250)"
                endOpacity={0.3}
                areaChart
       
              />
              <CustomButton title="Go Back" onPress={clearAll} style={{ marginTop: 20,}} />
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent : 'center',
  
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ff4d4f',
    alignSelf: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    flex: 1,
    borderRadius: 6,
    borderColor: '#ccc',
  },
  customButton: {
    backgroundColor: '#000',
    padding: 14,
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  tableWrapper: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
  },
  fixedHeaderCell: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCellText: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
  },
  dataCell: {
    padding: 10,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 14,
  },
});