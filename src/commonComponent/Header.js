import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import {backIcon} from '../../assets/icons';

const Header = ({
  title = 'ToDo List',
  showBackIcon = true,
  onBackPress = () => {},
}) => {
  return (
    <View style={styles.container}>
      {showBackIcon ? (
        <Pressable onPress={onBackPress}>
          <Image source={backIcon} style={styles.backIcon} />
        </Pressable>
      ) : null}
      <Text
        style={[styles.title, !showBackIcon ? {alignSelf: 'center'} : null]}>
        {title}
      </Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ED2D2F',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: 'white',
    marginLeft: 20,
  },
  backIcon: {
    height: 30,
    width: 30,
    marginLeft: 20,
  },
});
