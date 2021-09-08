import React, { useState, useEffect } from 'react';
import NavController from '@components/NavController';
import StoreProvider from 'store/StateStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import codePush from "react-native-code-push";
import { AuthProvider } from "@components/AuthContext";
import { configure } from "mobx";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// mobx 알림 제거
configure({
  enforceActions: "never",
});

let codePushOptions = {
  installMode: codePush.InstallMode.IMMEDIATE,
  // 업데이트를 어떻게 설치할 것인지 (IMMEDIATE는 강제설치를 의미)
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  // 언제 업데이트를 체크하고 반영할지를 정한다.
  // ON_APP_RESUME은 Background에서 Foreground로 오는 것을 의미
  // ON_APP_START은 앱이 실행되는(켜지는) 순간을 의미
  mandatoryInstallMode: codePush.InstallMode.ON_NEXT_RESTART,
  updateDialog: false,
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<any>(null);

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
    <AuthProvider isLoggedInProp={isLoggedIn}>
      <StoreProvider>
        <NavController />
      </StoreProvider>
    </AuthProvider>
  );
}

export default codePush(codePushOptions)(App);