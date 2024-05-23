import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {LogInContext} from '../context/logInContext';

const ToDoScreen = () => {
  const logInContext = useContext(LogInContext);
  return (
    <View>
      <Text>ToDoScreen.screen</Text>
      <Pressable onPress={logInContext.userLogOut}>
        <Text style={{color: 'black'}}>Log Out</Text>
      </Pressable>
    </View>
  );
};

export default ToDoScreen;

const styles = StyleSheet.create({});
