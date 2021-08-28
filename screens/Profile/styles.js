import { Platform } from 'react-native';
import styled from 'styled-components';
import constants from "@root/constants";

export const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export const TopView = styled.View`
  width: 100%;
  height: 35px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0 15px 0 0;
  margin: 10px 0 0 0;
`;

export const UserView = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 0 25px 0 20px;
  margin: 20px 0 20px 0;
`;

export const UserImg = styled.Image`
  width: 55px;
  height: 55px;
  border-radius: 100px;
`;

export const UserInsideView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 0 10px;
`;

export const Username = styled.Text`
  font-family: Roboto-Regular;
  font-size: 20px;
  color: #000;
`;

export const GrayLine = styled.View`
  width: 90%;
  border-top-width: 1px;
  border-color: #ececec;
  margin: 0 auto;
`;

export const Title = styled.Text`
  font-family: Roboto-Thin;
  font-size: 18px;
  color: #000;
  margin: 20px 0 0 20px;
`;

export const TravelList = styled.TouchableOpacity`
  width: ${constants.width / 2 - 22.5}px;
  margin: 20px 0 5px 15px;
`;

export const TravelImg = styled.Image`
  width: ${constants.width / 2 - 22.5}px;
  height: ${constants.width / 2 - 22.5}px;
  border-radius: 5px;
`;

export const TravelTitle = styled.Text`
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #333;
  margin: 10px 0 10px 0;
`;

export const TravelDate = styled.Text`
  font-family: Roboto-Thin;
  font-size: 14px;
  color: #6f6f6f;
  margin: 0 0 10px 0;
`;

export const EmptyView = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const EmptyTitle = styled.Text`
  font-family: Roboto-Regular;
  font-size: 18px;
  color: #333;
  margin: 0 0 2.5px 0;
`;

export const EmptySubtitle = styled.Text`
  font-family: Roboto-Thin;
  font-size: 14px;
  color: #4f4f4f;
`;