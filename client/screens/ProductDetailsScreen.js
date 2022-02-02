import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet, SafeAreaView } from 'react-native';

const ProductDetailsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text>Product details...</Text>
      </Layout>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({});
