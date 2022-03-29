import { useContext } from 'react';
import { LocationContext } from '../context/locationProvider';

const useLocation = () => {
  const { location, setLocation } = useContext(LocationContext);
  return { location, setLocation };
};

export default useLocation;
