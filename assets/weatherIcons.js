import clearDay from './svg/clear-day.svg';
import clearNight from './svg/clear-night.svg';
import cloudy from './svg/cloudy.svg';
import fog from './svg/fog.svg';
import partlyCloudyDay from './svg/partly-cloudy-day.svg';
import partlyCloudyNight from './svg/partly-cloudy-night.svg';
import rain from './svg/rain.svg';
import sleet from './svg/sleet.svg';
import thunderstorm from './svg/thunderstorm.svg';
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
