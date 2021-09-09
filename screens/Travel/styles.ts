import { Platform } from 'react-native';
import styled from 'styled-components/native';
import constants from "@root/constants";

export const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export const TopView = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 15px 15px 15px 0;
`;

export const Title = styled.Text`
  font-family: Roboto-Thin;
  font-size: 24px;
  color: #4f4f4f;
  margin: 15px 0 10px 30px;
`;

export const PointTitle = styled.Text`
  font-family: Roboto-Regular;
  color: #2ed6df;
`;

export const TravelView = styled.TouchableOpacity`
  margin: 30px 0 5px 30px;
`;

export const UserView = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin: 0 0 0 5px;
`;

export const UserImg = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 100px;
`;

export const Username = styled.Text`
  font-family: Roboto-Regular;
  font-size: 14px;
  color: #4f4f4f;
  margin: 0 0 0 7.5px;
`;

export const Picture = styled.Image`
  width: ${constants.width - 60}px;
  height: 220px;
  border-radius: 10px;
  margin: 10px 0 0 0;
`;

export const TravelTitle = styled.Text`
  font-family: Roboto-Regular;
  font-size: 20px;
  color: #333;
  margin: 20px 0 10px 5px;
  padding: 0 20px 0 0;
`;

export const DateView = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin: 0 0 0 5px;
`;

export const Date = styled.Text`
  font-family: Roboto-Regular;
  font-size: 14px;
  color: #333;
  margin: 0 15px 0 5px;
`;

export const Like = styled.Text`
  font-family: Roboto-Regular;
  font-size: 14px;
  color: #333;
  margin: 0 0 0 5px;
`;
