import { fetchWeather } from "./weatherData.js";
import { getLocation, getTimeZone } from "./geocodingData.js";
import { renderWeather, renderLocation } from "./displayWeather.js";
import { hideLoading, showLoading, showError, hideError } from "./toggleElements.js";


const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('#search');


searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  let addressEntry = searchInput.value.trim();
  if (addressEntry) {
    showLoading();
    hideError();
    addressEntry = addressEntry.replace(/\s+/g, '+');
    try {
      const result = await getLocation(addressEntry);
      const addressLatitude = result.results[0].geometry.location.lat;
      const addressLongitude = result.results[0].geometry.location.lng;
      const timeZone = await getTimeZone(addressLatitude, addressLongitude);
      const address = result.results[0].formatted_address;
      const weatherData = await fetchWeather(addressLatitude, addressLongitude, timeZone.timeZoneId);
      renderWeather(weatherData);
      renderLocation(address);
    } catch (error) {
      showError();
      hideLoading();
      throw new Error('An error occurred while getting location data.');
    }
  } else {
    alert("Please enter an address.");
  }
});


export {
  searchForm,
  searchInput
}