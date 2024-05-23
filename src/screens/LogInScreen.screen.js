import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {LogInContext} from '../context/logInContext';

const LogInScreen = () => {
  const logInContext = useContext(LogInContext);
  console.log('==>>', logInContext);
  return (
    <View style={styles.container}>
      <Text style={styles.noteText}>Login to Access the Application</Text>
      <Pressable
        style={styles.btnCon}
        onPress={() => {
          logInContext.userLoggedIn();
        }}>
        <Text style={styles.btnText}>LOGIN</Text>
      </Pressable>
    </View>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F5',
    justifyContent: 'center',
  },
  btnCon: {
    backgroundColor: '#ED2D2F',
    marginHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 48,
  },
  btnText: {
    color: '#FFFFFF',
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 17,
  },
  noteText: {
    alignSelf: 'center',
    marginBottom: 20,
    color: 'Black',
    fontWeight: '900',
    fontSize: 17,
  },
});
