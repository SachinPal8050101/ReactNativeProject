import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../commonComponent/Header';
import {floatingIcon, rightIcon} from '../../assets/icons';
import {useDispatch, useSelector} from 'react-redux';
import {addTodo, updateToDo} from '../store/actions/todo.action';

const ToDoCreate = props => {
  const [data, setData] = useState({
    title: '',
    subTitle: '',
  });
  const {navigation, route} = props;
  const {isUpdate = false, id = ''} = route.params;
  const tasks = useSelector(state => state.todos);

  useEffect(() => {
    if (isUpdate) {
      const {title, subTitle} = tasks.find(item => item.id === id);
      setData({title, subTitle});
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

  const taskAdded = () => {
    if (!isUpdate) {
      dipatch(addTodo(data));
    } else {
      dipatch(updateToDo({...data, id: id}));
    }
    navigation.goBack();
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
});
