import React from 'react';
import NavTop from '@components/NavTop';
import Modal from 'react-native-modal';
import { ModalView, Title } from './styles';

const Event = ({ visible, closeModal }) => {
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
        <NavTop closeModal={closeModal} title={"이벤트"} />
        <Title>이벤트를 준비중입니다.</Title>
      </ModalView>
    </Modal>
  );
};

export default Event;