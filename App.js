import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import MainCom from './src/common/MainCom';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MainCom />
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
