import React, { FC, useState, useContext } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-banner-carousel-updated';
import Menu from '@screens/Menu/Menu';
import Search from '@components/Search';
import PostModal from '@components/PostModal';
import MagazinModal from '@components/MagazinModal';
import constants from "@root/constants";
import { magazinArr } from '@screens/Magazin/dataArr';
import { tagList, bannerData, travelReview } from './dataArr';
import { StatusBarComponent } from '@components/StatusBarComponent';
import { UserContext } from '@store/StateStore';
import { observer } from 'mobx-react-lite';
import {
  Container,
  TitleView,
  TopView,
  Title,
  Username,
  TagView,
  Tag,
  BannerConainer,
  BannerButton,
  Banner,
  TrandButton,
  TrandLeftView,
  MenuTitle,
  Subtitle,
  RightArrow,
  TrandGallery,
  GalleryButton,
  GalleryBackground,
  GalleryImg,
  GalleryTitle,
  MenuTitleView,
  TravelReviewView,
  TravelReviewBackground,
  TravelReviewImg,
  TravelReviewText,
  MoreTravelButton,
  MoreTravelText,
  Footer,
  FooterTitle,
  FooterSubtitle
} from './styles';

interface Props {
  navigation: any;
};

interface StateTypes {
  content: any;
  menuVisible: boolean;
  searchVisible: boolean;
  magazinVisible: boolean;
  postVisible: boolean;
};

const Home: FC<Props> = ({ navigation }) => {
  const store = useContext<any>(UserContext);
  const [modal, setModal] = useState<StateTypes>({
    content: {},
    menuVisible: false,
    searchVisible: false,
    magazinVisible: false,
    postVisible: false,
  });

  const showPostModal = (item: object) => {
    setModal({ ...modal, content: item, postVisible: true });
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
        username={store.username}
        visible={modal.menuVisible}
        closeModal={() => setModal({ ...modal, menuVisible: false })}
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

      {/* magazin modal */}
      <MagazinModal
        content={modal.content}
        visible={modal.magazinVisible}
        closeModal={() => setModal({ ...modal, magazinVisible: false })}
      />
      <ScrollView>
        <TitleView>
          <Title>
            <Username>{store.username}</Username>???, ???????????????.{"\n"}???????????????.
          </Title>
        </TitleView>
        <TagView>
          {tagList.map((item, index) => (
            <Tag key={index}>{'#' + item}</Tag>
          ))}
        </TagView>
        <BannerConainer>
          <Carousel
            loop={false}
            autoplay={true}
            autoplayTimeout={5000}
            index={0}
            pageSize={constants.width}
            pageIndicatorContainerStyle={{ marginBottom: -35 }}
            pageIndicatorStyle={{ backgroundColor: '#ccc' }}
            activePageIndicatorStyle={{ backgroundColor: '#2ed6df'}}
          >
            {bannerData.map((item, index) => (
              <BannerButton
                key={index}
                activeOpacity={1}
                onPress={() => showPostModal(item)}
              >
                <Banner source={item.img} />
              </BannerButton>
            ))}
          </Carousel>
        </BannerConainer>
        <TrandButton onPress={() => navigation.navigate('?????????')}>
          <TrandLeftView>
            <MenuTitle>{"????????? & ??????"}</MenuTitle>
            <Subtitle>?????? ?????? ????????? ???????????? ?????????</Subtitle>
          </TrandLeftView>
          <RightArrow source={require('@assets/arrow-right.png')} />
        </TrandButton>
        <TrandGallery>
          {magazinArr.map((item: { img: any, title: string }, index: number) => (
            index < 4 &&
              <GalleryButton
                key={index}
                onPress={() => showMagazinModal(item)}
              >
                <GalleryBackground />
                <GalleryImg source={item.img} />
                <GalleryTitle numberOfLines={3}>{item.title}</GalleryTitle>
              </GalleryButton>
          ))}
        </TrandGallery>
        <MenuTitleView>
          <MenuTitle>?????????</MenuTitle>
          <Subtitle>??????????????? ??? ??????! ?????? ????????? ???????</Subtitle>
        </MenuTitleView>
        {travelReview.map((item, index) => (
          <TravelReviewView
            key={index}
            onPress={() => showPostModal(item)}
          >
            <TravelReviewBackground />
            <TravelReviewImg source={item.img} />
            <TravelReviewText>{item.title}</TravelReviewText>
          </TravelReviewView>
        ))}
        <MoreTravelButton onPress={() => navigation.navigate('?????????')}>
          <MoreTravelText>????????? ????????? ?????? ??????</MoreTravelText>
        </MoreTravelButton>
        <Footer>
          <FooterTitle>??MONGJA STUIDO. ALL RIGHT RESERVED.</FooterTitle>
          <FooterSubtitle>
            ????????? ???????????? 520-23-1234 | ?????? ?????????{"\n"}
            ??????????????????????????? 2021-??????????????????-195??? | ???????????????????????????{"\n"}
            ???2021-6??? | ????????? ???????????? ????????? ???????????? 1234{"\n"}
          </FooterSubtitle>
        </Footer>
      </ScrollView>
    </Container>
  )    
}

export default observer(Home);