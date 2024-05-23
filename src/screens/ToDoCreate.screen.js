import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Header from '../commonComponent/Header';
import {floatingIcon} from '../../assets/icons';
import {useDispatch} from 'react-redux';
import {addTodo} from '../store/actions/todo.action';

const ToDoCreate = props => {
  const [data, setData] = useState({
    title: '',
    subTitle: '',
  });
  const {navigation} = props;
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
    dipatch(addTodo(data));
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
        />
        <Text style={styles.textStyle}>What is task Description</Text>
        <TextInput
          onChangeText={text => handleChangeInput(text, 'subTitle')}
          value={data.subTitle}
          placeholder="Enter Task Description"
        />
        <Pressable
          onPress={taskAdded}
          disabled={data.title === '' && data.subTitle === '' ? true : false}
          style={styles.floatingIcon}>
          <Image source={floatingIcon} style={styles.iconStyle} />
        </Pressable>
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
});
