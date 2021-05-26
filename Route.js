import React, {useContext} from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';

import {CoreContext} from './core/CoreManagement';

const Stack = createStackNavigator();

import View1 from './View1';
import View2 from './View2';

export default function Route(props) {
  const result = useContext(CoreContext);

  console.log(result.tag + ' Route ');
  console.log(result.tag + ' Route result : ' + JSON.stringify(result));

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'} initialRouteName="View1">
        <Stack.Screen name="View1" component={View1} />
        <Stack.Screen name="View2" component={View2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
