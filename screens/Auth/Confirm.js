import React, { useState, useRef } from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Keyboard,
  Alert,
} from 'react-native';
import NavTop from '@components/NavTop';
import { ENUM_BORDER_COLOR } from '@util/enum';
import {
  Container,
  AppIcon,
  Title,
  MidContainer,
  ConfirmSubtitle,
  ConfirmInputBorder,
  Input,
  IconButton,
  DeleteImage,
  CofirmButton,
  ConfirmButtonText,
} from './styles';

const Confirm = ({ navigation }) => {
  const regex = / /gi;
  const space = /\s/g; 
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailRef = useRef();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [borderColor, setBorderColor] = useState(ENUM_BORDER_COLOR.INACTIVE);

  const handleConfirm = () => {
    setLoading(true);

    if (email === '') {
      return Alert.alert('실패', '이메일을 입력해주세요', [
        { text: "확인", onPress: () => {
          emailRef.current.focus();
          setLoading(false);
        }}
      ]);
    } else if (email.match(space)) {
      return Alert.alert('실패', '공백을 제거해주세요.', [
        { text: "확인", onPress: () => {
          emailRef.current.focus();
          setLoading(false);
        }}
      ]);
    } else if (!emailRegex.test(email)) {
      return Alert.alert('실패', '이메일 양식을 확인해주세요', [
        { text: "확인", onPress: () => {
          emailRef.current.focus();
          setLoading(false); 
        }}
      ]);
    } else {
      return Alert.alert('실패', '죄송합니다. 현재 준비중인 기능입니다.', [
        { text: "확인", onPress: () => setLoading(false) }
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <NavTop navigation={navigation} />
        <Container contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
          {/* <AppIcon source={require('@assets/app_icon_120.png')} /> */}
          <AppIcon source={{ uri: 'https://i.postimg.cc/Zq9d8CPD/app-icon-120.png' }} />
          <Title>비밀번호 재설정</Title>
          <MidContainer>
            <ConfirmSubtitle>
              회원정보에 등록된 이메일 주소를 입력하면 비밀번호를 재설정할 수 있는 링크가 연결됩니다.
            </ConfirmSubtitle>
            <ConfirmInputBorder style={{ borderColor: borderColor }}>
              <Input
                value={email}
                onChangeText={(value) => setEmail(value)}
                placeholder={'이메일 주소'}
                placeholderTextColor="#c4c4c4"
                autoCorrect={false}
                maxLength={30}
                returnKeyType="next"
                ref={emailRef}
                onFocus={() => setBorderColor(ENUM_BORDER_COLOR.ACTIVE)}
                onBlur={() => setBorderColor(ENUM_BORDER_COLOR.INACTIVE)}
              />
              {email !== "" &&
                <IconButton onPress={() => setEmail('')}>
                  <DeleteImage source={{ uri: 'https://i.postimg.cc/xdKbxB7K/login-delete.png' }} />
                </IconButton>
              }
            </ConfirmInputBorder>
            <CofirmButton
              onPress={handleConfirm}
              disabled={loading}
            >
              {loading
                ? <ActivityIndicator color={'white'} />
                : <ConfirmButtonText>비밀번호 재설정 이메일 보내기</ConfirmButtonText>
              }
            </CofirmButton>
          </MidContainer>
        </Container>
      </>
    </TouchableWithoutFeedback>
  )
};

export default Confirm;