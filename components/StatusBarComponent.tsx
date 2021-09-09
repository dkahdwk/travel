import React from 'react';
import { View, Platform, StatusBar } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const StatusBarComponent = () => {
  return (
    <>
      {Platform.OS === 'android' &&
        <StatusBar backgroundColor={"#fff"} barStyle="dark-content" />
      }
      {Platform.OS === 'ios' &&
        <>
          <StatusBar barStyle='dark-content' />
          <View style={{
            width: '100%',
            height: getStatusBarHeight(),
            backgroundColor: 'white',
            position: 'relative'
          }} />
        </>
      }
    </>
  )
};

export const TransparentStatusBarComponent = () => {
  return (
    <>
      {Platform.OS === 'android' &&
        <StatusBar barStyle="dark-content" />
      }
      {Platform.OS === 'ios' &&
        <>
          <StatusBar barStyle='dark-content' />
          <View style={{
            width: '100%',
            height: getStatusBarHeight(),
            position: 'relative'
          }} />
        </>
      }
    </>
  )
}

export const GrayStatusBarComponent = () => {
  return (
    <>
      {Platform.OS === 'android' &&
        <StatusBar backgroundColor="#fe5050" barStyle="light-content" />
      }
      {Platform.OS === 'ios' &&
        <>
          <StatusBar barStyle="dark-content" />
          <View
            style={{
              width: '100%',
              height: getStatusBarHeight(),
              backgroundColor: 'rgba(0,0,0,0.31)'
            }}
          />
        </>
      }
    </>
  )
};

export const RedStatusBarComponent = () => {
  return (
    <>
      {Platform.OS === 'android' &&
        <StatusBar backgroundColor="red" barStyle="light-content" />
      }
      {Platform.OS === 'ios' &&
        <StatusBar barStyle="light-content" />
      }
    </>
  )
};