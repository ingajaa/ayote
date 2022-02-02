import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

// Screens
import HomeScreen from './screens/HomeScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <SafeAreaProvider>
            <Stack.Navigator>
              <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SearchResultsScreen" component={SearchResultsScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          </SafeAreaProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});
