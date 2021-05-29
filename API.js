import axios from 'axios';

export const getWeather = async (latitude, longitude) => {
  // const exclude = "[minutely,flags]";
  const API_ENDPOINT = `http://localhost:3000/api/getWeather?latitude=${latitude}&longitude=${longitude}`;
  try {
    const { data } = await axios.get(API_ENDPOINT);
    return data;
  } catch (error) {
    return 0;
  }
};

export const getLocation = async (latitude, longitude) => {
  const API_ENDPOINT = `http://localhost:3000/api/getLocation?latitude=${latitude}&longitude=${longitude}`;
  try {
    const { data } = await axios.get(API_ENDPOINT);
    return data.features[0].place_name;
  } catch (error) {
    return 0;
  }
};

export const getSuggestions = async (latitude, longitude, place) => {
  const API_ENDPOINT = `http://localhost:3000/api/getSuggestions?latitude=${latitude}&longitude=${longitude}&place=${place}`;

  try {
    const { data } = await axios.get(API_ENDPOINT);
    return data.features;
  } catch (error) {
    return 0;
  }
};

export const getTimezone = async (latitude, longitude) => {
  const API_ENDPOINT = `http://localhost:3000/api/getTimezone?latitude=${latitude}&longitude=${longitude}`;

  try {
    const { data } = await axios.get(API_ENDPOINT);
    return data;
  } catch (error) {
    return 0;
  }
};
