import React from 'react';
import { StatusBarComponent } from '@components/StatusBarComponent';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';

const NavTop = ({ navigation, closeModal, title }) => {
  const buttonHandler = () => {
    if (navigation === undefined) {
      closeModal();
    } else {
      navigation.goBack();
    }
  };

  return (
    <>
      <StatusBarComponent />
      <TopView>
        <BackButton onPress={buttonHandler}>
          <Icon name="keyboard-backspace" size={27} color={"#333"} />
        </BackButton>
        <Title>{title}</Title>
      </TopView>
    </>
  )
};

const TopView = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  background-color: white;
`;

const BackButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
`;

const Title = styled.Text`
  color: black;
  font-family: Roboto-Thin;
  font-size: 17px;
  margin: 0 0 0 5px;
`;

export default NavTop;