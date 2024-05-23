import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {LogInContext} from '../context/logInContext';

const LogInScreen = () => {
  const logInContext = useContext(LogInContext);
  console.log('==>>', logInContext);
  return (
    <View>
      <Text style={{color: 'black'}}>LogInScreen.screen</Text>
      <Pressable
        onPress={() => {
          logInContext.userLoggedIn();
        }}>
        <Text style={{color: 'black'}}>LogIN</Text>
      </Pressable>
    </View>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({});
