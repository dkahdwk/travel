import React, { FC } from 'react';
import Modal from 'react-native-modal';
import NavTop from '@components/NavTop';
import {
  ModalView,
} from './styles';

interface Props {
  visible: boolean;
  closeModal: any;
};

const ProfileInformation: FC<Props> = ({ visible, closeModal }) => {
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
        <NavTop navigation={undefined} closeModal={closeModal} title={"계정 정보"} />
      </ModalView>
    </Modal>
  );
};

export default ProfileInformation;