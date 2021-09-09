import React, { FC, useState } from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';
import constants from "@root/constants";
import UserProfile from '@components/UserProfile';
import { TransparentStatusBarComponent } from '@components/StatusBarComponent';

interface Props {
  content: {
    username: string,
    title: string,
    content: string,
    date: string,
    img: {},
    like: number,
  };
  visible: boolean;
  closeModal: any;
};

const PostModal: FC<Props> = ({ content, visible, closeModal }) => {
  const [userProfileModalVisible, setUserProfileModalVisible] = useState(false);
  console.log(content);
  return (
    <Modal
      isVisible={visible}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropOpacity={0.4}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      style={{ margin: 0, alignItems: 'flex-end' }}
    >
      <ModalView>
        <BackgroundImage
          resizeMode={'cover'}
          source={content.img}
        >
          <Container>
            <UserProfile
              content={content}
              visible={userProfileModalVisible}
              closeModal={() => setUserProfileModalVisible(false)}
            />
            <TransparentStatusBarComponent />
            <TopView>
              <BackButton onPress={closeModal}>
                <Icon name="keyboard-backspace" size={27} color={"#fff"} />
              </BackButton>
            </TopView>
            <TextContainer>
              <UserView onPress={() => setUserProfileModalVisible(true)}>
                <UserImage source={content.img} />
                <Username>{content.username}</Username>
              </UserView>
              <Title>{content.title}</Title>
              <Date>{content.date}</Date>
              <Content>{content.content}</Content>
            </TextContainer>
          </Container>
        </BackgroundImage>
      </ModalView>
    </Modal>
  );
};

const ModalView = styled.View`
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 0 0 40px 0;
`;

const BackgroundImage = styled.ImageBackground`
  width: ${constants.width}px;
  height: ${constants.height}px;
`;

const Container = styled.View`
  flex: 1;
  background-color: rgba(0,0,0,0.47);
`;

const TopView = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const BackButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
`;

const TextContainer = styled.View`
  padding: 0 30px 0 20px;
`;

const UserView = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 0 0 15px 0;
`;

const UserImage = styled.Image`
  width: 25px;
  height: 25px;
  border-radius: 100px;
  margin: 0 10px 0 0;
`;

const Username = styled.Text`
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #fff;
`;

const Title = styled.Text`
  font-family: Roboto-Medium;
  font-size: 26px;
  color: #fff;
`;

const Date = styled.Text`
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #ddd;
  margin: 10px 0 25px 0;
`;

const Content = styled.Text`
  font-family: Roboto-Regular;
  font-size: 18px;
  color: #fff;
`;

export default PostModal;