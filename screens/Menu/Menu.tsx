import React, { FC, useState, useContext } from 'react';
import { View, Image } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Notice from '@screens/Menu/Notice/Notice';
import CustomerSupport from '@screens/Menu/CustomerSupport/CustomerSupport';
import Event from '@screens/Menu/Event/Event';
import Settings from '@screens/Menu/Settings/Settings';
import { UserContext } from '@store/StateStore';
import { observer } from 'mobx-react-lite';
import {
  ModalView,
  MenuTop,
  TopButton,
  UserView,
  UserImg,
  MenuUsername,
  MenuUsernameTag,
  MenuList,
  MenuListText,
  MenuLeft,
} from './styles';

interface Props {
  navigation: any;
  visible: boolean;
  closeModal: any;
  username: string;
};

interface ModalVisibelProps {
  notice: boolean;
  customerSupport: boolean;
  event: boolean;
  settings: boolean;
}

const Menu: FC<Props> = ({ navigation, visible, closeModal, username }) => {
  const store = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState<ModalVisibelProps>({
    notice: false,
    customerSupport: false,
    event: false,
    settings: false,
  });

  const menuList = [
    { icon: 'error-outline', title: '공지사항', destination: 'notice' },
    { icon: 'headset-mic', title: '고객지원', destination: 'customerSupport' },
    { icon: 'event-available', title: '이벤트', destination: 'event' },
  ];

  const goMenuList = (destination: string) => {
    if (destination === 'notice') {
      setModalVisible({ ...modalVisible, notice: true });
    } else if (destination === 'customerSupport') {
      setModalVisible({ ...modalVisible, customerSupport: true });
    } else if (destination === 'event') {
      setModalVisible({ ...modalVisible, event: true });
    } else if (destination === 'settings') {
      setModalVisible({ ...modalVisible, settings: true });
    }
  };

  const goProfile = () => {
    closeModal();
    navigation.navigate('프로필');
  };

  return (
    <Modal
      isVisible={visible}
      animationIn={'slideInRight'}
      animationOut={'slideOutRight'}
      backdropOpacity={0.4}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      style={{ margin: 0, alignItems: 'flex-end' }}
    >
      <ModalView>
        <Notice
          visible={modalVisible.notice}
          closeModal={() => setModalVisible({ ...modalVisible, notice: false })}
        />
        <CustomerSupport
          visible={modalVisible.customerSupport}
          closeModal={() => setModalVisible({ ...modalVisible, customerSupport: false })}
        />
        <Event
          visible={modalVisible.event}
          closeModal={() => setModalVisible({ ...modalVisible, event: false })}
        />
        <Settings
          visible={modalVisible.settings}
          closeModal={() => setModalVisible({ ...modalVisible, settings: false })}
        />
        <MenuTop>
          <TopButton onPress={() => goMenuList('settings')}>
            <Icon name="settings" color={"#5f5f5f"} size={25} />
          </TopButton>
          <TopButton onPress={closeModal}>
            <Icon name="close" color={"#5f5f5f"} size={27} />
          </TopButton>
        </MenuTop>
        <UserView onPress={goProfile}>
          {store.thumbnail === null
            ? <Icon name="account-circle" size={45} color={"gray"} />
            : <UserImg source={{ uri: store.thumbnail }} />
          }
          <View style={{ marginLeft: 15 }}>
            <MenuUsername>{username}</MenuUsername>
            <MenuUsernameTag>{'@' + username}</MenuUsernameTag>
          </View>
        </UserView>
        {menuList.map((item, index) => (
          <MenuList
            key={index}
            onPress={() => goMenuList(item.destination)}
          >
            <MenuLeft>
              <Icon name={item.icon} size={23} color={'black'} />
              <MenuListText>{item.title}</MenuListText>
            </MenuLeft>
            <Image
              style={{ width: 5, height: 9 }}
              source={require('@assets/arrow-right.png')}
            />
          </MenuList>
        ))}
      </ModalView>
    </Modal>
  )
};

export default observer(Menu);