import React, { useState } from 'react';
import { FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import NavTop from '@components/NavTop';
import {
  ModalView,
  List,
  ListLeft,
  Date,
  Title,
  ContentView,
  Content,
} from './styles';

const Notice = ({ visible, closeModal }) => {
  const [toggleIndex, setToggleIndex] = useState(-1);

  const noticeData = [
    { date: "2021-07-01",
      title: `'한옥에서의 완벽한 하룻밤!' 숙박권 이벤트!`,
      content: "안녕하세요, 믿고 보는 여행 큐레이션 서비스입니다.\n항상 어플을 이용해주셔서 감사합니다."
    },
    { date: "2021-06-22",
      title: "여행 서포터즈 지원자 이벤트!",
      content: "안녕하세요, 믿고 보는 여행 큐레이션 서비스입니다.\n항상 어플을 이용해주셔서 감사합니다."
    },
    { date: "2021-06-21",
      title: "<서포터즈 1기> 합격자 발표",
      content: "안녕하세요, 믿고 보는 여행 큐레이션 서비스입니다.\n항상 어플을 이용해주셔서 감사합니다."
    },
    { date: "2021-06-14",
      title: "<서포터즈 1기> 합격자 발표 일정 변경 공지",
      content: "안녕하세요, 믿고 보는 여행 큐레이션 서비스입니다.\n항상 어플을 이용해주셔서 감사합니다."
    },
    { date: "2021-05-31",
      title: "서포터즈 1기를 모집합니다(~6/14)",
      content: "안녕하세요, 믿고 보는 여행 큐레이션 서비스입니다.\n항상 어플을 이용해주셔서 감사합니다."
    },
    { date: "2021-05-13",
      title: "주요 기능을 소개합니다!",
      content: "안녕하세요, 믿고 보는 여행 큐레이션 서비스입니다.\n항상 어플을 이용해주셔서 감사합니다."
    },
    { date: "2021-05-12",
      title: "앱이 출시되었어요!",
      content: "안녕하세요, 믿고 보는 여행 큐레이션 서비스입니다.\n항상 어플을 이용해주셔서 감사합니다."
    },
  ];

  const toggleList = (index) => {
    if (toggleIndex === index) {
      setToggleIndex(-1);
    } else {
      setToggleIndex(index);
    };
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
      <ModalView>
        <NavTop closeModal={closeModal} title={"공지사항"} />
        <FlatList
          data={noticeData}
          renderItem={({ item, index }) => (
            <>
              <List onPress={() => toggleList(index)}>
                <ListLeft>
                  <Date>{item.date}</Date>
                  <Title>{item.title}</Title>
                </ListLeft>
                {toggleIndex === index
                  ? <Icon name="keyboard-arrow-up" size={27} color={"#ccc"} />
                  : <Icon name="keyboard-arrow-down" size={27} color={"#ccc"} />
                }
              </List>
              {toggleIndex === index &&
                <ContentView>
                  <Content>{item.content}</Content>
                </ContentView>
              }
            </>
          )}
          numColumns={1}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.5}
        />
      </ModalView>
    </Modal>
  );
};

export default Notice;