import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useContext} from 'react';
import {LogInContext} from '../context/logInContext';
import Header from '../commonComponent/Header';
import {backIcon, floatingIcon} from '../../assets/icons';
import {useSelector} from 'react-redux';
import ToDoItem from '../commonComponent/ToDoItem';

const ToDoScreen = props => {
  const {navigation} = props;

  const todoList = useSelector(state => state.todos);
  console.log('==<>>>', todoList);

  const renderToDoItem = ({item, index}) => {
    console.log('item ==>>', item);
    const {title = '', subTitle = '', isCompleted, id} = item;
    return (
      <ToDoItem
        id={id}
        key={id}
        isDone={isCompleted}
        title={title}
        subTitle={subTitle}
      />
    );
  };

  const navigateToCreateScreen = () => {
    navigation.navigate('ToDoCreate');
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
      <Pressable onPress={navigateToCreateScreen} style={styles.floatingIcon}>
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
});
