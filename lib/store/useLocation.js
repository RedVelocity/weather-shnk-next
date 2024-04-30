import { useAtom } from 'jotai';
import { locationAtom } from '@/lib/store';

const useLocation = () => {
  const [location, setLocation] = useAtom(locationAtom);
  return { location, setLocation };
};

export default useLocation;
