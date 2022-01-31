import React from 'react';
import { ApplicationProvider, Button, Divider, Layout, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';

const BottomNavigation = () => {
  return (
        <ApplicationProvider>
          <BottomNavigationTab title="USERS" />
          <BottomNavigationTab title="ORDERS" />
          <BottomNavigationTab title="TRANSACTIONS" />
        </ApplicationProvider>
      );
};

export default BottomNavigation;
