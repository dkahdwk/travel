import React, { FC, useState, useContext } from 'react';
import { RefreshControl, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Menu from '@screens/Menu/Menu';
import Search from '@components/Search';
import PostModal from '@components/PostModal';
import Loader from '@components/Loader';
import { travelArr } from './dataArr';
import { StatusBarComponent } from '@components/StatusBarComponent';
import { UserContext } from '@store/StateStore';
import { observer } from 'mobx-react-lite';
import {
  Container,
  TopView,
  Title,
  PointTitle,
  TravelView,
  UserView,
  UserImg,
  Username,
  Picture,
  TravelTitle,
  DateView,
  Date,
  Like,
} from './styles';

interface Props {
  navigation: any;
};

interface ModalState {
  content: any;
  menuVisible: boolean;
  searchVisible: boolean;
  postVisible: boolean;
};

const Travel: FC<Props> = ({ navigation }) => {
  const store = useContext(UserContext);
  const [loader, setLoader] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalState>({
    content: {},
    menuVisible: false,
    searchVisible: false,
    postVisible: false,
  });

  // temporary refresh
  const temporaryLoader = () => {
    setLoader(true);
    setTimeout(() => setLoader(false), 700);
  };

  // onPress event of list
  const showPostModal = (item: object) => {
    setModal({ ...modal, content: item, postVisible: true });
  };

  return (
    <Container>
      <StatusBarComponent />
      <TopView>
        <TouchableOpacity onPress={() => setModal({ ...modal, searchVisible: true })}>
          <Icon
            name="search"
            size={28}
            style={{ marginRight: 15, color: 'gray' }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModal({ ...modal, menuVisible: true })}>
          <Icon name="menu" size={28} color={'gray'} />
        </TouchableOpacity>
      </TopView>

      {/* menu modal */}
      <Menu
        navigation={navigation}
        visible={modal.menuVisible}
        closeModal={() => setModal({ ...modal, menuVisible: false })}
        username={store.username}
      />

      {/* search modal */}
      <Search
        visible={modal.searchVisible}
        closeModal={() => setModal({ ...modal, searchVisible: false })}
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
          data={travelArr}
          contentContainerStyle={{ paddingBottom: 40 }}
          refreshControl={
            <RefreshControl
              refreshing={loader}
              onRefresh={() => temporaryLoader()}
            />
          }
          ListHeaderComponent={
            <Title>
              <PointTitle>기억</PointTitle>을 담아.{"\n"}
              그 때 그 <PointTitle>설렘</PointTitle> 그대로.
            </Title>
          }
          renderItem={({ item }) => (
            <TravelView onPress={() => showPostModal(item)}>
              <UserView>
                <UserImg source={item.img} />
                <Username>{item.username}</Username>
              </UserView>
              <Picture source={item.img} />
              <TravelTitle>{item.title}</TravelTitle>
              <DateView>
                <Icon name="event-note" size={18} color={"#4f4f4f"} />
                <Date>{item.date}</Date>
                <Icon name="favorite-border" size={18} color={"#ff2e5c"} />
                <Like>{item.like}</Like>
              </DateView>
            </TravelView>
          )}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
        />
      )}
    </Container>
  )
};

export default observer(Travel);