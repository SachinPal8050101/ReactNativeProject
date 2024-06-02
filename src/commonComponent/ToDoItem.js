import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import CheckBox from 'react-native-check-box';
import {useDispatch} from 'react-redux';
import {deleteTask, taskCompeted} from '../store/actions/todo.action';
import {deleteIcon} from '../../assets/icons';

const ToDoItem = ({
  id,
  isDone = true,
  title = '',
  subTitle = '',
  onPress = () => {},
  filePath = '',
}) => {
  const dipatch = useDispatch();
  const [loading, setLoading] = useState(true);

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
    <Pressable onPress={() => onPress(id)} style={styles.container}>
      <CheckBox onClick={onCheckBoxClick} isChecked={isDone} />
      <View style={styles.subCon}>
        <View style={{marginRight: 10, flex: 1}}>
          <Text style={[styles.title, isDone ? styles.checkedStyle : null]}>
            {title}
          </Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
        {loading && (
          <ActivityIndicator style={styles.loader} size="small" color="red" />
        )}
        <Image
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          style={styles.img}
          source={{uri: filePath}}
        />
        <Pressable onPress={deleteTodo}>
          <Image style={styles.deleteIconStyle} source={deleteIcon} />
        </Pressable>
      </View>
    </Pressable>
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
  img: {
    height: 35,
    width: 35,
    marginRight: 10,
    borderRadius: 8,
  },
  loader: {
    position: 'absolute',
    right: 40,
  },
});
