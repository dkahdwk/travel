import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components';

export default () => (
  <Container>
    <ActivityIndicator size={'large'} color={'#2ed6df'} />
  </Container>
);

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
