import React from 'react';
import { StatusBar } from 'expo-status-bar'
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useSharedValue } from 'react-native-reanimated';

const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1FA'

const { width, height } = Dimensions.get('window');

const CIRCLE_LENGTH = 1000;
const R = CIRCLE_LENGTH / (2 * Math.PI)

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const WaterTrackScreen = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 2000});
  }, []);

  return (
    <View style={styles.container}>
      <Svg>
        <Circle
        cx={width / 2}
        cy={height / 2}
        r={R}
        stroke={BACKGROUND_STROKE_COLOR}
        strokeWidth={30}
        />
        <AnimatedCircle
        cx={width / 2}
        cy={height / 2}
        r={R}
        stroke={STROKE_COLOR}
        strokeWidth={15}
        strokeDasharray={CIRCLE_LENGTH}
        strokeDashoffset={CIRCLE_LENGTH * 0.5}
        />
      </Svg>
      <StatusBar style='auto' />
    </View>
  );
};

export default WaterTrackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
