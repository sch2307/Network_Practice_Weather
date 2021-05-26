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

class PhotoBackdrop extends Component {
  constructor(props) {
    super(props);
    this.state = {photoSource: null};
  }

  componentDidMount() {
    CameraRoll.getPhotos({first: 10}).then(
      data => {
        let u = {uri: this.props.uri};
        //Alert.alert('(debug)', JSON.stringify(u));
        this.setState({photoSource: {uri: this.props.uri}});
      },
      error => {
        console.warn(error);
      },
    );
  }

  render() {
    return (
      <ImageBackground
        style={styles.backdrop}
        source={this.state.photoSource}
        resizeMode="cover">
        {this.props.children}
      </ImageBackground>
    );
  }
}

export default PhotoBackdrop;
