import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {data} from '../dummyData/dummayResponse';
import QuestionWithOptions from './QuestionWithOptions';

const MainCom = () => {
  const [startQuize, setStartQuize] = useState(false);
  const [questionData, setQuestionData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [rightAnsCount, setRightAnsCount] = useState(0);
  const [isAllQuestionDone, setIsAllQuestionDone] = useState(false);

  useEffect(() => {
    const apiResonse = data;
    setQuestionData(apiResonse.question);
  }, []);

  const checkAnsIsRight = useCallback(
    (selectedIndex, id) => {
      const question = questionData[id];
      const rightAns = question.answer;
      const selectedAns = question.options[selectedIndex];
      if (rightAns === selectedAns) {
        console.log(rightAns, selectedAns);
        setRightAnsCount(prev => prev + 1);
      }
    },
    [questionData],
  );

  const onAnsSelect = useCallback(
    (index, id) => {
      if (id < questionData.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setIsAllQuestionDone(true);
      }
      checkAnsIsRight(index, id);
    },
    [checkAnsIsRight, questionData.length],
  );

  return (
    <View style={styles.container}>
      {!startQuize ? (
        <Pressable
          style={styles.startBtn}
          onPress={() => {
            setStartQuize(true);
          }}>
          <Text style={styles.btnText}>Start Quize</Text>
        </Pressable>
      ) : (
        <View>
          {!isAllQuestionDone ? (
            <QuestionWithOptions
              key={currentQuestion}
              id={currentQuestion}
              qestionData={questionData[currentQuestion]}
              onAnsSelect={onAnsSelect}
            />
          ) : (
            <Text style={styles.textResult}>
              {'Result: ' + rightAnsCount + '/' + questionData.length}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

export default MainCom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  startBtn: {
    // color: 'red',
    borderWidth: 1,
    alignSelf: 'center',
    padding: 7,
  },
  btnText: {
    color: 'orange',
    fontSize: 30,
  },
  textResult: {
    alignSelf: 'center',
    fontSize: 30,
  },
});
