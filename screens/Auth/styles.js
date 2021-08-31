import { Platform } from 'react-native';
import styled from 'styled-components';
import constants from "@root/constants";
import { getBottomSpace } from '@util/iphoneXHelper';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

export const AppIcon = styled.Image`
  width: 60px;
  height: 60px;
  margin: 20px 0 10px 0;
`;

export const InputBorder = styled.View`
  width: 72.5%;
  height: 36px;
  border-radius: 2.5px;
  border-bottom-width: 1px;
  margin: 25px 0 0 0;
  padding: 0 10px 0 6px;
  flex-direction: row;
  align-items: center;
`;

export const Input = styled.TextInput`
  width: 95%;
  height: 100%;
  font-family: Roboto-Regular;
  font-size: 14px;
  color: #4a4a4a;
  padding: 0;
`;

export const IconButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 -2.5px;
`;

export const DeleteImage = styled.Image`
  width: 14px;
  height: 14px;
`;

export const Button = styled.TouchableOpacity`
  width: 72.5%;
  height: 50px;
  background-color: #2ed6df;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  margin: 30px 0 0 0;
`;

export const ButtonText = styled.Text`
  font-family: Roboto-Medium;
  font-size: 16px;
  color: #fff;
`;

export const KakaoButton = styled.TouchableOpacity`
  width: 72.5%;
  height: 50px;
  background-color: #fee500
  border-radius: 6px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 10px 0 0 0;
`;

export const KakaoButtonText = styled.Text`
  font-family: Roboto-Medium;
  font-size: 16px;
  color: #333;
`;

export const KakaoLogo = styled.Image`
  width: 18px;
  height: 17.5px;
  margin: 0 10px 0 0;
`;

export const GoogleButton = styled.TouchableOpacity`
  width: 72.5%;
  height: 50px;
  border-color: #ccc;
  border-width: 1px;
  border-radius: 6px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 11px 0 0 0;
`;

export const GoogleButtonText = styled.Text`
  font-family: Roboto-Medium;
  font-size: 16px;
  color: gray;
`;

export const GoogleLogo = styled.Image`
  width: 20px;
  height: 20px;
  margin: 0 10px 0 0;
`;

export const MembershipView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0 0 0;
`;

export const MembershipButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const MembershipText = styled.Text`
  font-family: Roboto-Regular;
  font-size: 14px;
  color: #333;
`;

export const GrayLine = styled.View`
  width: 1px;
  height: 12.5px;
  background-color: #ccc;
  margin: 0 7.5px 0 7.5px;
`;

export const Title = styled.Text`
  font-family: Roboto-Medium;
  font-size: 18px;
  color: #333;
  margin: 10px 0 10px 0;
`;

export const SignUpInputTitle = styled.Text`
  width: 310px;
  font-family: Roboto-Thin;
  font-size: 14px;
  color: #333;
  margin: 25px 0 0 0;
`;

export const SignUpInputBorder = styled.View`
  width: 310px;
  height: 36px;
  border-radius: 2.5px;
  border-bottom-width: 1px;
  margin: 5px 0 0 0;
  padding: 0 10px 0 6px;
  flex-direction: row;
  align-items: center;
`;

export const InputConfirmButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const InputConfirmText = styled.Text`
  font-family: Roboto-Regular;
  font-size: 14px;
  color: #333;
`;

export const SignUpButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background-color: #2ed6df;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: ${Platform.OS === 'ios' ? getBottomSpace() : 0}px;
`;

export const SignUpText = styled.Text`
  font-family: Roboto-Bold;
  font-size: 18px;
  color: #fff;
`;

export const MidContainer = styled.View`
  width: 90%;
  align-items: center;
  margin: 25px 0 0 0;
`;

export const ConfirmSubtitle = styled.Text`
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #333;
`;

export const ConfirmInputBorder = styled.View`
  width: 100%;
  height: 45px;
  border-radius: 2.5px;
  border-width: 1px;
  flex-direction: row;
  align-items: center;
  margin: 20px 0 0 0;
  padding: 0 10px 0 6px;
`;

export const CofirmButton = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  border-radius: 2.5px;
  background-color: #2ed6df;
  justify-content: center;
  align-items: center;
  margin: 20px 0 0 0;
`;

export const ConfirmButtonText = styled.Text`
  font-family: Roboto-Medium;
  font-size: 16px;
  color: #fff;
`;

export const Version = styled.Text`
  font-family: Roboto-Regular;
  font-size: 12px;
  color: gray;
  position: absolute;
  bottom: 30px;
`;