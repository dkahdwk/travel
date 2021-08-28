import React, { useState, useEffect } from 'react';
import NavController from '@components/NavController';
import StoreProvider from 'store/StateStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { AuthProvider } from "@components/AuthContext";
import { configure } from "mobx";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// mobx 알림 제거
configure({
  enforceActions: "never",
});

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const preLoad = async () => {
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    try {
      if (!isLoggedIn || isLoggedIn === "false") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    } catch (e) {
      console.log(e);
    } 
  };

  useEffect(() => {
    const socialGoogleConfigure = async () => {
      await GoogleSignin.configure({
        iosClientId: '209371990190-ajm49l5euq6g702gpim3p1742d03kflr.apps.googleusercontent.com',
        webClientId: '209371990190-cgf89f8ujok76ghp2slothdsijds90qm.apps.googleusercontent.com',
        offlineAccess: false,
      });
    };
    preLoad();
    socialGoogleConfigure();

    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return isLoggedIn !== null && (
    <AuthProvider isLoggedIn={isLoggedIn}>
      <StoreProvider>
        <NavController />
      </StoreProvider>
    </AuthProvider>
  );
}

export default App;