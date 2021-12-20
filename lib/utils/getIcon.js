import { summaryIcons, weatherIcons } from './icons';

const getIcon = (icon, size, type) =>
  type === 'summary'
    ? `https://img.icons8.com/color-glass/${size}/000000/${summaryIcons[icon]}`
    : `/assets/weather-icons/${weatherIcons[icon]}.svg`;

export default getIcon;
