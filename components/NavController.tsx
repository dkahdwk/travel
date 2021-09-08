import React, { FC, useState, useContext, useEffect } from 'react';
import MainNavigation from '../navigation/MainNavigation';
import AuthNavigation from '../navigation/AuthNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsLoggedIn } from '@components/AuthContext';
import { UserContext } from '@store/StateStore';
import { observer } from 'mobx-react-lite';

const NavController = () => {
  const store = useContext<any>(UserContext);
  const isLoggedIn = useIsLoggedIn();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('user_information', (err, result: any) => {
      const user = JSON.parse(result);
      if (user !== null) {
        store.username = user.user_username;
      }
    });
    AsyncStorage.getItem('kakao_user_information', (err, result: any) => {
      const user = JSON.parse(result);
      if (user !== null) {
        store.kakaoAccessToken = user.access_token;
        store.username = user.user_username;
        store.thumbnail = user.user_thumbnail;
      }
    });
    AsyncStorage.getItem('google_user_information', (err, result: any) => {
      const user = JSON.parse(result);
      if (user !== null) {
        store.googleUserInfo = user;
        store.username = user.use_info.user.email.split('@')[0];
        store.thumbnail = user.use_info.user.photo;
      }
  });
  }, []);

  return (
    <>
      {isLoggedIn
        ? <MainNavigation />
        : <AuthNavigation />
      }
    </>
  );
}

export default observer(NavController);