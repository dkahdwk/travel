import React, { FC, useState, useContext, useRef } from 'react';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  PermissionsAndroid,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Menu from '@screens/Menu/Menu';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { StatusBarComponent } from '@components/StatusBarComponent';
import { ENUM_BORDER_COLOR } from '@util/enum';
import { UserContext } from '@store/StateStore';
import { observer } from 'mobx-react-lite';
import {
  Container,
  TopView,
  SelectPhotoButton,
  PhotoContainer,
  DeleteButton,
  Photo,
  InputContainer,
  InputTitle,
  InputBorder,
  ContentBorder,
  Input,
  IconButton,
  DeleteImage,
  UploadButton,
  UploadText,
} from './styles';

interface Props {
  navigation: any;
};

interface PostProps {
  title: string;
  content: string;
};

const Post: FC<Props> = ({ navigation }) => {
  const store = useContext(UserContext);
  const titleRef = useRef<any>();
  const contentRef = useRef<any>();
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [filePath, setFilePath] = useState<any>({});
  const [post, setPost] = useState<PostProps>({
    title: '',
    content: '',
  });
  const [borderColor, setBorderColor] = useState({
    title: ENUM_BORDER_COLOR.INACTIVE,
    content: ENUM_BORDER_COLOR.INACTIVE,
  });

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
            buttonPositive: 'yes',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
            buttonPositive: 'yes',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        Alert.alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type: any) => {
    let options: any = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response: any) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          Alert.alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          Alert.alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          Alert.alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          Alert.alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };

  const chooseFile = async (type: any) => {
    let options: any = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };
    let isStoragePermitted = await requestExternalWritePermission();
    if (isStoragePermitted) {
      launchImageLibrary(options, (response: any) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          console.log('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          console.log('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          console.log(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };

  React.useEffect(() => {
    if (Object.keys(filePath).length !== 0) {
      console.log(filePath.assets[0].uri);
    }
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
        <StatusBarComponent />
          <TopView>
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <Icon name="menu" size={28} color={'gray'} />
            </TouchableOpacity>
          </TopView>
        <Container>
          {/* menu modal */}
          <Menu
            navigation={navigation}
            visible={menuVisible}
            closeModal={() => setMenuVisible(false)}
            username={store.username}
          />
          {Object.keys(filePath).length === 0
            ? <SelectPhotoButton onPress={() => chooseFile('photo')}>
                <Icon name="control-point" size={50} color={"#ccc"} />
              </SelectPhotoButton>
            : <PhotoContainer>
                <DeleteButton onPress={() => setFilePath({})}>
                  <Icon name="close" color={"#fff"} size={20} />
                </DeleteButton>
                <Photo source={{ uri: filePath.assets[0].uri }} />
              </PhotoContainer>
          }
          <InputContainer>
            <InputTitle>제목</InputTitle>
            <InputBorder style={{ borderColor: borderColor.title }}>
              <Input
                value={post.title}
                onChangeText={(value) => setPost({ ...post, title: value })}
                placeholder={'제목을 입력해주세요'}
                placeholderTextColor="#c4c4c4"
                autoCorrect={false}
                maxLength={30}
                returnKeyType="next"
                ref={titleRef}
                onSubmitEditing={() => contentRef.current.focus()}
                onFocus={() => {
                  setBorderColor({ ...borderColor, title: ENUM_BORDER_COLOR.ACTIVE });
                }}
                onBlur={() => {
                  setBorderColor({ ...borderColor, title: ENUM_BORDER_COLOR.INACTIVE });
                }}
              />
              {post.title !== "" &&
                <IconButton onPress={() => setPost({ ...post, title: '' })}>
                  <DeleteImage source={require('@assets/login-delete.png')} />
                </IconButton>
              }
            </InputBorder>
            <InputTitle>내용</InputTitle>
            <ContentBorder style={{ borderColor: borderColor.content }}>
              <Input
                value={post.content}
                onChangeText={(value) => setPost({ ...post, content: value })}
                placeholder={'내용을 입력해주세요'}
                placeholderTextColor="#c4c4c4"
                autoCorrect={false}
                returnKeyType="next"
                ref={contentRef}
                multiline={true}
                onFocus={() => {
                  setBorderColor({ ...borderColor, content: ENUM_BORDER_COLOR.ACTIVE });
                }}
                onBlur={() => {
                  setBorderColor({ ...borderColor, content: ENUM_BORDER_COLOR.INACTIVE });
                }}
              />
            </ContentBorder>
          </InputContainer>
          <UploadButton onPress={() => Alert.alert('', '준비중입니다.')}>
            <UploadText>업로드</UploadText>
          </UploadButton>
        </Container>
      </>
    </TouchableWithoutFeedback>
  )
};

export default observer(Post);