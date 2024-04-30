/* eslint-disable react/prop-types */

'use client';

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { locationAtom, weatherAtom } from '@/lib/store';

const HydrateAtoms = ({ weather, location }) => {
  // Hydrate on intitial render
  useHydrateAtoms([
    [weatherAtom, weather],
    [locationAtom, location],
  ]);

  const [, setWeatherData] = useAtom(weatherAtom);
  const [, setLocation] = useAtom(locationAtom);
  // Update state from client on new request
  useEffect(() => {
    setWeatherData(weather);
    setLocation(location);
  }, [weather, location]);

  return null;
};

export default HydrateAtoms;
