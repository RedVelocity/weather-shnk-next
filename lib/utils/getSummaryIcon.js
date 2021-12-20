import { weatherSummaryIcons } from './icons';

const getSummaryIcon = (icon, size) =>
  `https://img.icons8.com/color-glass/${size}/000000/${weatherSummaryIcons[icon]}`;

export default getSummaryIcon;
