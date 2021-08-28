import styled from 'styled-components';
import constants from "@root/constants";
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const ModalView = styled.View`
  width: ${constants.width * 0.68}px;
  height: 100%;
  background-color: #fff;
`;

export const MenuTop = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin: ${Platform.OS === 'ios' ? getStatusBarHeight() : 10}px 0 0 0;
  padding: 0 15px 0 0;
`;

export const TopButton = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  margin: 0 0 0 15px;
`;

export const UserView = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 50px 0 35px 20px;
`;

export const UserImg = styled.Image`
  width: 45px;
  height: 45px;
  border-radius: 100px;
`;

export const MenuUsername = styled.Text`
  color: #000;
  font-size: 20px;
  font-family: Roboto-Thin;
  margin: 0 0 5px 0;
`;

export const MenuUsernameTag = styled.Text`
  color: #333;
  font-size: 14px;
  font-family: Roboto-Thin;
`;

export const MenuList = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px 10px 20px;
`;

export const MenuListText = styled.Text`
  color: black;
  font-size: 15px;
  font-family: Roboto-Thin;
  margin: 0 0 0 15px;
`;

export const MenuLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;