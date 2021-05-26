import React, {Component} from 'react';
import Geolocation from '@react-native-community/geolocation';

import Button from './../Button';
import styles from './style.js';

const style = {backgroundColor: '#DDDDDD'};

class LocationButton extends Component {
  _onPress() {
    /* this.props.onGetCoords(
      37.0,
      128.0
    ); */
    Geolocation.getCurrentPosition(
      initialPosition => {
        this.props.onGetCoords(
          initialPosition.coords.latitude,
          initialPosition.coords.longitude,
        );
      },
      error => {
        alert(error.message);
      },
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 10000},
      // { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    return (
      <Button
        label="Use Current Location"
        style={style}
        onPress={this._onPress.bind(this)}
      />
    );
  }
}

export default LocationButton;
