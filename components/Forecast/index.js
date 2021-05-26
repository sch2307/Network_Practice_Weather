import React, {Component} from 'react';

import {Text, View, StyleSheet} from 'react-native';

function convertTemp(temp) {
  const tmpTemp = (temp - 32) / 1.8;
  return Math.round(tmpTemp);
}

class Forecast extends Component {
  render() {
    return (
      <View style={styles.forecast}>
        <Text style={{color: '#FFFFFF', fontSize: 72}}>
          {convertTemp(this.props.temp)}°c
        </Text>
        <Text style={{color: '#FFFFFF', fontSize: 32}}>{this.props.main}</Text>
        <Text style={{color: '#FFFFFF', fontSize: 20}}>
          {this.props.description}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({forecast: {alignItems: 'center'}});

export default Forecast;
