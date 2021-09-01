import { Platform } from 'react-native';
import styled from 'styled-components';
import constants from "@root/constants";

export const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;

export const TopView = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  background-color: #fff;
  padding: 15px 15px 15px 0;
`;

export const SelectPhotoButton = styled.TouchableOpacity`
  width: 250px;
  height: 250px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 20px auto 0 auto;
`;

export const PhotoContainer = styled.View`
  width: 250px;
  height: 250px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  position: relative;
  margin: 20px auto 0 auto;
`;

export const DeleteButton = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
  background-color: #2ed6df;
  border: 1px solid #fff;
  border-radius: 100px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
`;

export const Photo = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;

export const InputContainer = styled.View`
  padding: 0 20px 0 20px;
`;

export const InputTitle = styled.Text`
  width: 90%;
  font-family: Roboto-Thin;
  font-size: 16px;
  color: #333;
  margin: 25px 0 0 0;
`;

export const InputBorder = styled.View`
  width: 90%;
  height: 36px;
  border-radius: 2.5px;
  border-bottom-width: 1px;
  margin: 0 0 0 0;
  padding: 0 10px 0 6px;
  flex-direction: row;
  align-items: center;
`;

export const ContentBorder = styled.View`
  width: 100%;
  height: 170px;
  border-radius: 2.5px;
  border-width: 1px;
  margin: 0 0 0 0;
  padding: 10px 10px 0 6px;
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
  text-align-vertical: top;
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

export const UploadButton = styled.TouchableOpacity`
  width: 90%;
  height: 40px;
  justify-content: center;
  align-items: center;
  background-color: #2ed6df;
  border-radius: 5px;
  margin: 20px auto 0 auto;
`;

export const UploadText = styled.Text`
  font-family: Roboto-Medium;
  font-size: 18px;
  color: #fff;
`;