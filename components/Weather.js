import React, {Component} from 'react';
import {View, AsyncStorage, StyleSheet} from 'react-native';
import OpenWeatherMap from './open_weather_map';

const STORAGE_KEY = '@SmarterWeather:zip';

import Forecast from './Forecast';
import LocationButton from './LocationButton';
import LocationInput from './LocationInput';
import PhotoBackdrop from './PhotoBackdrop';
import textStyles from '../styles/typography';

class WeatherProject extends Component {
  constructor(props) {
    super(props);
    this.state = {forecast: null, imageUri: null};
  }

  componentDidMount() {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(value => {
        if (value !== null) {
          this._getForecastForZip(value);
        }
      })
      .catch(error => console.error('AsyncStorage error: ' + error.message))
      .done();
  }

  _getForecastForZip = zip => {
    // Store zip code
    AsyncStorage.setItem(STORAGE_KEY, zip)
      .then(() => console.log('Saved selection to disk: ' + zip))
      .catch(error => console.error('AsyncStorage error: ' + error.message))
      .done();

    OpenWeatherMap.fetchZipForecast(zip).then(forecast => {
      this.setState({forecast: forecast});
    });
  };

  _getForecastForCoords = (lat, lon) => {
    OpenWeatherMap.fetchLatLonForecast(lat, lon).then(forecast => {
      this.setState({forecast: forecast});
    });
  };

  _handleTextChange = event => {
    let zip = event.nativeEvent.text;
    this._getForecastForZip(zip);
  };

  render() {
    return (
      <PhotoBackdrop uri={this.props.imageResource}>
        <View style={styles.overlay}>
          <View style={styles.row}>
            <LocationInput onGetLocation={this._getForecastForZip} />
          </View>

          <View style={styles.row}>
            <LocationButton onGetCoords={this._getForecastForCoords} />
          </View>

          {this.state.forecast && (
            <View style={styles.row}>
              <Forecast
                main={this.state.forecast.main}
                temp={this.state.forecast.temp}
                description={this.state.forecast.description}
              />
            </View>
          )}
        </View>
      </PhotoBackdrop>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {backgroundColor: 'rgba(0,0,0,0.1)'},
  row: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  zipContainer: {
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3,
    width: 80,
    height: textStyles.baseFontSize * 2,
    justifyContent: 'flex-end',
  },
  zipCode: {flex: 1},
});

export default WeatherProject;
