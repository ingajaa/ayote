import React, { useEffect, useState, useCallback } from 'react';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, { useSharedValue, useDerivedValue, withTiming, useAnimatedProps } from 'react-native-reanimated';
import { ReText } from 'react-native-redash';
import { useDispatch, useSelector } from 'react-redux';
import { selectCupCount, addCup } from '../slices/caffeineSlice';
import BackTopNav from '../components/BackTopNav';
import { selectDailyCaffeineCountGoal, setDailyCaffeineCountGoal } from '../slices/userProfileSlice';
import { useGetUserProfileQuery } from '../services/ayote';

const BACKGROUND_COLOR = '#d4f1f9';
const ICON_FILL = '#556064';
const BACKGROUND_STROKE_COLOR = '#cba79b';
const STROKE_COLOR = '#56362c';

const { width, height } = Dimensions.get('window');

const CIRCLE_LENGTH = 850;
const R = CIRCLE_LENGTH / (2 * Math.PI);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CaffeineTrackScreen = () => {
  const cups = useSelector(selectCupCount);
  const progress = useSharedValue(cups);
  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetUserProfileQuery(1);
  if (data && data.length > 0) {
    dispatch(setDailyCaffeineCountGoal(data[0].dailyCaffeineCountGoal));
  }

  const dailyCaffeineCountGoal = useSelector(selectDailyCaffeineCountGoal);

  const [buttonValue, setButtonValue] = useState('Add Cup');

  useEffect(() => {
    if (dailyCaffeineCountGoal) cups >= dailyCaffeineCountGoal ? setButtonValue(`That's a cap`) : setButtonValue(`Add Cup`);
  });

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - 0.1 * progress.value)
  }));

  const progressText = useDerivedValue(() => {
    return `${Math.floor(progress.value)}`;
  });

  const onPress = useCallback(async () => {
    if ((await progress.value) >= (await dailyCaffeineCountGoal)) return;
    else {
      progress.value = await withTiming(progress.value + 1, { duration: 200 });
      dispatch(addCup());
    }
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackTopNav backgroundColor={BACKGROUND_COLOR} iconFill={ICON_FILL} />
      <View style={styles.container}>
        <Text style={styles.cupsOfCoffeeText}>Cups Of Coffee</Text>
        <ReText style={styles.progressText} text={progressText} />
        <Svg style={styles.svg}>
          <Circle cx={width / 2} cy={height / 2} r={R} stroke={BACKGROUND_STROKE_COLOR} strokeWidth={30} />
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

export default CaffeineTrackScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E6D7D2'
  },
  container: {
    flex: 2,
    backgroundColor: '#E6D7D2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  svg: {
    position: 'absolute',
    bottom: '20%'
  },
  cupsOfCoffee: {
    // position: 'absolute',
  },
  progressText: {
    fontSize: 40,
    color: STROKE_COLOR,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    position: 'relative',
    bottom: '12%'
  },
  button: {
    position: 'absolute',
    bottom: 80,
    width: width * 0.5,
    height: 60,
    backgroundColor: BACKGROUND_STROKE_COLOR,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    letterSpacing: 2.0,
    fontFamily: 'Helvetica'
  }
});

// import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
// import React from 'react';
// import CircularProgress from 'react-native-circular-progress-indicator';

// const CaffeineTrackerScreen = () => {
//   return (
//     <SafeAreaView style={styles.safeArea}>
//     <View style={styles.coffeeCircularAnimation}>
//       <CircularProgress
//   value={80}
//   radius={110}
//   activeStrokeColor={"#5b3a2f"}
//   inActiveStrokeColor={'#764b3d'}
//   inActiveStrokeWidth={16}
//   activeStrokeWidth={12}
//   inActiveStrokeOpacity={0.2}
//   textColor={'#fff'}
//   valueSuffix={'%'}
//   onAnimationComplete={() => { alert('Stop drinking coffee') }}
// />
//     </View>
//     </SafeAreaView>
//   );
// };

// export default CaffeineTrackerScreen;

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#E6D7D2'
//   },
//   coffeeCircularAnimation: {
//     flex: 2,
//     alignItems: 'center',
//     justifyContent: 'center',
//     position: 'absolute',
//     bottom: '52%',
//     left: '22%',
//   }
// });
