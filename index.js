import { fetchWeather } from "./weatherData.js";
// import { getLocation, getReverseLocation, getTimeZone } from "./geocodingData.js";
import { getReverseLocation } from "./geocodingData.js";
import { renderWeather, renderLocation } from "./displayWeather.js";
import { showLoading } from "./toggleElements.js";
import { searchForm, searchInput } from "./search.js";


const positionSuccess = async ({ coords }) => {
  showLoading();
  try {  
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const weatherData = await fetchWeather(coords.latitude, coords.longitude, timeZone);
    const reverseLocation = await getReverseLocation(coords.latitude, coords.longitude);
    renderWeather(weatherData);
    renderLocation(reverseLocation);
  } catch (error) {
    console.log(error);
  }
};


const positionError = () => {
  alert(
    "There was an error getting your location. Please update your location settings and refresh the page."
  )
};


navigator.geolocation.getCurrentPosition(positionSuccess, positionError);