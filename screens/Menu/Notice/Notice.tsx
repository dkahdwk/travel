import React, { FC, useState } from 'react';
import { FlatList } from 'react-native';
import { noticeData } from './dataArr';
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

interface Props {
  visible: boolean;
  closeModal: any;
};

const Notice: FC<Props> = ({ visible, closeModal }) => {
  const [toggleIndex, setToggleIndex] = useState(-1);

  const toggleList = (index: number) => {
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
        <NavTop navigation={undefined} closeModal={closeModal} title={"공지사항"} />
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