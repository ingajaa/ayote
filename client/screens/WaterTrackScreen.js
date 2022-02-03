import React, { useEffect, useCallback } from 'react';
import { Dimensions,
  StyleSheet,
  Text,
  View,
TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useDerivedValue,
  withTiming,
  useAnimatedProps,
} from 'react-native-reanimated';
import { ReText } from 'react-native-redash'
import { useDispatch, useSelector } from 'react-redux';
import selectGlasses from '../slices/waterSlice';

const BACKGROUND_COLOR = '#d4f1f9';
const BACKGROUND_STROKE_COLOR = '#A6E1FA'
const STROKE_COLOR = '#1c7fa6';

const { width, height } = Dimensions.get('window');

const CIRCLE_LENGTH = 850;
const R = CIRCLE_LENGTH / (2 * Math.PI)

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const WaterTrackScreen = () => {
  //const glasses  = useSelector(selectGlasses);
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - 0.1 * progress.value)
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value)}`
  })

  const onPress = useCallback(() => {
    // addGlass()
    progress.value = withTiming(progress.value >= 10 ? 1 : progress.value + 1, { duration: 200});
  }, []);

  return (
    <View style={styles.container}>
      <ReText style={styles.progressText} text={progressText}/>
      <Svg style={{position: 'absolute'}}>
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
        animatedProps={animatedProps}
        strokeLinecap={'round'}
        />
      </Svg>
      <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Add Glass</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WaterTrackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
  progressText: {
    fontSize: 70,
    color: '#1c7fa6',
    fontWeight: 'bold',
    width: 200,
    textAlign: 'center'
  },
  button: {
    position: 'absolute',
    bottom: 80,
    width: width * 0.6,
    height: 60,
    backgroundColor: '#1c7fa6',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    letterSpacing: 2.0,
    fontFamily: 'Helvetica'
  }
});
