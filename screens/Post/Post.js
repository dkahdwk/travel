import React, { useState, useContext, useEffect } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-banner-carousel-updated';
import Menu from '@screens/Menu/Menu';
import constants from "@root/constants";
import { StatusBarComponent } from '@components/StatusBarComponent';
import { UserContext } from '@store/StateStore';
import { observer } from 'mobx-react-lite';
import {
  Container,
  TopView,
  ImageContainer,
} from './styles';

const Post = ({ navigation }) => {
  const store = useContext(UserContext);

  return (
    <Container>
      <StatusBarComponent />
      <TopView>
      </TopView>
      <ImageContainer>
      </ImageContainer>
    </Container>
  )
};

export default observer(Post);