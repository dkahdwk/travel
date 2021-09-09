import { Platform } from 'react-native';
import styled from 'styled-components/native';
import constants from "@root/constants";

export const ModalView = styled.View`
  width: 100%;
  height: 100%;
  background-color: #ddd;
`;

export const List = styled.View`
  background-color: #fff;
  padding: 20px 20px 5px 20px;
`;

export const Title = styled.Text`
  color: #333;
  font-family: Roboto-Bold;
  font-size: 16px;
  margin: 0 0 10px 0;
`;

export const ContentButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0 15px 0;
`;

export const Content = styled.Text`
  color: #3e3e3e;
  font-family: Roboto-Regular;
  font-size: 14px;
`;

export const GrayLine = styled.View`
  width: 100%;
  border-bottom-width: 1px;
  border-color: #ccc;
`;

export const LogoutButton = styled.TouchableOpacity`
  width: 90%;
  height: 50px;
  background-color: #2ed6df;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin: 20px auto 0 auto;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-family: Roboto-Medium;
  font-size: 16px;
`;