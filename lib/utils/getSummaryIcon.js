const weatherSummaryIcons = {
  '01d': 'sun.png',
  '01n': 'bright-moon.png',
  '02d': 'partly-cloudy-day.png',
  '02n': 'partly-cloudy-night.png',
  '03d': 'cloud.png',
  '03n': 'cloud.png',
  '04d': 'clouds.png',
  '04n': 'clouds.png',
  '09d': 'rain.png',
  '09n': 'rain.png',
  '10d': 'heavy-rain.png',
  '10n': 'heavy-rain.png',
  '11d': 'storm.png',
  '11n': 'storm.png',
  '13d': 'sleet.png',
  '13n': 'sleet.png',
  '50d': 'fog.png',
  '50n': 'fog.png',
};

const getSummaryIcon = (icon, size) =>
  `https://img.icons8.com/color-glass/${size}/000000/${weatherSummaryIcons[icon]}`;

export default getSummaryIcon;
