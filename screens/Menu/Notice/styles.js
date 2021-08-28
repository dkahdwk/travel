import styled from 'styled-components';
import constants from "@root/constants";

export const ModalView = styled.View`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

export const List = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-color: #ccc;
  padding: 12.5px 20px 12.5px 20px;
`;

export const ListLeft = styled.View`
  
`;

export const Date = styled.Text`
  color: #ccc;
  font-family: Roboto-Regular;
  font-size: 13px;
`;

export const Title = styled.Text`
  color: #333;
  font-family: Roboto-Medium;
  font-size: 16px;
`;

export const ContentView = styled.View`
  width: 100%;
  background-color: #eee;
  padding: 15px 20px 15px 20px;
`;

export const Content = styled.Text`
  color: #333;
  font-family: Roboto-Regular;
  font-size: 14px;
`;