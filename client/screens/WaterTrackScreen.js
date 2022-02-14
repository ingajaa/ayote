import React, { useEffect, useState, useCallback } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useDerivedValue,
  withTiming, useAnimatedProps } from 'react-native-reanimated';
import { ReText } from 'react-native-redash';
import { useDispatch, useSelector } from 'react-redux';
import { selectGlassCount, addGlass } from '../slices/waterSlice';
import BackTopNav from '../components/BackTopNav';
import { selectDailyGlassCountGoal, setDailyGlassCountGoal } from '../slices/userProfileSlice';
import { useGetUserProfileQuery } from '../services/ayote';

const BACKGROUND_COLOR = '#151515';
const ICON_FILL = '#A6E1FA';
const BACKGROUND_STROKE_COLOR = '#A6E1FA';
const STROKE_COLOR = '#1c7fa6';

const { width, height } = Dimensions.get('window');

const CIRCLE_LENGTH = 780;
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const WaterTrackScreen = () => {
  const glasses = useSelector(selectGlassCount);
  const progress = useSharedValue(glasses);
  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetUserProfileQuery(1);
  if (data && data.length > 0) {
    dispatch(setDailyGlassCountGoal(data[0].dailyGlassCountGoal));
  }

  const dailyGlassCountGoal = useSelector(selectDailyGlassCountGoal);

  const [buttonValue, setButtonValue] = useState('Add Glass');

  useEffect(() => {
    if (dailyGlassCountGoal) glasses >= dailyGlassCountGoal ? setButtonValue(`Daily Goal Hit 🥳`) : setButtonValue(`Add Glass`);
  });

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - 0.1 * progress.value)
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value)}`;
  });

  const onPress = useCallback(async () => {
    if ((await progress.value) >= (await dailyGlassCountGoal)) return;
    else {
      progress.value = await withTiming(progress.value + 1, { duration: 200 });
      dispatch(addGlass());
    }
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackTopNav backgroundColor={BACKGROUND_COLOR} iconFill={ICON_FILL} />
      <View style={styles.container}>
        <Text style={styles.glassesOfWaterText}>Glasses Of Water 💧</Text>
        <ReText style={styles.progressText} text={progressText} />
        <Svg style={styles.svg}>
          <Circle
          cx={width / 2}
          cy={height / 2}
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
          />
          <AnimatedCircle
          style={styles.circle}
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
          <Text style={styles.buttonText}>{buttonValue}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WaterTrackScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR
  },
  container: {
    flex: 2,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
  svg: {
    position: 'absolute',
    bottom: '14%'
  },
  glassesOfWaterText: {
    color: '#A6E1FA',
    bottom: '46%',
    fontSize: 25
  },
  progressText: {
    fontSize: 70,
    color: '#1c7fa6',
    fontFamily: 'Noteworthy',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    position: 'relative',
    bottom: '42%'

  },
  button: {
    position: 'absolute',
    bottom: 80,
    width: width * 0.5,
    height: 60,
    backgroundColor: '#1c7fa6',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: BACKGROUND_STROKE_COLOR,
    bottom: '10%'
  },
  buttonText: {
    fontSize: 20,
    color: BACKGROUND_STROKE_COLOR,
    letterSpacing: 2.0,
    fontFamily: 'Helvetica'
  }
});