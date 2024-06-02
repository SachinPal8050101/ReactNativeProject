import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import Header from '../commonComponent/Header';
import {floatingIcon} from '../../assets/icons';
import {useSelector} from 'react-redux';
import ToDoItem from '../commonComponent/ToDoItem';
import {LogInContext} from '../context/logInContext';

const ToDoScreen = props => {
  const {navigation} = props;
  const logInContext = useContext(LogInContext);
  const todoList = useSelector(state => state.todos);

  const renderToDoItem = ({item, index}) => {
    const {title = '', subTitle = '', isCompleted, id, filePath} = item;
    return (
      <ToDoItem
        id={id}
        key={id}
        isDone={isCompleted}
        title={title}
        subTitle={subTitle}
        onPress={taskId => navigateToCreateScreen(true, taskId)}
        filePath={filePath}
      />
    );
  };

  const navigateToCreateScreen = (isUpdate, id = '') => {
    const params = {isUpdate: isUpdate ? true : false, id: id};
    navigation.navigate('ToDoCreate', params);
  };

  return (
    <View style={styles.container}>
      <Header title="To Do List" showBackIcon={false} />
      {todoList.length === 0 ? (
        <Text style={styles.emptyTextStyle}>Add First Task</Text>
      ) : (
        <FlatList
          data={todoList}
          keyExtractor={item => item.id.toString()}
          renderItem={renderToDoItem}
        />
      )}
      <Pressable style={{marginBottom: 50}} onPress={logInContext.userLogOut}>
        <Text style={styles.logOUtStyle}>Log Out</Text>
      </Pressable>
      <Pressable
        onPress={() => navigateToCreateScreen(false, '')}
        style={styles.floatingIcon}>
        <Image source={floatingIcon} style={styles.iconStyle} />
      </Pressable>
    </View>
  );
};

export default ToDoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  floatingIcon: {
    position: 'absolute',
    backgroundColor: 'FFFFFF',
    bottom: 50,
    right: 20,
  },
  iconStyle: {
    height: 50,
    width: 50,
    // borderRadius: 50,
    backgroundColor: 'FFFFFF',
    color: 'white',
  },
  emptyTextStyle: {
    alignSelf: 'center',
    marginTop: 40,
    fontSize: 20,
    fontWeight: '900',
    color: '#404446',
  },
  logOUtStyle: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 20,
    fontWeight: '900',
    color: '#404446',
  },
});
