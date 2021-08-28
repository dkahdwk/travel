import { Platform } from 'react-native';
import styled from 'styled-components';
import constants from "@root/constants";

export const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export const TopView = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: center;
`;

export const ImageContainer = styled.View`
  width: 250px;
  height: 250px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;