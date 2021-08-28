import React from 'react';
import Modal from 'react-native-modal';
import NavTop from '@components/NavTop';
import {
  ModalView,
} from './styles';

const ProfileInformation = ({ visible, closeModal }) => {
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
        <NavTop closeModal={closeModal} title={"계정 정보"} />
      </ModalView>
    </Modal>
  );
};

export default ProfileInformation;