import clearDay from './clear-day.svg';
import clearNight from './clear-night.svg';
import cloudy from './cloudy.svg';
import fog from './fog.svg';
import partlyCloudyDay from './partly-cloudy-day.svg';
import partlyCloudyNight from './partly-cloudy-night.svg';
import rain from './rain.svg';
import sleet from './sleet.svg';
import thunderstorm from './thunderstorm.svg';
// import tornado from './tornado.svg';

const weatherIcons = {
  '01d': clearDay,
  '01n': clearNight,
  '02d': partlyCloudyDay,
  '02n': partlyCloudyNight,
  '03d': cloudy,
  '03n': cloudy,
  '04d': cloudy,
  '04n': cloudy,
  '09d': rain,
  '09n': rain,
  '10d': rain,
  '10n': rain,
  '11d': thunderstorm,
  '11n': thunderstorm,
  '13d': sleet,
  '13n': sleet,
  '50d': fog,
  '50n': fog,
  // tornado,
};

export default weatherIcons;
