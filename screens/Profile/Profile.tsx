import React, { FC, useState, useContext } from 'react';
import { TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Menu from '@screens/Menu/Menu';
import Loader from '@components/Loader';
import PostModal from '@components/PostModal';
import { myTravelArr } from './dataArr';
import { StatusBarComponent } from '@components/StatusBarComponent';
import { UserContext } from '@store/StateStore';
import { observer } from 'mobx-react-lite';
import {
  Container,
  TopView,
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
} from './styles';

interface Props {
  navigation: any;
};

interface ModalProps {
  content: any;
  menuVisible: boolean;
  postVisible: boolean;
};

const Profile: FC<Props> = ({ navigation }) => {
  const store = useContext(UserContext);
  const [loader, setLoader] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalProps>({
    content: {},
    menuVisible: false,
    postVisible: false,
  });

  // temporary refresh
  const temporaryLoader = () => {
    setLoader(true);
    setTimeout(() => setLoader(false), 700);
  };

  // onPress event of list
  const showPostModal = (item: {}) => {
    setModal({ ...modal, content: item, postVisible: true });
  };

  const listHeaderComponent = () => {
    return (
      <>
        <UserView>
          {store.thumbnail === null
            ? <Icon name="account-circle" size={55} color={"gray"} />
            : <UserImg source={{ uri: store.thumbnail }} />
          }
          <UserInsideView>
            <Username>{store.username}</Username>
          </UserInsideView>
        </UserView>
        <GrayLine />
        <Title>내 여행기</Title>
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
    <Container>
      <StatusBarComponent />
      <TopView>
        <TouchableOpacity onPress={() => setModal({ ... modal, menuVisible: true })}>
          <Icon
            name="menu"
            size={28}
            color={'gray'}
          />
        </TouchableOpacity>
      </TopView>

      {/* menu modal */}
      <Menu
        navigation={navigation}
        visible={modal.menuVisible}
        closeModal={() => setModal({ ...modal, menuVisible: false })}
        username={store.username}
      />

      {/* post modal */}
      <PostModal
        content={modal.content}
        visible={modal.postVisible}
        closeModal={() => setModal({ ...modal, postVisible: false })}
      />
      {loader ? (
        <Loader /> 
      ) : (
        <FlatList
          data={myTravelArr}
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
    </Container>
  )
};

export default observer(Profile);