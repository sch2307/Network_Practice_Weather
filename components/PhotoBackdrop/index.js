import React, {Component} from 'react';

import {ImageBackground, Alert} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';

import styles from './style';

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

async function savePicture() {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    return;
  }
  CameraRoll.save(tag, {type, album});
}

class PhotoBackdrop extends Component {
  constructor(props) {
    super(props);
    this.state = {photoSource: null};
  }

  componentDidMount() {
    CameraRoll.getPhotos({first: 10}).then(
      data => {
        let u = {uri: data.edges[0].node.image.uri};
        Alert.alert('(debug)', JSON.stringify(u));
        this.setState({photoSource: {uri: data.edges[0].node.image.uri}});
      },
      error => {
        console.warn(error);
      },
    );
  }

  render() {
    //let p = this.state.photoSource;
    return (
      <ImageBackground
        style={styles.backdrop}
        source={this.state.photoSource}
        //source={require("/cache/image_cache/7fa20e72-df0b-4c07-84f2-b1f546d94704.jpg")}
        resizeMode="cover">
        {this.props.children}
      </ImageBackground>
    );
  }
}

export default PhotoBackdrop;
