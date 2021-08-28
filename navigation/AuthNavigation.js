import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from "@screens/Auth/Login";
import SignUp from "@screens/Auth/SignUp";
import Confirm from "@screens/Auth/Confirm";

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        screenOptions={{ animationEnabled: false }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          initialParams={{ email: '', pw: '' }}
        />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Confirm" component={Confirm} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthNavigation;