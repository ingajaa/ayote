import { StyleSheet, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import BackTopNav from '../components/BackTopNav';
import { Layout, Text, Button } from '@ui-kitten/components';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useGetProductQuery } from '../services/openFoodFacts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  selectId,
  setId,
  selectName,
  setName,
  selectImage,
  setImage,
  selectCategory,
  setCategory,
  selectProteinPerGram,
  setProteinPerGram,
  selectCarbsPerGram,
  setCarbsPerGram,
  selectFatPerGram,
  setFatPerGram,
  selectCaloriesPerGram,
  setCaloriesPerGram
} from '../slices/currentItemSlice';

const BarcodeScannerScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [ean, setEan] = useState(null);
  const currentItemId = useSelector(selectId);
  const test = useSelector(selectFatPerGram);

  const [skip, setSkip] = useState(true);
  const response = useGetProductQuery(ean, { skip });

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    if (response.data) {
      if (response.data && response.data.status !== 0) {
        dispatch(setName(response.data.name));
        dispatch(setCategory(response.data.category));
        dispatch(setImage(response.data.image));
        dispatch(setProteinPerGram(response.data.proteinPerGram));
        dispatch(setCarbsPerGram(response.data.carbsPerGram));
        dispatch(setFatPerGram(response.data.fatPerGram));
        dispatch(setCaloriesPerGram(response.data.caloriesPerGram));
        setScanned(false);
        navigation.navigate('ProductDetailsScreen');
      } else {
        alert(`Ooops, can't find that product...`);
        navigation.navigate('HomeScreen');
      }
    }
  }, [response.data, scanned]);

  const handleBarCodeScanned = async ({ type, data }) => {
    console.log('scanning...');
    await setScanned(true);
    await setEan(data);
    await setSkip(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackTopNav backgroundColor={'#fff'} iconFill={'#000'} />
      <Layout style={styles.container} level="1">
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
      </Layout>
    </SafeAreaView>
  );
};

export default BarcodeScannerScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 30,
    marginVertical: 20,
    backgroundColor: '#fff'
  }
});
