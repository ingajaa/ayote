import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';


const CaffeineTrackerScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.coffeeCircularAnimation}>
      <CircularProgress
  value={80}
  radius={110}
  activeStrokeColor={"#5b3a2f"}
  inActiveStrokeColor={'#764b3d'}
  inActiveStrokeWidth={16}
  activeStrokeWidth={12}
  inActiveStrokeOpacity={0.2}
  textColor={'#fff'}
  valueSuffix={'%'}
  onAnimationComplete={() => { alert('Stop drinking coffee') }}
/>
    </View>
    </SafeAreaView>
  );
};

export default CaffeineTrackerScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E6D7D2'
  },
  coffeeCircularAnimation: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '52%',
    left: '22%',
  }
});
