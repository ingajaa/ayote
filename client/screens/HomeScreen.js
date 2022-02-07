import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import React, { Fragment, useEffect } from 'react';
import { useSearchProductQuery } from '../services/spoonacular';
import { ApplicationProvider, Layout, Divider, Text, Button, TopNavigation, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import TopNav from '../components/TopNav';
import LogoComponent from '../components/LogoComponent';
import SearchBarComponent from '../components/SearchBarComponent';
import MacroBar from '../components/MacroBar';
import MealContainer from '../components/MealContainer';
import BottomNav from '../components/BottomNav';
import { useGetUserProfileQuery } from '../services/ayote';
import { useDispatch } from 'react-redux';
import { setUserId, setDailyCaloriesGoal, setDailyGlassCountGoal } from '../slices/userProfileSlice';

const HomeScreen = () => {
  // const dispatch = useDispatch();
  // const { data, error, refetch, isLoading } = useGetUserProfileQuery(1);
  // if (data && data.length > 0) {
  //   dispatch(setUserId(data[0].userId));
  //   dispatch(setDailyCaloriesGoal(data[0].dailyCaloriesGoal));
  //   dispatch(setDailyGlassCountGoal(data[0].dailyGlassCountGoal));
  // }

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#fe615a' }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Layout style={styles.Layout}>
          {/* TopNav affecting other components' rendering on actual iPhone */}
          <TopNav />
          {/* <LogoComponent /> */}
          <SearchBarComponent />
          <MacroBar />
          <MealContainer />
          <BottomNav />
        </Layout>
      </SafeAreaView>
    </Fragment>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  Layout: { flex: 2, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#fe615a' }
});
