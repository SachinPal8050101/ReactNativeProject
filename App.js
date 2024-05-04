import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import MainApp from './src';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MainApp />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
