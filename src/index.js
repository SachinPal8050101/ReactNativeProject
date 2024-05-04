import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NewTextInput from './common/TextInput.component';
import {validateMobileNumber} from './common/commonFunction';
import {getPhoneNumberInfo} from './api/Service';

const MainApp = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [mobileNumber, setMobileNumber] = useState(null);
  const [mobileNumberError, setMobileNumberError] = useState('');

  const submitForm = () => {
    setData(null);
    if (!validateMobileNumber(mobileNumber)) {
      setMobileNumberError('Required field');
    } else {
      // Call Api here
      setLoading(true);
      getPhoneNumberInfo(mobileNumber, callBackSuccess, callBackfailure);
    }
  };

  const callBackSuccess = (d, h) => {
    setData({...d, origin: h});
    setLoading(false);
  };
  const callBackfailure = d => {
    setData({...d, origin: ''});
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <NewTextInput
        containerStyle={styles.textInput}
        label="Enter Mobile Number"
        placeholder="Mobile Number"
        value={mobileNumber}
        bottomPlaceholder={
          mobileNumberError
            ? mobileNumberError.length === 0
              ? 'Required field.'
              : 'Please enter valid number'
            : null
        }
        keyboardType={'phone-pad'}
        isError={mobileNumberError}
        onChangeText={val => {
          if (!validateMobileNumber(val)) {
            setMobileNumberError('Please enter valid number');
          } else {
            setMobileNumberError('');
          }
          setMobileNumber(val);
        }}
      />
      <TouchableOpacity
        onPress={submitForm}
        disabled={loading || Boolean(mobileNumberError.length)}
        style={[
          styles.btn,
          loading || Boolean(mobileNumberError.length)
            ? {backgroundColor: 'gray'}
            : null,
        ]}>
        {loading ? (
          <ActivityIndicator color={'white'} />
        ) : (
          <Text style={styles.btnText}>Get Data</Text>
        )}
      </TouchableOpacity>
      {data ? (
        <View style={styles.resultCon}>
          <Text style={styles.welText}>{data.msg}</Text>
          <Text
            style={styles.resultText}>{`Phone Origin - ${data.origin}`}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default MainApp;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    // alignItems: 'center',
    marginHorizontal: 20,
  },
  textInput: {
    marginTop: 40,
  },
  con: {
    flex: 1,
  },
  btn: {
    backgroundColor: '#ED2D2F',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    borderRadius: 32,
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  resultCon: {
    alignItems: 'center',
    marginTop: 20,
  },
  welText: {
    color: '#090A0A',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 20,
  },
  resultText: {
    color: '#4BAE4F',
    fontSize: 15,
    fontWeight: '600',
  },
});
