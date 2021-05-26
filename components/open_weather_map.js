const WEATHER_API_KEY = 'bbeb34ebf60ad50f7893e7440a1e2b0b';
const API_STEM = 'http://api.openweathermap.org/data/2.5/weather?';
const PAPAGO_API_STEM = 'https://openapi.naver.com/v1/papago/n2mt';

function zipUrl(zip) {
  return `${API_STEM}q=${zip}&units=imperial&APPID=${WEATHER_API_KEY}`;
}

function latLonUrl(lat, lon) {
  return `${API_STEM}lat=${lat}&lon=${lon}&units=imperial&APPID=${WEATHER_API_KEY}`;
}

function fetchForecast(url) {
  return fetch(url)
    .then(response => response.json())
    .then(responseJSON => {
      return {
        main: responseJSON.weather[0].main,
        description: responseJSON.weather[0].description,
        temp: responseJSON.main.temp,
      };
    })
    .catch(error => {
      console.error(error);
    });
}

async function fetchZipForecast(zip) {
  const response = await fetch(PAPAGO_API_STEM, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'X-Naver-Client-Id': 'E8a0wfKe7Y8iupLnppLL',
      'X-Naver-Client-Secret': '44gfVsSHEf',
    },
    body: 'source=ko&target=en&text=' + zip,
  })
    .then(response => response.json())
    .then(data => {
      return data.message.result.translatedText;
    })
    .catch(err => console.error(err));

  return fetchForecast(zipUrl(response));
}

function fetchLatLonForecast(lat, lon) {
  return fetchForecast(latLonUrl(lat, lon));
}

export default {
  fetchZipForecast: fetchZipForecast,
  fetchLatLonForecast: fetchLatLonForecast,
};
