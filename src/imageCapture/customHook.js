import React from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {PERMISSIONS, check, request} from 'react-native-permissions';

export const usePermission = () => {
  const checkPermissions = async () => {
    if (Platform.OS === 'android') {
      let systemVersion = DeviceInfo.getSystemVersion();
      let requestPermissionCheckForGrant;
      let requestPermission;
      if (systemVersion >= 13) {
        requestPermissionCheckForGrant = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
        requestPermission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES;
      } else {
        requestPermissionCheckForGrant =
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
        requestPermission =
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      }
      const userExternalStoragePermission = await check(
        requestPermissionCheckForGrant,
      );
      console.log(
        'userExternalStoragePermission',
        userExternalStoragePermission,
      );
      if (userExternalStoragePermission === 'granted') {
        return true;
      } else {
        const reqRes = await PermissionsAndroid.request(requestPermission, {
          title: 'Storage Permission Needed',
          message: 'Your app needs permission.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });
        return reqRes === 'granted';
      }
    } else {
      const requestPermission = PERMISSIONS.IOS.PHOTO_LIBRARY;
      const userPhotoLibraryPermission = await check(requestPermission);
      if (userPhotoLibraryPermission === 'granted') {
        return true;
      } else {
        const reqRes = await request(requestPermission);
        return reqRes === 'granted';
      }
    }
  };

  return checkPermissions();
};
