const getLocationPath = (placeName, placeLocality) => {
  const cleanedPlaceLocality = placeLocality
    .replaceAll(', ', ',')
    .replaceAll('.', '');

  if (placeName === cleanedPlaceLocality) return encodeURIComponent(placeName);

  return encodeURIComponent(`${placeName},${cleanedPlaceLocality}`);
};

export default getLocationPath;
