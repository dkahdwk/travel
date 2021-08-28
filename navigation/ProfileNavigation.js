import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '@screens/Profile/Profile';

const Stack = createStackNavigator();

const ProfileNavigation = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ animationEnabled: false }}
    >
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default ProfileNavigation;