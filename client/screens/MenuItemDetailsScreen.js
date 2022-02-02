import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet, SafeAreaView } from 'react-native';

const MenuItemDetailsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Layout style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text>Menu item details...</Text>
      </Layout>
    </SafeAreaView>
  );
};

export default MenuItemDetailsScreen;

const styles = StyleSheet.create({});
