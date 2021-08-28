import React, { useState } from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  RefreshControl
} from 'react-native';
import styled from 'styled-components';
import constants from "@root/constants";
import Modal from 'react-native-modal';
import Loader from '@components/Loader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MagazinModal from '@components/MagazinModal';
import PostModal from '@components/PostModal';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { magazinArr } from '@screens/Magazin/dataArr';
import { travelArr } from '@screens/Travel/dataArr';
import {
  Label,
  NewsInsideView,
  NewsInsideLeftView,
  NewsTitle,
  NewsContent,
  NewsImg,
  NewsTagView,
  NewsTagBox,
  NewsTags
} from '@screens/Magazin/styles';

const Search = ({ visible, closeModal}) => {
  const [loader, setLoader] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState('magazin');
  const [magazinCategory, setMagazinCategory] = useState('전체');
  const [data, setData] = useState(magazinArr);
  const [modal, setModal] = useState({
    content: '',
    magazinVisible: false,
    postVisible: false,
  });

  const magazinCategoryList = ["전체", "뉴스", "이슈", "정보", "기획"];

  // Temporary refresh
  const temporaryLoader = () => {
    setLoader(true);
    setTimeout(() => setLoader(false), 700);
  };

  // Search loader
  const searchLoader = () => {
    setLoader(true);
    setTimeout(() => setLoader(false), 500);
  };

  // Search value filter
  const searchFilter = (array, text) => {
    const newData = array.filter((item) => {
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setData(newData);
  };

  // Search event
  const handleSearch = () => {
    searchLoader();

    if (category === 'magazin') {
      searchFilter(magazinArr, searchValue);
    } else if (category === 'travel') {
      searchFilter(travelArr, searchValue);
    };
  };

  // Select category
  const handleCategory = (categoryName) => {
    setCategory(categoryName);

    if (categoryName === 'magazin') {
      setData(magazinArr);
    } else if (categoryName === 'travel') {
      setData(travelArr);
    }
  };

  // Select magazin subcategory
  const selectMagazinCategory = (item) => {
    searchLoader();
    setMagazinCategory(item);
  };

  // onPress event of list
  const handleListPress = (item) => {
    if (category === 'magazin') {
      setModal({ ...modal, content: item, magazinVisible: true })
    } else if (category === 'travel') {
      setModal({ ...modal, content: item, postVisible: true })
    }
  };

  // 매거진 하위 카테고리 선택시 해당 카테고리의 리스트만 출력 예외처리
  const handleCategoryException = (item) => {
    if (magazinCategory !== '전체') {
      if (magazinCategory === item.label) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  // Reset search value & search result
  const returnSearchResult = () => {
    setSearchValue('');
    searchLoader();

    if (category === 'magazin') {
      setData(magazinArr);
    } else if (category === 'travel') {
      setData(travelArr);
    };
  };

  const emptyComponent = () => {
    return (
      <EmptyView>
        <EmptyTitle>일치하는 결과가 없습니다😥</EmptyTitle>
        <EmptySubtitle>다른 검색어를 입력해주세요.</EmptySubtitle>
        <EmptyReturnButton onPress={returnSearchResult}>
          <EmptyReturnText>초기화면으로 돌아가기</EmptyReturnText>
        </EmptyReturnButton>
      </EmptyView>
    )
  };

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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ModalView>
          {/* 매거진 modal */}
          <MagazinModal
            content={modal.content}
            visible={modal.magazinVisible}
            closeModal={() => setModal({ ...modal, magazinVisible: false })}
          />
          {/* 포스트 modal */}
          <PostModal
            content={modal.content}
            visible={modal.postVisible}
            closeModal={() => setModal({ ...modal, postVisible: false })}
          />
          <MenuTop>
            <Button onPress={closeModal}>
              <Icon name="keyboard-backspace" size={27} color={"#5f5f5f"} />
            </Button>
            <TextInputView>
              <SearchBar
                value={searchValue}
                onChangeText={(value) => setSearchValue(value)}
                placeholder={'검색어 입력'}
                placeholderTextColor="#6f6f6f"
              />
            </TextInputView>
            <Button onPress={handleSearch}>
              <Icon name="search" size={27} color={"#5f5f5f"} />
            </Button>
          </MenuTop>
          <FlexRowView>
            <CategoryButton
              style={category === 'magazin'
                ? { borderColor: '#0ab0df' }
                : { borderColor: '#ccc' }
              }
              onPress={() => handleCategory('magazin')}
            >
              <Category>매거진</Category>
            </CategoryButton>
            <CategoryButton
              style={category === 'travel'
                ? { borderColor: '#0ab0df' }
                : { borderColor: '#ccc' }
              }
              onPress={() => handleCategory('travel')}
            >
              <Category>여행기</Category>
            </CategoryButton>
          </FlexRowView>
          {category === 'magazin' &&
            <FlexRowView style={{ paddingLeft: 20 }}>
              {magazinCategoryList.map((item, index) => (
                <MagazinCategoryBox
                  key={index}
                  style={magazinCategory === item && { backgroundColor: '#ddd' }}
                  onPress={() => selectMagazinCategory(item)}
                >
                  <MagazinCategory>{item}</MagazinCategory>
                </MagazinCategoryBox>
              ))}
            </FlexRowView>
          }
          {loader ? (
            <Loader /> 
          ) : (
            category === 'magazin' ? (
              <FlatList
                key={'_'}
                data={data}
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
                refreshControl={<RefreshControl onRefresh={() => temporaryLoader()} />}
                renderItem={({ item, index }) => (
                  handleCategoryException(item) && (
                    <MagazinList onPress={() => handleListPress(item)}>
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
                    </MagazinList>
                  )
                )}
                numColumns={1}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={emptyComponent}
              />
            ) : (
              <FlatList
                key={'#'}
                data={data}
                contentContainerStyle={{ paddingBottom: 40, flexGrow: 1 }}
                refreshControl={<RefreshControl onRefresh={() => temporaryLoader()} />}
                renderItem={({ item, index }) => (
                  <TravelList onPress={() => handleListPress(item)}>
                    <TravelImg source={item.img} />
                    <TravelTitle numberOfLines={2}>{item.title}</TravelTitle>
                    <TravelDate>{item.date}</TravelDate>
                    <FlexRowView>
                      <TravelUserImg source={item.img} />
                      <TravelUsername numberOfLines={1}>{item.username}</TravelUsername>
                    </FlexRowView>
                  </TravelList>
                )}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={emptyComponent}
              />
            )
          )}
        </ModalView>
      </TouchableWithoutFeedback>
    </Modal>
  )
};

const ModalView = styled.View`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const MenuTop = styled.View`
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: ${Platform.OS === 'ios' ? getStatusBarHeight() : 10}px 0 0 0;
`;

const Button = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
`;

const FlexRowView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const CategoryButton = styled.TouchableOpacity`
  width: 50%;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
`;

const Category = styled.Text`
  font-family: Roboto-Medium;
  font-size: 15px;
  color: #0ab0df;
`;

const TextInputView = styled.View`
  width: ${constants.width - 120}px;
  height: 40px;
  border-radius: 5px;
  background-color: #eee;
`;

const SearchBar = styled.TextInput`
  width: 90%;
  height: 100%;
  margin: 0 0 0 5%;
`;

const MagazinList = styled.TouchableOpacity`
  margin: 20px 0 0 0;
  padding: 0 20px 0 20px;
`;

const MagazinCategoryBox = styled.TouchableOpacity`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px 5px 10px;
  margin: 10px 5px 0 0;
`;

const MagazinCategory = styled.Text`
  font-family: Roboto-Thin;
  font-size: 15px;
  color: #4f4f4f;
`;

const TravelList = styled.TouchableOpacity`
  width: ${constants.width / 2 - 22.5}px;
  margin: 20px 0 5px 15px;
`;

const TravelImg = styled.Image`
  width: ${constants.width / 2 - 22.5}px;
  height: ${constants.width / 2 - 22.5}px;
  border-radius: 5px;
`;

const TravelTitle = styled.Text`
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #333;
  margin: 10px 0 10px 0;
`;

const TravelDate = styled.Text`
  font-family: Roboto-Thin;
  font-size: 14px;
  color: #6f6f6f;
  margin: 0 0 10px 0;
`;

const TravelUserImg = styled.Image`
  width: 20px;
  height: 20px;
  border-radius: 100px;
`;

const TravelUsername = styled.Text`
  font-family: Roboto-Thin;
  font-size: 14px;
  color: #333;
  margin: 0 0 0 5px;
`;

const EmptyView = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const EmptyTitle = styled.Text`
  font-family: Roboto-Regular;
  font-size: 18px;
  color: #333;
  margin: 0 0 2.5px 0;
`;

const EmptySubtitle = styled.Text`
  font-family: Roboto-Thin;
  font-size: 14px;
  color: #4f4f4f;
`;

const EmptyReturnButton = styled.TouchableOpacity`
  border: 1px solid #0ab0df;
  border-radius: 5px;
  margin: 20px 0 0 0;
  padding: 7.5px 15px 7.5px 15px;
`;

const EmptyReturnText = styled.Text`
  font-family: Roboto-Thin;
  font-size: 14px;
  color: #0ab0df;
`;

export default Search;