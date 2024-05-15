const getLocationPath = (placeName, placeLocality) => {
  const cleanedPlaceLocality = placeLocality
    .replace(`${placeName}, `, '')
    .replaceAll(', ', ',')
    .replaceAll('.', '');

  if (placeName === cleanedPlaceLocality) return placeName;

  return `${placeName},${cleanedPlaceLocality}`;
};

export default getLocationPath;
