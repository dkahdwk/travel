import React, { FC, createContext } from 'react';
import { useLocalObservable, observer } from 'mobx-react-lite';

export const UserContext = createContext<any>(null);

export const StoreProvider = observer((props) => {
  const store = useLocalObservable(() => (
    {
      auth: false,
      loading: false,
      username: '',
      email: '',
      kakaoAccessToken: null,
      thumbnail: null,
      googleUserInfo: null,
    }
  ));

  return (
    <UserContext.Provider value={store}>
      {props.children}
    </UserContext.Provider>
  );
});

export default StoreProvider;