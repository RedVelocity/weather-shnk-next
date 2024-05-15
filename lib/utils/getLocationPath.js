const getLocationPath = (placeName, placeLocality) => {
  const cleanedPlaceLocality = placeLocality
    .replaceAll(', ', ',')
    .replaceAll('.', '');

  if (placeName === cleanedPlaceLocality) return placeName;

  return `${placeName},${cleanedPlaceLocality}`;
};

export default getLocationPath;
