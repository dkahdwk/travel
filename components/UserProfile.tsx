import React, { FC, useState, useContext } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import Loader from '@components/Loader';
import styled from 'styled-components/native';
import NavTop from '@components/NavTop';
import PostModal from '@components/PostModal';
import { UserContext } from '@store/StateStore';
import { observer } from 'mobx-react-lite';
import {
  UserView,
  UserImg,
  UserInsideView,
  Username,
  GrayLine,
  Title,
  TravelList,
  TravelTitle,
  TravelImg,
  TravelDate,
  EmptyView,
  EmptyTitle,
  EmptySubtitle,
} from '@screens/Profile/styles';

interface Props {
  content: {
    username: string,
    title: string,
    content: string,
    date: string,
    img: object,
    like: number,
  };
  visible: boolean;
  closeModal: any;
};

interface PostModalProps {
  content: any;
  visible: boolean;
};

const UserProfile: FC<Props> = ({ content, visible, closeModal }) => {
  const store = useContext(UserContext);
  const [loader, setLoader] = useState<boolean>(false);
  const [postModal, setPostModal] = useState<PostModalProps>({
    content: {},
    visible: false,
  });

  // temporary refresh
  const temporaryLoader = () => {
    setLoader(true);
    setTimeout(() => setLoader(false), 700);
  };

  // onPress event of list
  const showPostModal = (item: {}) => {
    setPostModal({ content: item, visible: true });
  };

  const listHeaderComponent = () => {
    return (
      <>
        <UserView>
          {content.img === null
            ? <Icon name="account-circle" size={55} color={"gray"} />
            : <UserImg source={content.img} />
          }
          <UserInsideView>
            <Username>{content.username}</Username>
          </UserInsideView>
        </UserView>
        <GrayLine />
        <Title>{content.username}님의 여행기</Title>
      </>
    )
  };

  const emptyComponent = () => {
    return (
      <EmptyView>
        <EmptyTitle>게시한 여행기가 없습니다😥</EmptyTitle>
        <EmptySubtitle>새로운 여행기를 올려보세요!</EmptySubtitle>
      </EmptyView>
    )
  };

  return (
    <Modal
      isVisible={visible}
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
      backdropOpacity={0.4}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      style={{ margin: 0, alignItems: 'flex-end' }}
    >
      <ModalView>
        <NavTop navigation={undefined} closeModal={closeModal} title={"계정 정보"} />
        {/* 포스트 modal */}
        <PostModal
          content={postModal.content}
          visible={postModal.visible}
          closeModal={() => setPostModal({ ...postModal, visible: false })}
        />
        {loader ? (
          <Loader /> 
        ) : (
          <FlatList
            data={null}
            contentContainerStyle={{ paddingBottom: 40, flexGrow: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={loader}
                onRefresh={() => temporaryLoader()}
              />
            }
            ListHeaderComponent={listHeaderComponent}
            renderItem={({ item }) => (
              <TravelList onPress={() => showPostModal(item)}>
                <TravelImg source={item.img} />
                <TravelTitle numberOfLines={2}>{item.title}</TravelTitle>
                <TravelDate>{item.date}</TravelDate>
              </TravelList>
            )}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={emptyComponent}
          />
        )}
      </ModalView>
    </Modal>
  )
};

const ModalView = styled.View`
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 0 0 40px 0;
`;

export default observer(UserProfile);