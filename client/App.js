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
import { FeatherIconsPack } from './components/feather-icons';

// Screens
import HomeScreen from './screens/HomeScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import SimpleFoodDetailsScreen from './screens/SimpleFoodDetailsScreen';
import RecipeDetailsScreen from './screens/RecipeDetailsScreen';
import WaterTrackScreen from './screens/WaterTrackScreen';
import TrackFoodScreen from './screens/TrackFoodScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import TrackCustomMealScreen from './screens/TrackCustomMealScreen';
import BarcodeScannerScreen from './screens/BarcodeScannerScreen';
import CaffeineTrackScreen from './screens/CaffeineTrackScreen';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <IconRegistry icons={[EvaIconsPack, FeatherIconsPack]} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <SafeAreaProvider>
            <Stack.Navigator>
              <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SearchResultsScreen" component={SearchResultsScreen} options={{ headerShown: false }} />
              <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SimpleFoodDetailsScreen" component={SimpleFoodDetailsScreen} options={{ headerShown: false }} />
              <Stack.Screen name="RecipeDetailsScreen" component={RecipeDetailsScreen} options={{ headerShown: false }} />
              <Stack.Screen name="WaterTrackScreen" component={WaterTrackScreen} options={{ headerShown: false }} />
              <Stack.Screen name="TrackFoodScreen" component={TrackFoodScreen} options={{ headerShown: false }} />
              <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
              <Stack.Screen name="TrackCustomMealScreen" component={TrackCustomMealScreen} options={{ headerShown: false }} />
              <Stack.Screen name="BarcodeScannerScreen" component={BarcodeScannerScreen} options={{ headerShown: false }} />
              <Stack.Screen name="CaffeineTrackScreen" component={CaffeineTrackScreen} options={{headerShown: false}} />
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
