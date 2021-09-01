import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeNavigation from './HomeNavigation';
import MagazineNavigation from './MagazineNavigation';
import PostNavigation from './PostNavigation';
import TravelNavigation from './TravelNavigation';
import ProfileNavigation from './ProfileNavigation';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
          let iconName;
          if (route.name === '홈') {
            iconName = focused ? 'home' : 'home';
            color = focused ? '#2ed6df' : '#ccc';
          } else if (route.name === '매거진') {
            iconName = focused ? 'stacked-line-chart' : 'stacked-line-chart';
            color = focused ? '#2ed6df' : '#ccc';
          } else if (route.name === '여행기') {
            iconName = focused ? 'map' : 'map';
            color = focused ? '#2ed6df' : '#ccc';
          } else if (route.name === '업로드') {
            iconName = focused ? 'photo-library' : 'photo-library';
            color = focused ? '#2ed6df' : '#ccc';
          } else if (route.name === '프로필') {
            iconName = focused ? 'account-circle' : 'account-circle'
            color = focused ? '#2ed6df' : '#ccc';
          }
          return <Icon name={iconName} color={color} size={26} />
        },
      })}
      tabBarOptions={{
        showLabel: true,
        labelStyle: Platform.OS === 'ios' ? { fontSize: 13 } : { fontSize: 11, paddingBottom: 5 },
        style: Platform.OS === 'ios' ? { borderTopWidth: 1 } : { borderTopWidth: 1, height: 55, paddingBottom: 2.5 }
      }}
    >
      <Tab.Screen name="홈" component={HomeNavigation} />
      <Tab.Screen name="매거진" component={MagazineNavigation} />
      <Tab.Screen name="업로드" component={PostNavigation} />
      <Tab.Screen name="여행기" component={TravelNavigation} />
      <Tab.Screen name="프로필" component={ProfileNavigation} />
    </Tab.Navigator>
  );
}

export default TabNavigation;