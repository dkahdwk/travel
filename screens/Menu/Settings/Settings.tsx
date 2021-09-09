import React, { FC, useState, useContext } from 'react';
import { Image, Alert } from 'react-native';
import NavTop from '@components/NavTop';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileInformation from '@screens/Menu/Settings/ProfileInformation/ProfileInformation';
import { UserContext } from '@store/StateStore';
import { observer } from 'mobx-react-lite';
import { useLogOut } from '@components/AuthContext';
import { logout } from '@react-native-seoul/kakao-login';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  ModalView,
  List,
  Title,
  ContentButton,
  Content,
  GrayLine,
  LogoutButton,
  ButtonText,
} from './styles';

interface Props {
  visible: boolean;
  closeModal: any;
};

const Settings: FC<Props> = ({ visible, closeModal }) => {
  const store = useContext(UserContext);
  const generalLogout = useLogOut();
  const [modalVisible, setModalVisible] = useState({
    profileInformation: false,
  });

  const listArr = [
    { title: '계정', content: [ '계정 정보' ] },
    { title: '약관 및 정책', content: [ '서비스 이용약관', '개인정보보호정책' ] },
    { title: '앱 정보', content: [ '버전 정보' ] },
  ];

  const signOutWithKakao = async () => {
    try {
      store.kakaoAccessToken = null;
      await AsyncStorage.removeItem('kakao_user_information');
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  const signOutWithGoogle = async () => {
    try {
      store.googleUserInfo = null;
      await AsyncStorage.removeItem('google_user_information');
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  const logoutAll = () => {
    generalLogout();
    AsyncStorage.removeItem('user_information');
    store.username = '';
    store.thumbnail = null;

    if (store.kakaoAccessToken !== null) {
      signOutWithKakao();
    } else if (store.googleUserInfo !== null) {
      signOutWithGoogle();
    }
  };

  const handleListPress = (content: string) => {
    if (content === '계정 정보') {
      setModalVisible({ ...modalVisible, profileInformation: true });
    }
  };

  const handleLogout = () => {
    Alert.alert('', '정말 로그아웃 하시겠어요?', [
      { text: "취소", style: "cancel" },
      { text: "로그아웃", onPress: () => logoutAll() }
    ]);
  };

  return (
    <Modal
      isVisible={visible}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropOpacity={0.4}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      style={{ margin: 0, alignItems: 'flex-end' }}
    >
      <ModalView>
        <NavTop navigation={undefined} closeModal={closeModal} title={"설정"} />
        <ProfileInformation
          visible={modalVisible.profileInformation}
          closeModal={() => setModalVisible({ ...modalVisible, profileInformation: false })}
        />
        {listArr.map((item, index) => (
          <List key={index}>
            <Title>{item.title}</Title>
            {item.content.map((item, index) => (
              <ContentButton
                key={index}
                onPress={() => handleListPress(item)}
              >
                <Content>{item}</Content>
                <Image
                  style={{ width: 5, height: 9 }}
                  // source={require('@assets/arrow-right.png')}
                  source={{ uri: 'https://i.postimg.cc/RVYWdvP3/arrow-right.png' }}
                />
              </ContentButton>
            ))}
            {listArr.length -1 !== index && <GrayLine />}
          </List>
        ))}
        <LogoutButton onPress={handleLogout}>
          <ButtonText>로그아웃</ButtonText>
        </LogoutButton>
      </ModalView>
    </Modal>
  );
};

export default observer(Settings);