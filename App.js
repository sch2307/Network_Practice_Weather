import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  AsyncStorage,
  Image,
} from 'react-native';

import Forecast from './components/Forecast';
import LocationButton from './components/LocationButton';
import LocationInput from './components/LocationInput';
import textStyles from './styles/typography.js';

const STORAGE_KEY = '@SmarterWeather:zip';

import OpenWeatherMap from './components/open_weather_map';

// This version uses flowers.png from local assets
//import PhotoBackdrop from "./components/PhotoBackdrop/local_image";

// This version pulls a specified photo from the camera roll
import PhotoBackdrop from './components/PhotoBackdrop';
import CameraButton from './components/CameraButton';
import {CoreProvider} from './core/CoreManagement';
import Route from './Route';

class WeatherProject extends Component {
  constructor(props) {
    super(props);
    this.state = {forecast: null};
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
      /*
      <>
        <CoreProvider>
          <Route />
        </CoreProvider>
      </>*/
      <PhotoBackdrop>
        <View style={styles.overlay}>
          <View style={styles.row}>
            <LocationInput onGetLocation={this._getForecastForZip} />
          </View>

          <View style={styles.row}>
            <LocationButton onGetCoords={this._getForecastForCoords} />
          </View>

          <View style={styles.row}>
            <CameraButton />
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
