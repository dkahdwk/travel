import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Magazin from '@screens/Magazin/Magazin';

const Stack = createStackNavigator();

const MagazineNavigation = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ animationEnabled: false }}
    >
      <Stack.Screen name="Magazin" component={Magazin} />
    </Stack.Navigator>
  );
}

export default MagazineNavigation;