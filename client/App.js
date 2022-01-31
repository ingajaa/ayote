import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SearchBarComponent from './components/SearchBarComponent';
import NavBar from './components/NavBar';
import LogoComponent from './components/LogoComponent';
import MacroBar from './components/MacroBar';
import MealContainer from './components/MealContainer';

//import MealList from './components/MealList';


export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <NavBar />
        <LogoComponent />
        <SearchBarComponent />
        <MacroBar />
        <MealContainer />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  safeArea: {
    flex: 2
  }
});
