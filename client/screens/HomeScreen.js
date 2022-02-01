import { StyleSheet, View, SafeAreaView } from 'react-native';
import React from 'react';
import { useSearchProductQuery } from '../services/spoonacular';
import { ApplicationProvider, Layout, Divider, Text, Button, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import TopNav from '../components/TopNav';
import LogoComponent from '../components/LogoComponent'
import SearchBarComponent from '../components/SearchBarComponent'
import MacroBar from '../components/MacroBar'
import MealContainer from '../components/MealContainer'


const HomeScreen = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TopNav />
        <LogoComponent />
        <SearchBarComponent />
        <MacroBar />
        <MealContainer />
        <BottomNavigation selectedIndex={selectedIndex} onSelect={(index) => setSelectedIndex(index)} style={{ width: '100%', position: 'absolute', bottom: 0 }}>
          <BottomNavigationTab title="USERS" />
          <BottomNavigationTab title="ORDERS" />
          <BottomNavigationTab title="TRANSACTIONS" />
        </BottomNavigation>
      </Layout>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
