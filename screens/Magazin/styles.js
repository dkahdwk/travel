import { Platform } from 'react-native';
import styled from 'styled-components';
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
  margin: 15px 0 0 20px;
`;

export const PointTitle = styled.Text`
  font-family: Roboto-Regular;
  color: #2ed6df;
`;

export const FlatView = styled.TouchableOpacity`
  margin: 40px 0 0 0;
  padding: 0 20px 0 20px;
`;

export const Label = styled.Text`
  font-family: Roboto-Thin;
  font-size: 14px;
  color: red;
`;

export const NewsInsideView = styled.View`
  flex: 1;
  flex-direction: row;
`;

export const NewsInsideLeftView = styled.View`
  flex: 1;
  padding: 0 20px 0 0
`;

export const NewsTitle = styled.Text`
  font-family: Roboto-Thin;
  font-size: 20px;
  color: #333;
  margin: 2.5px 0 10px 0;
`;

export const NewsContent = styled.Text`
  font-family: Roboto-Thin;
  font-size: 15px;
  color: #9f9f9f;
  margin: 0 0 10px 0;
`;

export const NewsImg = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 5px;
`;

export const NewsTagView = styled.View`
  flex-direction: row;
`;

export const NewsTagBox = styled.View`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 5px 5px 5px;
  margin: 0 5px 0 0;
`;

export const NewsTags = styled.Text`
  font-family: Roboto-Thin;
  font-size: 13px;
  color: #333;
`;