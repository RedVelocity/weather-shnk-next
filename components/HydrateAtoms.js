'use client';

import { useHydrateAtoms } from 'jotai/utils';
// import { useAtom } from 'jotai';
import { locationAtom, weatherAtom } from '../lib/store';

const HydrateAtoms = ({ weather, location }) => {
  useHydrateAtoms([
    [weatherAtom, weather],
    [locationAtom, location],
  ]);
  // const [, setWeatherData] = useAtom(weatherAtom);
  // const [, setLocation] = useAtom(locationAtom);
  // setWeatherData(weather);
  // setLocation(location);
  return null;
};

export default HydrateAtoms;
