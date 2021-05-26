import React, {Component} from 'react';

import {Text, View, TextInput} from 'react-native';

import styles from './style.js';
import textStyles from './../../styles/typography.js';

const style = {backgroundColor: '#DDDDDD'};

class LocationInput extends Component {
  _handleTextChange = event => {
    let zip = event.nativeEvent.text;
    console.log('TEST ZIP : ' + zip);
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
