import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';

import {useAuth0} from 'react-native-auth0';

import AppNavigation from './navigations/AppNavigation';
import {LogInContext} from './context/logInContext';
import {clearStoreData, getStoreData, setStoreData} from './session/Storage';

const MainApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rehydrate, setRehydrate] = useState(false);

  const {authorize, getCredentials, clearSession} = useAuth0();
  useEffect(() => {
    (async () => {
      try {
        const accessToken = await getStoreData('AccessToken');
        if (accessToken) {
          setIsLoggedIn(true);
        }
        setRehydrate(true);
      } catch (e) {
        console.log('Something went wrong');
      }
    })();
  }, []);
  const userLoggedIn = useCallback(async () => {
    try {
      await authorize({}, {});
      const credentials = await getCredentials();
      await setStoreData('AccessToken', credentials?.accessToken);
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  }, [authorize, getCredentials]);

  const userLogOut = useCallback(async () => {
    await clearStoreData('AccessToken');
    await clearSession({}, {});
    setIsLoggedIn(false);
  }, [clearSession]);

  // Untill we have not get the data from async store we will show loader
  if (!rehydrate) {
    return (
      <ActivityIndicator style={styles.loder} size={'large'} color={'red'} />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LogInContext.Provider value={{isLoggedIn, userLoggedIn, userLogOut}}>
        <AppNavigation isLoggedIn={isLoggedIn} />
      </LogInContext.Provider>
    </SafeAreaView>
  );
};

export default MainApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
