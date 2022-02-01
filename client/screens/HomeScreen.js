import { StyleSheet, View, SafeAreaView } from 'react-native';
import React from 'react';
import { useSearchProductQuery } from '../services/spoonacular';
import { ApplicationProvider, Layout, Divider, Text, Button, TopNavigation, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import TopNavBar from '../components/TopNavBar';
import LogoComponent from '../components/LogoComponent';
import SearchBarComponent from '../components/SearchBarComponent';
import MacroBar from '../components/MacroBar';
import MealContainer from '../components/MealContainer';
import BottomNav from '../components/BottomNav';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <TopNavBar />
        <LogoComponent />
        <SearchBarComponent />
        <MacroBar />
        <MealContainer />
        <BottomNav />
      </Layout>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
