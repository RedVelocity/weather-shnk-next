const HOST = '/api';
const execAPI = async (API_ENDPOINT) => {
  try {
    const res = await fetch(API_ENDPOINT);
    const data = await res.json();
    return data;
  } catch (error) {
    return 0;
  }
};

export const getWeather = async (latitude, longitude) => {
  // const exclude = "[minutely,flags]";
  const API_ENDPOINT = `${HOST}/getWeather?latitude=${latitude}&longitude=${longitude}`;
  return execAPI(API_ENDPOINT);
};

export const getLocation = async (latitude, longitude) => {
  const API_ENDPOINT = `${HOST}/getLocation?latitude=${latitude}&longitude=${longitude}`;
  return execAPI(API_ENDPOINT);
};

export const getPlaces = async (latitude, longitude, searchTerm) => {
  const API_ENDPOINT = `${HOST}/getPlaces?latitude=${latitude}&longitude=${longitude}&searchTerm=${searchTerm}`;
  return execAPI(API_ENDPOINT);
};

export const getTimezone = async (latitude, longitude) => {
  const API_ENDPOINT = `${HOST}/getTimezone?latitude=${latitude}&longitude=${longitude}`;
  return execAPI(API_ENDPOINT);
};
