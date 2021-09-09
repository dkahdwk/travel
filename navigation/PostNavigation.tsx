import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Post from '@screens/Post/Post';

const Stack = createStackNavigator();

const PostNavigation = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      screenOptions={{ animationEnabled: false }}
    >
      <Stack.Screen name="Post" component={Post} />
    </Stack.Navigator>
  );
}

export default PostNavigation;