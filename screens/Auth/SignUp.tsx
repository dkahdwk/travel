import React, { FC, useState, useContext, useRef } from 'react';
import {
  TouchableWithoutFeedback,
  ActivityIndicator,
  Keyboard,
  Alert,
} from 'react-native';
import NavTop from '@components/NavTop';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENUM_BORDER_COLOR } from '@util/enum';
import { UserContext } from '@store/StateStore';
import { observer } from 'mobx-react-lite';
import {
  Container,
  Title,
  SignUpInputTitle,
  SignUpInputBorder,
  Input,
  InputConfirmButton,
  InputConfirmText,
  IconButton,
  DeleteImage,
  SignUpButton,
  SignUpText,
} from './styles';

interface SignUpProps {
  navigation: any;
};

const SignUp: FC<SignUpProps> = ({ navigation }) => {
  const store = useContext(UserContext);
  const regex = / /gi;
  const space = /\s/g; 
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();
  const confirmPasswordRef = useRef<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [secureText, setSecureText] = useState<boolean>(true);
  const [confirmSecureText, setConfirmSecureText] = useState<boolean>(true);
  const [checkEmail, setCheckEmail] = useState<boolean>(false);
  const [userInformation, setUserInformation] = useState({
    email: '',
    pw: '',
    confirmPw: '',
  });
  const [borderColor, setBorderColor] = useState({
    email: ENUM_BORDER_COLOR.INACTIVE,
    pw: ENUM_BORDER_COLOR.INACTIVE,
    confirmPw: ENUM_BORDER_COLOR.INACTIVE,
  });

  // Secure button handle
  const secureTextButton = () => {
    setSecureText(!secureText);
  };

  // ConfirmSecure button handle
  const confirmSecureTextButton = () => {
    setConfirmSecureText(!confirmSecureText);
  };

  const handleCheckEmail = () => {
    if (userInformation.email.trim() === '') {
      return Alert.alert('실패', '이메일을 입력해주세요', [
        { text: "확인", onPress: () => setCheckEmail(false)}
      ]);
    } else if (userInformation.email.match(space)) {
      return Alert.alert('실패', '공백을 제거해주세요.', [
        { text: "확인", onPress: () => setCheckEmail(false)}
      ]);
    } else if (!emailRegex.test(userInformation.email)) {
      return Alert.alert('오류', '올바른 이메일 형식을 입력해주세요.', [
        { text: "확인", onPress: () => {
          setLoading(false);
          emailRef.current.focus();
        }}
      ]);
    } else if (userInformation.email !== 'gkahk@naver.com') {
      return Alert.alert('성공', '사용가능한 이메일입니다.', [
        { text: "확인", onPress: () => setCheckEmail(true) }
      ]);
    } else {
      return Alert.alert('실패', '중복된 이메일입니다.', [
        { text: "확인", onPress: () => setCheckEmail(false) }
      ]);
    }
  };

  const handleSignUp = () => {
    setLoading(true);

    if (userInformation.email === '') {
      return Alert.alert('오류', '이메일을 입력해주세요.', [
        { text: "확인", onPress: () => {
          setLoading(false);
          emailRef.current.focus();
        }}
      ]);
    } else if (!emailRegex.test(userInformation.email)) {
      return Alert.alert('오류', '올바른 이메일 형식을 입력해주세요.', [
        { text: "확인", onPress: () => {
          setLoading(false);
          emailRef.current.focus();
        }}
      ]);
    } else if (checkEmail !== true) {
      return Alert.alert('오류', '이메일 중복체크를 해주세요.', [
        { text: "확인", onPress: () => {
          setLoading(false);
          emailRef.current.focus();
        }}
      ]);
    } else if (userInformation.pw === '') {
      return Alert.alert('오류', '비밀번호를 입력해주세요.', [
        { text: "확인", onPress: () => {
          setLoading(false);
          passwordRef.current.focus();
        }}
      ]); 
    } else if (userInformation.confirmPw === '') {
      return Alert.alert('오류', '비밀번호 확인을 입력해주세요.', [
        { text: "확인", onPress: () => {
          setLoading(false);
          confirmPasswordRef.current.focus();
        }}
      ]); 
    } else if (userInformation.pw !== userInformation.confirmPw) {
      return Alert.alert('오류', '비밀번호가 서로 일치하지 않습니다.', [
        { text: "확인", onPress: () => {
          setLoading(false);
          confirmPasswordRef.current.focus();
        }}
      ]); 
    } else {
      AsyncStorage.setItem('user_information',JSON.stringify({
        'user_username': userInformation.email.split('@')[0],
        'user_email': userInformation.email,
        'user_pw': userInformation.pw,
      }), () => {
        return Alert.alert('완료', '회원가입이 완료되었습니다.', [
          { text: "확인", onPress: () => {
            store.email = userInformation.email;
            setLoading(false);
            navigation.navigate('Login');
          }}
        ]); 
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <NavTop navigation={navigation} closeModal={null} title={''} />
        <Container contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
          <Title>이메일로 가입하기</Title>
          <SignUpInputTitle>이메일</SignUpInputTitle>
          <SignUpInputBorder style={{ borderColor: borderColor.email }}>
            <Input
              style={{ width: userInformation.email === '' ? '95%' : '86%' }}
              value={userInformation.email}
              onChangeText={(value: string) => {
                setUserInformation({...userInformation, email: value });
                setCheckEmail(false);
              }}
              placeholder={'이메일을 입력하세요'}
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
            <InputConfirmButton
              style={{ marginRight: userInformation.email === '' ? 0 : 5 }}
              onPress={handleCheckEmail}
            >
              <InputConfirmText>확인</InputConfirmText>
            </InputConfirmButton>
            {userInformation.email !== "" &&
              <IconButton onPress={() => {
                setUserInformation({ ...userInformation, email: '' })
              }}>
                <DeleteImage source={require('@assets/login-delete.png')} />
              </IconButton>
            }
          </SignUpInputBorder>
          <SignUpInputTitle>비밀번호</SignUpInputTitle>
          <SignUpInputBorder style={{ borderColor: borderColor.pw }}>
            <Input
              style={{ width: userInformation.pw === '' ? '95%' : '88%' }}
              value={userInformation.pw}
              onChangeText={(value: string) => {
                setUserInformation({...userInformation, pw: value })
              }}
              placeholder={'비밀번호를 입력하세요'}
              placeholderTextColor="#c4c4c4"
              autoCorrect={false}
              maxLength={30}
              returnKeyType="next"
              ref={passwordRef}
              secureTextEntry={secureText}
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
              onFocus={() => {
                setBorderColor({ ...borderColor, pw: ENUM_BORDER_COLOR.ACTIVE });
              }}
              onBlur={() => {
                setBorderColor({ ...borderColor, pw: ENUM_BORDER_COLOR.INACTIVE });
              }}
            />
            <IconButton onPress={secureTextButton}>
              {secureText
                ? <Icon name="visibility-off" size={18} color={"#ccc"} />
                : <Icon name="visibility" size={18} color={"#ccc"} />
              }
            </IconButton>
            {userInformation.pw !== "" &&
              <IconButton onPress={() => {
                setUserInformation({ ...userInformation, pw: '' })
              }}>
                <DeleteImage source={require('@assets/login-delete.png')} />
              </IconButton>
            }
          </SignUpInputBorder>
          <SignUpInputTitle>비밀번호 확인</SignUpInputTitle>
          <SignUpInputBorder style={{ borderColor: borderColor.confirmPw }}>
            <Input
              style={{ width: userInformation.confirmPw === '' ? '95%' : '88%' }}
              value={userInformation.confirmPw}
              onChangeText={(value: string) => {
                setUserInformation({...userInformation, confirmPw: value })
              }}
              placeholder={'비밀번호를 한번 더 입력하세요'}
              placeholderTextColor="#c4c4c4"
              autoCorrect={false}
              maxLength={30}
              returnKeyType="next"
              ref={confirmPasswordRef}
              secureTextEntry={confirmSecureText}
              onSubmitEditing={() => passwordRef.current.focus()}
              onFocus={() => {
                setBorderColor({ ...borderColor, confirmPw: ENUM_BORDER_COLOR.ACTIVE });
              }}
              onBlur={() => {
                setBorderColor({ ...borderColor, confirmPw: ENUM_BORDER_COLOR.INACTIVE });
              }}
            />
            <IconButton onPress={confirmSecureTextButton}>
              {confirmSecureText
                ? <Icon name="visibility-off" size={18} color={"#ccc"} />
                : <Icon name="visibility" size={18} color={"#ccc"} />
              }
            </IconButton>
            {userInformation.confirmPw !== "" &&
              <IconButton onPress={() => {
                setUserInformation({ ...userInformation, confirmPw: '' })
              }}>
                <DeleteImage source={require('@assets/login-delete.png')} />
              </IconButton>
            }
          </SignUpInputBorder>
          <SignUpButton
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading
              ? <ActivityIndicator color={"white"} />
              : <SignUpText>회원가입</SignUpText>
            }
          </SignUpButton>
        </Container>
      </>
    </TouchableWithoutFeedback>
  )
};

export default observer(SignUp);