import React, { FC, useState, useContext } from 'react';
import { TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Menu from '@screens/Menu/Menu';
import Search from '@components/Search';
import Loader from '@components/Loader';
import MagazinModal from '@components/MagazinModal';
import { magazinArr } from './dataArr';
import { StatusBarComponent } from '@components/StatusBarComponent';
import { UserContext } from '@store/StateStore';
import { observer } from 'mobx-react-lite';
import {
  Container,
  TopView,
  Title,
  PointTitle,
  FlatView,
  Label,
  NewsInsideView,
  NewsInsideLeftView,
  NewsTitle,
  NewsContent,
  NewsImg,
  NewsTagView,
  NewsTagBox,
  NewsTags
} from './styles';

interface Props {
  navigation: any;
};

interface ModalState {
  content: any;
  menuVisible: boolean;
  searchVisible: boolean;
  magazinVisible: boolean;
};

const Magazin: FC<Props> = ({ navigation }) => {
  const store = useContext(UserContext);
  const [loader, setLoader] = useState<boolean>(false);
  const [modal, setModal] = useState<ModalState>({
    content: {},
    menuVisible: false,
    searchVisible: false,
    magazinVisible: false,
  });

  // 임시 refresh 구현
  const temporaryLoader = () => {
    setLoader(true);
    setTimeout(() => setLoader(false), 700);
  };

  const showMagazinModal = (item: object) => {
    setModal({ ...modal, content: item, magazinVisible: true });
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
        username={store.username}
        visible={modal.menuVisible}
        closeModal={() => setModal({ ...modal, menuVisible: false })}
      />

      {/* search modal */}
      <Search
        visible={modal.searchVisible}
        closeModal={() => setModal({ ...modal, searchVisible: false })}
      />

      {/* magazin modal */}
      <MagazinModal
        content={modal.content}
        visible={modal.magazinVisible}
        closeModal={() => setModal({ ...modal, magazinVisible: false })}
      />
      {loader ? (
        <Loader /> 
      ) : (
        <FlatList
          data={magazinArr}
          contentContainerStyle={{ paddingBottom: 40 }}
          refreshControl={
            <RefreshControl
              refreshing={loader}
              onRefresh={() => temporaryLoader()}
            />
          }
          ListHeaderComponent={
            <Title>
              요즘 <PointTitle>여행</PointTitle>은?{"\n"}
              여행덕력 올라가는 <PointTitle>시간</PointTitle>.
            </Title>
          }
          renderItem={({ item, index }) => (
            <FlatView onPress={() => showMagazinModal(item)}>
              <Label>{item.label}</Label>
              <NewsInsideView>
                <NewsInsideLeftView>
                  <NewsTitle>{item.title}</NewsTitle>
                  <NewsContent numberOfLines={3}>{item.content}</NewsContent>
                </NewsInsideLeftView>
                <NewsImg source={item.img} />
              </NewsInsideView>
              <NewsTagView>
                {magazinArr[index].tags.map((tagsitem, tagsIndex) => (
                  <NewsTagBox key={tagsIndex}>
                    <NewsTags>{tagsitem}</NewsTags>
                  </NewsTagBox>
                ))}
              </NewsTagView>
            </FlatView>
          )}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
        />
      )}
    </Container>
  )
};

export default observer(Magazin);