import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet, SafeAreaView } from 'react-native';

const SimpleFoodDetailsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text>Simple food details...</Text>
      </Layout>
    </SafeAreaView>
  );
};

export default SimpleFoodDetailsScreen;

const styles = StyleSheet.create({});
