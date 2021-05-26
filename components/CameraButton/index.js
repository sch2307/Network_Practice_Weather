import React, {Component} from 'react';

import Button from '../Button';
import style from '../Button/style';

export default class CameraButton extends Component {
  _onPress() {
    //Pass
  }

  render() {
    return (
      <Button
        label="Capture Camera"
        style={style}
        onPress={this._onPress.bind(this)}
      />
    );
  }
}
