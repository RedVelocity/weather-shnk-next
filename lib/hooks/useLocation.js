import { useAtom } from 'jotai';
import { locationAtom } from '../store';

const useLocation = () => {
  const [location, setLocation] = useAtom(locationAtom);
  return { location, setLocation };
};

export default useLocation;
