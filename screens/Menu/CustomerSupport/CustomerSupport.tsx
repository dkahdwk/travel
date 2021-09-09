import React, { FC } from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import NavTop from '@components/NavTop';
import {
  ModalView,
  Box,
  BoxLeft,
  TextView,
  Title,
  Content,
} from './styles';

interface Props {
  visible: boolean;
  closeModal: any;
};

const CustomerSupport: FC<Props> = ({ visible, closeModal }) => {
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
        <NavTop navigation={undefined} closeModal={closeModal} title={"고객지원"} />
        <Box>
          <BoxLeft>
            <Icon name="headset-mic" size={30} color={"#333"} />
            <TextView>
              <Title>상담원 연결</Title>
              <Content>월,화,수,목,금 10:00 ~ 18:00</Content>
            </TextView>
          </BoxLeft>
          <Icon name="keyboard-arrow-right" size={27} color={"#333"} />
        </Box>
      </ModalView>
    </Modal>
  );
};

export default CustomerSupport;