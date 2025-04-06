const fetchAPIData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}


// Uses Google Timezone API to get current timezone information
const getLocation = async (address) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyD9d0E3TPGHfJefsvcmuFtRrOV8E051Lt0`;
  return fetchAPIData(url);
}


// Uses Google Timezone API to get current timezone information
const getTimeZone = async (latitude, longitude) => {
  const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=1331161200&key=AIzaSyD9d0E3TPGHfJefsvcmuFtRrOV8E051Lt0`;
  return fetchAPIData(url);
}


// Uses Google reverse geocoding to get current address from longitude and latitude
const getReverseLocation = async (latitude, longitude) => {
  const reverseUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyD9d0E3TPGHfJefsvcmuFtRrOV8E051Lt0`;
  const data = await fetchAPIData(reverseUrl);
  return parseCurrentLocation(data);
}


const parseCurrentLocation = ({ results }) => {
  const address = results[8].formatted_address;
  return address;
}


export {
  getLocation,
  getReverseLocation,
  getTimeZone
}