import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Travel from '@screens/Travel/Travel';

const Stack = createStackNavigator();

const TravelNavigation = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ animationEnabled: false }}
    >
      <Stack.Screen name="Travel" component={Travel} />
    </Stack.Navigator>
  );
}

export default TravelNavigation;