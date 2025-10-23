import request from 'postman-request';
import dotenv from 'dotenv';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const api_key_path = path.join(__dirname, '../../.env');

dotenv.config({ path: api_key_path });

const weatherStack_API = process.env.weatherStack_API;

const getWeatherData = (query, units, callback) => {
  const url = `https://api.weatherstack.com/current?access_key=${weatherStack_API}&query=${query}&units=${units}`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback(
        'Failed to fetch weather data! Check your internet Connection...',
        undefined,
      );
    } else if (response.body.error) {
      const { code, type, info } = response.body.error;
      callback(`Error Code: ${code},  ${type}, ${info}`, undefined);
    } else {
      const { name, region, country, lat, lon } = response.body.location;

      const { weather_descriptions } = response.body.current;
      const [description] = weather_descriptions;

      const { temperature, feelslike } = response.body.current;

      const tempUnit =
        units === 'm' ? '°C' : units === 'f' ? '°F' : ' scientific';

      // const formattedData = `Location Name: ${name} | Location Region: ${region} | Location Country: ${country} | Location Latitude: ${lat} | Location Longitude: ${lon} | Weather Description: ${description} | Weather Temperature: ${temperature}${tempUnit} but it feels like ${feelslike}${tempUnit}`;
      const formattedData = `${name} ${region} ${country} ${lat} ${lon} ${description} ${temperature} ${tempUnit} but feels like ${feelslike} ${tempUnit}`;

      callback(undefined, formattedData);
    }
  });
};

// getWeatherData('hawaii', 'm', (error, data) => {
//   if (error) {
//     console.log('Error: ', error);
//   } else {
//     console.log('Data: ', data);
//   }
// });

export default {
  getWeatherData,
};
