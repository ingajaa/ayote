import { StyleSheet, SafeAreaView, BackHandler, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Layout, Text, Button, Input, Divider, View } from '@ui-kitten/components';
import BackTopNav from '../components/BackTopNav';
import { useGetUserProfileQuery, useUpdateProfileMutation } from '../services/ayote';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUserId,
  selectDailyCaloriesGoal,
  setDailyCaloriesGoal,
  selectDailyGlassCountGoal,
  setDailyGlassCountGoal,
  selectDailyProteinGoal,
  setDailyProteinGoal,
  selectDailyCarbsGoal,
  setDailyCarbsGoal,
  selectDailyFatGoal,
  setDailyFatGoal
 } from '../slices/userProfileSlice';
import { useNavigation } from '@react-navigation/native';

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const [skip, setSkip] = useState(false);
  const userId = useSelector(selectUserId); // TODO: get value from auth / dynamically
  const dailyCaloriesGoal = useSelector(selectDailyCaloriesGoal);
  const dailyGlassCountGoal = useSelector(selectDailyGlassCountGoal);
  const dailyProteinGoal = useSelector(selectDailyProteinGoal);
  const dailyCarbsGoal = useSelector(selectDailyCarbsGoal);
  const dailyFatGoal = useSelector(selectDailyFatGoal);
  const dispatch = useDispatch();

  // Get latest goal values
  const { data, error, refetch, isLoading } = useGetUserProfileQuery(1, { skip });
  if (data && data.length > 0) {
    dispatch(setDailyCaloriesGoal(data[0].dailyCaloriesGoal));
    dispatch(setDailyGlassCountGoal(data[0].dailyGlassCountGoal));
    dispatch(setDailyProteinGoal(data[0].dailyProteinGoal));
    dispatch(setDailyCarbsGoal(data[0].dailyCarbsGoal));
    dispatch(setDailyFatGoal(data[0].dailyFatGoal));
    setSkip(true);
  }

  const [updateProfile, result] = useUpdateProfileMutation();

  const onChange = (value, input) => {
    if (input === 'calories') dispatch(setDailyCaloriesGoal(value));
    if (input === 'glasses') dispatch(setDailyGlassCountGoal(value));
    if (input === 'protein') dispatch(setDailyProteinGoal(value));
    if (input === 'carbs') dispatch(setDailyCarbsGoal(value));
    if (input === 'fat') dispatch(setDailyFatGoal(value));
  };

  useEffect(() => {
    setSkip(false);
  }, []);

  const onPress = async () => {
    const body = {
      id: 1,
      dailyCaloriesGoal: Number(dailyCaloriesGoal),
      dailyGlassCountGoal: Number(dailyGlassCountGoal),
      dailyProteinGoal: Number(dailyProteinGoal),
      dailyCarbsGoal: Number(dailyCarbsGoal),
      dailyFatGoal: Number(dailyFatGoal),
    };
    updateProfile(body);
    navigation.navigate('HomeScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackTopNav backgroundColor={'#fe615a'} />
      <Layout style={styles.container} level="1">
        <Text style={styles.text} category="label">
          DAILY CALORIES TARGET
        </Text>
        <Input style={styles.input} placeholder="Enter calories in Kcal" value={'' + dailyCaloriesGoal} onChangeText={(value) => onChange(value, 'calories')} />
        <Text style={styles.text} category="label">
          DAILY WATER GLASSES TARGET
        </Text>
        <Input style={styles.input} placeholder="Enter amount of glasses" value={'' + dailyGlassCountGoal} onChangeText={(value) => onChange(value, 'glasses')} />
        <Text style={styles.text} category="label">
          DAILY PROTEIN TARGET
        </Text>
        <Input style={styles.input} placeholder="Enter amount of protein" value={'' + dailyProteinGoal} onChangeText={(value) => onChange(value, 'protein')} />
        <Text style={styles.text} category="label">
          DAILY CARBS TARGET
        </Text>
        <Input style={styles.input} placeholder="Enter amount of Carbs" value={'' + dailyCarbsGoal} onChangeText={(value) => onChange(value, 'carbs')} />
        <Text style={styles.text} category="label">
          DAILY CARBS TARGET
        </Text>
        <Input style={styles.input} placeholder="Enter amount of Fat" value={'' + dailyFatGoal} onChangeText={(value) => onChange(value, 'fat')} />
        <Button style={styles.submit} size="medium" onPress={onPress}>
          UPDATE
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fe615a'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fe615a'
  },
  input: {
    marginBottom: 20,
    marginTop: 20
  },
  submit: {
    marginTop: 20,
    backgroundColor: '#fe908c',
    borderWidth: 0
  },
  text: { marginTop: 3, color: '#fff' }
});
