/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useContext, useState} from 'react';
import {
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
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
import Camera from './components/Camera';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default function View1(props) {
  const navigation = useNavigation();

  const {route} = props;

  const {params} = route;

  const result = useContext(CoreContext);

  console.log(result.tag + ' View1 ');
  console.log(result.tag + ' View1 ' + result.value);

  const [img, setImg] = useState(null);

  function onPicture({uri}) {
    setImg(uri);
    navigation.navigate('View2', {imageResource: uri});
  }

  function onBackToCamera() {
    setImg(null);
  }

  return (
    <CoreConsumer>
      {({value, SetValue}) => (
        <SafeAreaView style={{flex: 1}}>
          {img ? (
            <>
              <View style={{flex: 1}}>
                <ImageBackground source={{uri: img}} style={{flex: 1}}>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.btnAlignment}
                    onPress={() => {
                      onBackToCamera();
                    }}>
                    <Icon name="camera" size={50} color="#000" />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            </>
          ) : (
            <Camera onPicture={onPicture} />
          )}
        </SafeAreaView>
      )}
    </CoreConsumer>
  );
}

const styles = StyleSheet.create({
  btnAlignment: {
    flex: 1,
    height: 50,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 590,
    marginBottom: 20,
  },
});
