import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStoreData = async (key, data) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
};

export const getStoreData = async key => {
  return await AsyncStorage.getItem(key);
};

export const clearStoreData = async key => {
  await AsyncStorage.removeItem(key);
};
