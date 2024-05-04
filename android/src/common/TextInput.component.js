import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import React from 'react';

const NewTextInput = ({
  value = '',
  placeholder = '',
  isRequired = true,
  label = '',
  pressableTextInput = false,
  isError = false,
  onChangeText = () => {},
  containerStyle = {},
  onTextInputPress = () => {},
  inputStyle = {},
  hideTitle = false,
  bottomPlaceholder = '',
  leftLable = '',
  ...props
}) => {
  const topTitle = label + (isRequired ? '*' : '');
  const colorForInputText = value ? {color: '#090A0A'} : {color: '#72777A'};

  return (
    <React.Fragment>
      <Pressable
        disabled={!pressableTextInput}
        onPress={onTextInputPress}
        style={[styles.container, containerStyle]}>
        {hideTitle ? null : (
          <Text style={[styles.title, isError ? styles.errStyleText : null]}>
            {topTitle}
          </Text>
        )}

        <View style={[styles.inputContainer, isError ? styles.errStyle : null]}>
          <View style={styles.leftCon}>
            {pressableTextInput ? (
              <Text style={[styles.inputStylePressableCon, colorForInputText]}>
                {value ? value : placeholder}
              </Text>
            ) : (
              <View style={styles.inputLeftCon}>
                <View style={styles.inputSubCon}>
                  {!leftLable ? null : (
                    <Text style={styles.leftLable}>{leftLable}</Text>
                  )}
                  <TextInput
                    style={[styles.inputStyle, inputStyle]}
                    placeholderTextColor={'#72777A'}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    {...props}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </Pressable>
      {!bottomPlaceholder ? null : (
        <Text
          style={[styles.bottomPlaceholder, isError ? {color: 'red'} : null]}>
          {bottomPlaceholder}
        </Text>
      )}
    </React.Fragment>
  );
};

export default NewTextInput;

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
  },
  title: {
    marginBottom: 12,
    fontWeight: '900',
    lineHeight: 16.8,
    color: '#72777A',
    fontSize: 14,
  },
  inputStyle: {
    padding: 16,
    fontWeight: '400',
    fontSize: 16,
    color: '#090A0A',
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#CDCFD0',
    backgroundColor: 'white',
  },
  leftCon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputStylePressableCon: {
    padding: 16,
    fontWeight: '400',
    fontSize: 16,
    color: '#090A0A',
  },
  errStyle: {
    borderColor: 'red',
  },
  errStyleText: {
    color: 'red',
  },
  inputLeftCon: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputSubCon: {flexDirection: 'row', alignItems: 'center'},
  changeBtnCon: {
    position: 'absolute',
    top: 15,
    right: 0,
  },
  bottomPlaceholder: {
    marginTop: 6,
    color: '#72777A',
    marginLeft: 2,
    fontSize: 12,
    fontWeight: '400',
  },
  leftLable: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: 14,
    color: '#72777A',
  },
});
