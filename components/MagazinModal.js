import React from 'react';
import { ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import constants from "@root/constants";
import { TransparentStatusBarComponent } from '@components/StatusBarComponent';

const MagazinModal = ({ content, visible, closeModal }) => {
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
        <TransparentStatusBarComponent />
        <TopView>
          <BackButton onPress={closeModal}>
            <Icon name="keyboard-backspace" size={27} color={"#333"} />
          </BackButton>
        </TopView>
        <ScrollView>
          <PaddingView>
            <FlexRowView>
              <Label>{content.label}</Label>
              <Category>・</Category>
              <Category>{content.path}</Category>
            </FlexRowView>
            <Title>{content.title}</Title>
            <Date>{content.date}</Date>
            <FlexRowView style={{ marginTop: 15 }}>
              {content.tags !== undefined && content.tags.map((item, index) => (
                <TagBox key={index}>
                  <Tag>{item}</Tag>
                </TagBox>
              ))}
            </FlexRowView>
          </PaddingView>
          <PostImage source={content.img} />
          <Content>{content.content}</Content>
        </ScrollView>
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

const PaddingView = styled.View`
  padding: 0 20px 0 20px;
`;

const FlexRowView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Label = styled.Text`
  font-family: Roboto-Thin;
  font-size: 14px;
  color: red;
  margin: 20px 5px 0 0;
`;

const Category = styled.Text`
  font-family: Roboto-Thin;
  font-size: 14px;
  color: #6f6f6f;
  margin: 20px 5px 0 0;
`;

const Title = styled.Text`
  font-family: Roboto-Medium;
  font-size: 22px;
  color: #333;
  margin: 10px 0 15px 0;
`;

const Date = styled.Text`
  font-family: Roboto-Regular;
  font-size: 15px;
  color: #6f6f6f;
`;

const TagBox = styled.View`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 5px 5px 5px;
  margin: 0 5px 0 0;
`;

const Tag = styled.Text`
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #4f4f4f;
`;

const PostImage = styled.Image`
  width: 100%;
  height: 300px;
  margin: 25px 0 25px 0;
`;

const Content = styled.Text`
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #333;
  padding: 0 20px 60px 20px;
`;

export default MagazinModal;