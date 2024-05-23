import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LogInScreen from '../screens/LogInScreen.screen';
import ToDoScreen from '../screens/ToDoScreen.screen';

const Stack = createNativeStackNavigator();

const AppNavigation = ({isLoggedIn = false}) => {
  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="LogInScreen"
            component={LogInScreen}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="ToDoScreen"
            component={ToDoScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigation;
