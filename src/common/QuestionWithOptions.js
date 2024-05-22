import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';

const QuestionWithOptions = ({
  id,
  qestionData = {},
  onAnsSelect = () => {},
}) => {
  return (
    <View style={styles.con}>
      <Text style={styles.questionStyle}>
        {Number(id + 1) + '.  ' + qestionData.title}
      </Text>
      {qestionData.options.map((item, index) => {
        return (
          <Pressable
            style={styles.btnStyle}
            onPress={() => onAnsSelect(index, id)}>
            <View style={styles.contentCon}>
              <View style={styles.circle} />
              <Text style={{color: 'black'}}>{item}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default React.memo(QuestionWithOptions);

const styles = StyleSheet.create({
  con: {
    marginHorizontal: 10,
  },
  btnStyle: {
    borderWidth: 1,
    paddingVertical: 10,
    marginVertical: 10,
    justifyContent: 'center',
  },
  circle: {
    borderWidth: 1,
    height: 20,
    width: 20,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  contentCon: {
    flexDirection: 'row',
  },
  questionStyle: {
    color: 'black',
    fontSize: 15,
  },
});
