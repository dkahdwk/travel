import React, { FC, useState, useRef, useContext } from 'react';
import {
  TouchableWithoutFeedback,
  ActivityIndicator,
  Keyboard,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { getProfile as getKakaoProfile, login } from '@react-native-seoul/kakao-login';
import { StatusBarComponent } from '@components/StatusBarComponent';
import { ENUM_BORDER_COLOR } from '@util/enum';
import { UserContext } from '@store/StateStore';
import { observer } from 'mobx-react-lite';
import { useLogIn } from "@components/AuthContext";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import {
  Container,
  AppIcon,
  InputBorder,
  Input,
  IconButton,
  DeleteImage,
  Button,
  ButtonText,
  KakaoButton,
  KakaoButtonText,
  KakaoLogo,
  GoogleButton,
  GoogleLogo,
  GoogleButtonText,
  MembershipView,
  MembershipButton,
  MembershipText,
  GrayLine,
  Version,
} from './styles';

interface LoginProps {
  navigation: any;
};

const Login: FC<LoginProps> = ({ navigation }) => {
  const store = useContext(UserContext);
  const logInManager = useLogIn();
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [secureText, setSecureText] = useState<boolean>(true);
  const [userInformation, setUserInformation] = useState<any>({
    email: '',
    pw: '',
  });
  const [borderColor, setBorderColor] = useState({
    email: ENUM_BORDER_COLOR.INACTIVE,
    pw: ENUM_BORDER_COLOR.INACTIVE,
  });

  // Secure button handle
  const secureTextButton = () => {
    setSecureText(!secureText);
  };

  // Kakao login
  const signInWithKakao = async () => {
    const token = await login();

    try {
      store.kakaoAccessToken = token.accessToken;
      logInManager(true);
    } catch (e) {
      console.log(e);
    } finally {
      // get kakao profile
      getProfile();
    }
  };
  
  // Get kakao profile
  const getProfile = async () => {
    const profile = await getKakaoProfile();

    store.username = profile.nickname;
    store.thumbnail = profile.thumbnailImageUrl;

    AsyncStorage.setItem('kakao_user_information',JSON.stringify({
      'access_token': store.kakaoAccessToken,
      'user_username': profile.nickname,
      'user_thumbnail': profile.thumbnailImageUrl,
    }));

    console.log('profile', profile);
  };

  // Google login
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      store.googleUserInfo = { userInfo };
      store.username = userInfo.user.email.split('@')[0];
      store.thumbnail = userInfo.user.photo;
      
      AsyncStorage.setItem('google_user_information',JSON.stringify({
        'use_info': userInfo,
        'user_email': userInfo.user.name,
        'user_thumnail': userInfo.user.photo,
      }), () => {
        console.log('구글 유저 데이터 저장');
      });
      logInManager(true);
    } catch (error) {
      console.log(error.code)
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.error(error);
      }
    }
  };

  // General login
  const handleLogin = async () => {
    setLoading(true);
  
    if (userInformation.email === '') {
      return Alert.alert('오류', '이메일을 입력해주세요.', [
        { text: "확인", onPress: () => {
          setLoading(false);
          emailRef.current.focus();
        }}
      ]);
    } else if (userInformation.email !== 'test@naver.com' && userInformation.email !== store.email) {
      return Alert.alert('오류', '일치하는 이메일이 존재하지 않습니다.', [
        { text: "확인", onPress: () => setLoading(false) }
      ]);
    } else if (userInformation.pw === '') {
      return Alert.alert('오류', '비밀번호를 입력해주세요.', [
        { text: "확인", onPress: () => setLoading(false) }
      ]);
    } else if (userInformation.pw !== 'audwp1') {
      return Alert.alert('오류', '비밀번호가 옳바르지 않습니다. 다시 입력해주세요.', [
        { text: "확인", onPress: () => setLoading(false) }
      ]);
    } else {
      try {
        AsyncStorage.setItem('user_information',JSON.stringify({
          'user_username': userInformation.email.split('@')[0],
          'user_email': userInformation.email,
          'user_pw': userInformation.pw,
        }), () => {
          console.log('데이터 저장');
        });
      } catch (e) {
        console.error(`error: ${e}`)
      } finally {
        setLoading(false);
        AsyncStorage.getItem('user_information', (err, result: any) => {
          const user = JSON.parse(result); //string화 된 result를 parsing
          store.username = user.user_username;
        });
      }
      return Alert.alert('성공', '로그인에 성공하였습니다.', [
        { text: "확인", onPress: () => logInManager(true) }
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <StatusBarComponent />
        <Container
          style={{ marginTop: -90 }}
          contentContainerStyle={{
            flex: 1, justifyContent: 'center', alignItems: 'center'
          }}
        >
          <AppIcon source={require('@assets/app_icon_120.png')} />
          <InputBorder style={{ borderColor: borderColor.email }}>
            <Input
              value={userInformation.email}
              onChangeText={(value: string) => setUserInformation({ ...userInformation, email: value })}
              placeholder={'이메일을 입력해주세요'}
              placeholderTextColor="#c4c4c4"
              autoCorrect={false}
              maxLength={30}
              returnKeyType="next"
              ref={emailRef}
              onSubmitEditing={() => passwordRef.current.focus()}
              onFocus={() => {
                setBorderColor({ ...borderColor, email: ENUM_BORDER_COLOR.ACTIVE });
              }}
              onBlur={() => {
                setBorderColor({ ...borderColor, email: ENUM_BORDER_COLOR.INACTIVE });
              }}
            />
            {userInformation.email !== "" &&
              <IconButton onPress={() => setUserInformation({ ...userInformation, email: '' })}>
                <DeleteImage source={require('@assets/login-delete.png')} />
              </IconButton>
            }
          </InputBorder>
          <InputBorder style={{ borderColor: borderColor.pw }}>
            <Input
              style={{ width: userInformation.pw === '' ? '95%' : '88%' }}
              value={userInformation.pw}
              onChangeText={(value: string) => setUserInformation({ ...userInformation, pw: value })}
              placeholder={'비밀번호를 입력해주세요'}
              placeholderTextColor="#c4c4c4"
              autoCorrect={false}
              maxLength={30}
              returnKeyType="next"
              ref={passwordRef}
              secureTextEntry={secureText}
              onFocus={() => {
                setBorderColor({ ...borderColor, pw: ENUM_BORDER_COLOR.ACTIVE });
              }}
              onBlur={() => {
                setBorderColor({ ...borderColor, pw: ENUM_BORDER_COLOR.INACTIVE });
              }}
            />
            {userInformation.pw !== "" &&
              <IconButton onPress={() => setUserInformation({ ...userInformation, pw: '' })}>
                <DeleteImage source={require('@assets/login-delete.png')} />
              </IconButton>
            }
            <IconButton onPress={secureTextButton}>
              {secureText
                ? <Icon name="visibility-off" size={17} color={"#ccc"} />
                : <Icon name="visibility" size={17} color={"#ccc"} />
              }
            </IconButton>
          </InputBorder>
          <Button
            onPress={handleLogin}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color={"white"} />
              : <ButtonText>아이디로 로그인</ButtonText>
            }
          </Button>
          <KakaoButton
            style={store.kakaoAccessToken === null ? {} : { backgroundColor: 'gray' }}
            disabled={store.kakaoAccessToken === null ? false : true}
            onPress={signInWithKakao}
          >
            <KakaoLogo source={require('@assets/kakao_logo.png')} />
            {store.kakaoAccessToken === null
              ? <KakaoButtonText>카카오로 로그인</KakaoButtonText>
              : <KakaoButtonText style={{ color: 'white' }}>카카오로 로그인중입니다</KakaoButtonText>
            }
          </KakaoButton>
          <GoogleButton
            style={store.googleUserInfo === null ? {} : { backgroundColor: 'gray' }}
            disabled={store.googleUserInfo === null ? false : true}
            onPress={signInWithGoogle}
          >
            <GoogleLogo source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }} />
            {store.googleUserInfo === null
              ? <GoogleButtonText>구글로 로그인</GoogleButtonText>
              : <GoogleButtonText style={{ color: 'white' }}>구글로 로그인중입니다</GoogleButtonText>
            }
          </GoogleButton>
          <MembershipView>
            <MembershipButton onPress={() => navigation.navigate('Confirm')}>
              <MembershipText>비밀번호 찾기</MembershipText>
            </MembershipButton>  
              <GrayLine />
            <MembershipButton onPress={() => navigation.navigate('SignUp')}>  
              <MembershipText style={{ color: '#2ed6df' }}>
                이메일로 가입하기
              </MembershipText>
            </MembershipButton>
          </MembershipView>
          <Version>{DeviceInfo.getVersion()}</Version>
        </Container>
      </>
    </TouchableWithoutFeedback>
  )
}

export default observer(Login);