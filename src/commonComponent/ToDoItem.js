import {View, Text, StyleSheet, Pressable, Image, Alert} from 'react-native';
import React from 'react';
import CheckBox from 'react-native-check-box';
import {useDispatch} from 'react-redux';
import {deleteTask, taskCompeted} from '../store/actions/todo.action';
import {deleteIcon} from '../../assets/icons';
// dipatch(taskCompeted({isCompleted: !isDone, index: id}))

const ToDoItem = ({id, isDone = true, title = '', subTitle = ''}) => {
  const dipatch = useDispatch();

  const onCheckBoxClick = () => {
    dipatch(taskCompeted(id));
  };

  const deleteTodo = () => {
    Alert.alert('Are you sure ?', 'want to delete this task.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => dipatch(deleteTask(id))},
    ]);
  };

  return (
    <View style={styles.container}>
      <CheckBox onClick={onCheckBoxClick} isChecked={isDone} />
      <View style={styles.subCon}>
        <View>
          <Text style={[styles.title, isDone ? styles.checkedStyle : null]}>
            {title}
          </Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
        <Pressable onPress={deleteTodo}>
          <Image style={styles.deleteIconStyle} source={deleteIcon} />
        </Pressable>
      </View>
    </View>
  );
};

export default ToDoItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    margin: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
    borderColor: '#CDCFD0',
  },
  subCon: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#404446',
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#404446',
  },
  checkedStyle: {
    textDecorationLine: 'line-through',
  },
  deleteIconStyle: {
    height: 25,
    width: 25,
  },
});
