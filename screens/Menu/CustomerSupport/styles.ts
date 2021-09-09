import styled from 'styled-components/native';
import constants from "@root/constants";

export const ModalView = styled.View`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

export const Box = styled.View`
  width: ${constants.width - 40}px;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 15px 15px 15px;
  margin: auto 20px auto 20px;
`;

export const BoxLeft = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TextView = styled.View`
  margin: 0 0 0 20px;
`;

export const Title = styled.Text`
  color: #333;
  font-family: Roboto-Medium;
  font-size: 14.5px;
  margin: 0 0 5px 0;
`;

export const Content = styled.Text`
  color: gray;
  font-family: Roboto-Regular;
  font-size: 13px;
`;