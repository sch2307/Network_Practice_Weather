import React, {Component} from 'react';

import {Text, View, TextInput} from 'react-native';

import styles from './style.js';
import textStyles from './../../styles/typography.js';

class LocationInput extends Component {
  _handleTextChange = event => {
    let zip = event.nativeEvent.text;
    this.props.onGetLocation(zip);
  };

  render() {
    return (
      <View style={styles.row}>
        <Text style={textStyles.mainText}>Forecast for</Text>

        <View style={styles.zipContainer}>
          <TextInput
            style={[textStyles.mainText, styles.zipCode]}
            onSubmitEditing={this._handleTextChange}
            underlineColorAndroid="transparent"
          />
        </View>
      </View>
    );
  }
}

export default LocationInput;
