import axios from 'axios';

const HOST = '/api';

export const getWeather = async (latitude, longitude) => {
  // const exclude = "[minutely,flags]";
  const API_ENDPOINT = `${HOST}/getWeather?latitude=${latitude}&longitude=${longitude}`;
  try {
    const { data } = await axios.get(API_ENDPOINT);
    return data;
  } catch (error) {
    return 0;
  }
};

export const getLocation = async (latitude, longitude) => {
  const API_ENDPOINT = `${HOST}/getLocation?latitude=${latitude}&longitude=${longitude}`;
  try {
    const { data } = await axios.get(API_ENDPOINT);
    return data.features[0].place_name;
  } catch (error) {
    return 0;
  }
};

export const getPlaces = async (latitude, longitude, searchTerm) => {
  const API_ENDPOINT = `${HOST}/getPlaces?latitude=${latitude}&longitude=${longitude}&searchTerm=${searchTerm}`;
  try {
    const { data } = await axios.get(API_ENDPOINT);
    return data;
  } catch (error) {
    return 0;
  }
};

export const getTimezone = async (latitude, longitude) => {
  const API_ENDPOINT = `${HOST}/getTimezone?latitude=${latitude}&longitude=${longitude}`;
  try {
    const { data } = await axios.get(API_ENDPOINT);
    return data;
  } catch (error) {
    return 0;
  }
};
