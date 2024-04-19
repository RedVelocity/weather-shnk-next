import { useLocalStorage } from '@mantine/hooks';

const useRecentSearch = () => {
  const [searches, setSearches] = useLocalStorage({
    key: 'recentSearches',
    defaultValue: [],
  });
  const MAX_SIZE = 5;

  const addSearch = (place) => {
    setSearches((prevSearches) => {
      const updatedSearches = [
        ...prevSearches.filter((s) => s.id !== place.id),
        place,
      ].slice(-MAX_SIZE);
      return updatedSearches;
    });
  };

  const removeSearch = (place) => {
    setSearches((prevSearches) => {
      const updatedSearches = prevSearches.filter((s) => s.id !== place.id);
      return updatedSearches;
    });
  };

  return { searches, addSearch, removeSearch };
};

export default useRecentSearch;
