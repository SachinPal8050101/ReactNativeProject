import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import {launchImageLibrary} from 'react-native-image-picker';

import Header from '../commonComponent/Header';
import {rightIcon} from '../../assets/icons';
import {useDispatch, useSelector} from 'react-redux';
import {addTodo, updateToDo} from '../store/actions/todo.action';
import {usePermission} from '../imageCapture/customHook';
import {uploadImageToServer} from '../api/Service';

const ToDoCreate = props => {
  const [data, setData] = useState({
    title: '',
    subTitle: '',
    filePath: '',
  });
  const {navigation, route} = props;
  const {isUpdate = false, id = ''} = route.params;
  const tasks = useSelector(state => state.todos);
  const [fileResponse, setfileResponse] = useState(null);
  const [loader, setLoader] = useState(false);
  const [isImgLoading, setIsImgLoading] = useState(false);
  const permissionStatus = usePermission();

  useEffect(() => {
    if (isUpdate) {
      const {title, subTitle, filePath} = tasks.find(item => item.id === id);
      setData({title, subTitle, filePath});
    }
  }, [id, isUpdate, tasks]);

  const dipatch = useDispatch();
  const onBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleChangeInput = (d, key) => {
    setData(prev => {
      return {...prev, [key]: d};
    });
  };

  const callbackSuccess = apiData => {
    console.log('dataaaa', data, apiData);
    dipatch(addTodo({...data, filePath: apiData.kraked_url}));
    setLoader(false);
    navigation.goBack();
  };

  const callbackFailure = err => {
    console.log('errooooodsdsd', err);
    Alert.alert('oppps Something whet wrong Image Could not save');
    dipatch(addTodo({...data, filePath: ''}));
    setLoader(false);
    navigation.goBack();
  };

  const taskAdded = () => {
    setLoader(true);
    if (!isUpdate) {
      if (fileResponse) {
        uploadImageToServer(fileResponse, callbackSuccess, callbackFailure);
      } else {
        callbackFailure();
      }
    } else {
      dipatch(updateToDo({...data, id: id}));
      setLoader(false);
      navigation.goBack();
    }
  };

  const captureImage = async () => {
    if (permissionStatus) {
      let options = {
        title: 'Select Image',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      launchImageLibrary(options, response => {
        console.log('Response = ', response);
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else {
          console.log('response', JSON.stringify(response));
          setfileResponse(response);
          setData(prev => {
            return {...prev, filePath: response.assets[0].uri};
          });
        }
      });
    } else {
      Alert.alert('Permission Required');
    }
  };

  return (
    <View style={styles.container}>
      <Header
        onBackPress={onBackPress}
        title="To Do List"
        showBackIcon={true}
      />
      <View style={styles.bodyStyle}>
        <Text style={styles.textStyle}>What is to be done ?</Text>
        <TextInput
          onChangeText={text => handleChangeInput(text, 'title')}
          value={data.title}
          placeholder="Enter Task Here"
          style={styles.textInputStyle}
          placeholderTextColor={'#404446'}
        />
        <Text style={styles.textStyle}>What is task Description</Text>
        <TextInput
          onChangeText={text => handleChangeInput(text, 'subTitle')}
          value={data.subTitle}
          style={styles.textInputStyle}
          placeholder="Enter Task Description"
          placeholderTextColor={'#404446'}
        />
        {!fileResponse && !isUpdate ? (
          <Pressable style={styles.captureCon} onPress={captureImage}>
            <Text style={styles.captureTextStyle}> Capture Image</Text>
          </Pressable>
        ) : null}
        {isImgLoading && (
          <ActivityIndicator style={styles.loader} size="small" color="red" />
        )}
        {fileResponse || isUpdate ? (
          <Image
            source={{
              uri: data.filePath,
            }}
            style={styles.images}
            onLoadStart={() => setIsImgLoading(true)}
            onLoadEnd={() => setIsImgLoading(false)}
          />
        ) : null}
        {!loader ? null : (
          <ActivityIndicator
            style={styles.loder}
            size={'large'}
            color={'red'}
          />
        )}
        {data.title && data.subTitle ? (
          <Pressable
            onPress={taskAdded}
            disabled={data.title === '' && data.subTitle === '' ? true : false}
            style={styles.floatingIcon}>
            <Image source={rightIcon} style={styles.iconStyle} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

export default ToDoCreate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: '900',
    color: '#404446',
  },
  captureTextStyle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#404446',
  },
  bodyStyle: {
    flex: 1,
    marginHorizontal: 20,
  },
  iconStyle: {
    height: 50,
    width: 50,
    // borderRadius: 50,
    backgroundColor: 'FFFFFF',
    color: 'white',
  },
  floatingIcon: {
    position: 'absolute',
    backgroundColor: 'FFFFFF',
    bottom: 50,
    right: 20,
  },
  textInputStyle: {
    color: '#72777A',
    fontSize: 16,
    fontWeight: '400',
  },
  images: {
    height: 70,
    width: 70,
    borderRadius: 20,
    marginTop: 30,
  },
  captureCon: {
    backgroundColor: 'gray',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loader: {
    position: 'absolute',
    left: 20,
    marginTop: 250,
  },
});
