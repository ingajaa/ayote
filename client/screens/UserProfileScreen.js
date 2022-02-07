import { StyleSheet, SafeAreaView, BackHandler, Alert, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Layout, Text, Button, Input, Divider, View } from '@ui-kitten/components';
import BackTopNav from '../components/BackTopNav';
import { useGetUserProfileQuery, useUpdateProfileMutation } from '../services/ayote';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserId, selectDailyCaloriesGoal, setDailyCaloriesGoal, selectDailyGlassCountGoal, setDailyGlassCountGoal } from '../slices/userProfileSlice';
import { useNavigation } from '@react-navigation/native';

const UserProfileScreen = () => {
  const navigation = useNavigation();
  const [skip, setSkip] = useState(false);
  const userId = useSelector(selectUserId); // TODO: get value from auth / dynamically
  const dailyCaloriesGoal = useSelector(selectDailyCaloriesGoal);
  const dailyGlassCountGoal = useSelector(selectDailyGlassCountGoal);
  const dispatch = useDispatch();

  // Get latest goal values
  const { data, error, refetch, isLoading } = useGetUserProfileQuery(1, { skip });
  if (data && data.length > 0) {
    dispatch(setDailyCaloriesGoal(data[0].dailyCaloriesGoal));
    dispatch(setDailyGlassCountGoal(data[0].dailyGlassCountGoal));
    setSkip(true);
  }

  const [updateProfile, result] = useUpdateProfileMutation();

  const onChange = (value, input) => {
    if (input === 'calories') dispatch(setDailyCaloriesGoal(value));
    if (input === 'glasses') dispatch(setDailyGlassCountGoal(value));
  };

  useEffect(() => {
    setSkip(false);
  }, []);

  const onPress = async () => {
    const body = {
      id: 1,
      dailyCaloriesGoal: Number(dailyCaloriesGoal),
      dailyGlassCountGoal: Number(dailyGlassCountGoal)
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
