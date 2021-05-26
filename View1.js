/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  ActivityIndicator,
  Button,
} from 'react-native';

import {CoreContext, CoreConsumer} from './core/CoreManagement';

import {useNavigation} from '@react-navigation/native';

export default function View1(props) {
  const navigation = useNavigation();

  const {route} = props;

  const {params} = route;

  const result = useContext(CoreContext);

  console.log(result.tag + ' View1 ');
  console.log(result.tag + ' View1 ' + result.value);

  const [backValue, SetbackValue] = useState(result.value);

  useEffect(() => {
    const focus = props.navigation.addListener('focus', async () => {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>> View1 Refresh');
      console.log(
        '>>>>>>>>>>>>>>>>>>>>>>>>>>>> props ' + JSON.stringify(props),
      );
      SetbackValue(result.value);
    });
    return focus;
  }, [props, props.navigation]);

  /*
  context 변화를 구독하는 React 컴포넌트입니다. 함수 컴포넌트안에서 context를 읽기 위해서 쓸 수 있습니다.
  Context.Consumer의 자식은 함수여야합니다. 이 함수는 context의 현재값을 받고 React 노드를 반환합니다.
  이 함수가 받는 value 매개변수 값은 해당 context의 Provider 중 상위 트리에서 가장 가까운 Provider의
  value prop과 동일합니다. 상위에 Provider가 없다면 value 매개변수 값은 createContext()에 보냈던 defaultValue와 동일할 것입니다.
  */
  return (
    <CoreConsumer>
      {({value, SetValue}) => (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: '#828192',
          }}>
          <Text>View1 : {backValue} </Text>
          <Button
            title="Next"
            onPress={() => {
              SetValue(backValue + 1);
              navigation.navigate('View2');
            }}
          />
        </View>
      )}
    </CoreConsumer>
  );
}
