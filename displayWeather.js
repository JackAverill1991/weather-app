import { hideLoading } from "./toggleElements.js";
import {
  formatIconUrl,
  formatBackgroundColor,
  formatWeatherDescription
} from "./weatherInterface.js";


const locationDOM = document.querySelector('.location');

// daily template
const dailyForecast = document.querySelector('.daily-forecast-wrap');
const dayWeatherCard = document.querySelector('.day-weather-card-template');

// hourly template
const hourlyForecast = document.querySelector('.hourly-forecast-wrap');
const hourRowTemplate = document.querySelector('.hour-row-template');

// sunrise & sunset template
const sunriseAndSunset = document.querySelector('.sunrise-and-sunset-template');


const displayCurrentWeather = (current, hourly) => {
  // elements
  const weatherIconDOM = document.querySelector('.weather-icon');
  const currentTempDOM = document.querySelector('.temperature');
  const weatherDescriptionDOM = document.querySelector('.weather-description');
  const maxTempDOM = document.querySelector('.max-temperature .data');
  const minTempDOM = document.querySelector('.min-temperature .data');
  const feelsLikeDOM = document.querySelector('.feels-like .data');
  const windSpeedDOM = document.querySelector('.wind-speed .data');
  const precipDOM = document.querySelector('.precipitation .data');
  // values
  weatherIconDOM.src = formatIconUrl(current.weatherCode, current.timeOfDay);
  currentTempDOM.textContent = `${current.currentTemp}\u00B0`;
  weatherDescriptionDOM.textContent = formatWeatherDescription(current.weatherCode, current.timeOfDay);
  maxTempDOM.textContent = `${current.maxTemp}`;
  minTempDOM.textContent = `${current.minTemp}`;
  feelsLikeDOM.textContent = `${hourly[0].feelsLike}`;
  windSpeedDOM.textContent = `${hourly[0].windSpeed}`;
  precipDOM.textContent = `${hourly[0].precipitation}`;
  formatBackgroundColor(current.weatherCode, current.timeOfDay);
};


const displayDailyWeather = (daily) => {
  dailyForecast.innerHTML = '';
  daily.forEach(day => {
    const element = dayWeatherCard.content.cloneNode(true);
    // DOM elements
    const dailyWeatherIconDOM = element.querySelector('.daily-weather-icon');
    const dailyTemperatureDOM = element.querySelector('.daily-temperature');
    const weekdayDOM = element.querySelector('.weekday');
    // assign values
    dailyWeatherIconDOM.src = formatIconUrl(day.weatherCode, "day");
    dailyTemperatureDOM.textContent = `${day.maxTemp}\u00B0`;
    weekdayDOM.textContent = day.weekday;
    // add to container
    dailyForecast.appendChild(element);
  });
};


const displayHourlyWeather = (hourly) => {
  hourlyForecast.innerHTML = '';
  // indexes and conditionals for sunrise / sunset
  let sunriseIndex = 0;
  let sunsetIndex = 0;

  hourly.forEach((hour, index) => {
    // elements
    const element = hourRowTemplate.content.cloneNode(true);
    const time = element.querySelector('.time');
    const day = element.querySelector('.day');
    const hourlyWeatherIconDOM = element.querySelector('.weather-icon-hourly');
    const hourlyTemperature = element.querySelector('.hourly-temperature');
    const hourlyFlTemperature = element.querySelector('.hourly-fl-temperature');
    const hourlyWind = element.querySelector('.hourly-wind');
    const hourlyPrecip = element.querySelector('.hourly-precip');
    // values
    time.textContent = index === 0 ? "Now" : `${hour.hourFormatted}:00`;
    day.textContent = hour.dayFormatted;
    hourlyWeatherIconDOM.src = formatIconUrl(hour.weatherCode, hour.timeOfDay);
    hourlyTemperature.textContent = `${hour.temperature}\u00B0`;
    hourlyFlTemperature.textContent = `${hour.feelsLike}\u00B0`;
    hourlyWind.textContent = `${hour.windSpeed} mph`;
    hourlyPrecip.textContent = `${hour.precipitation} in`;
    // add to container
    hourlyForecast.appendChild(element);

    // add sunrise information
    if (sunriseIndex < hour.sunriseArray.length) {
      // get each hour from sunriseArray
      const sunriseHour = hour.sunriseArray[sunriseIndex].getHours();
      if (hour.date.getDate() === hour.sunriseArray[sunriseIndex].getDate()) {
        // Skip the first item in sunriseArray if the current hour is after it
        if (hour.date.getHours() > sunriseHour) {
          sunriseIndex++;
        }
        if (hour.date.getHours() === sunriseHour) {
          // elements
          const sunriseElement = sunriseAndSunset.content.cloneNode(true);
          const sunriseTimeElement = sunriseElement.querySelector('.sunrise-sunset-time');
          const sunriseIcon = sunriseElement.querySelector('.sunrise-sunset-icon');
          const sunriseTitle = sunriseElement.querySelector('.sunrise-sunset-title');
          // values
          sunriseTimeElement.textContent = `${hour.formattedSunrise[sunriseIndex]}`;
          sunriseTitle.textContent = 'Sunrise';
          sunriseIcon.src = '/public/icons/sunrise.svg';
          hourlyForecast.appendChild(sunriseElement);
        
          sunriseIndex++;
        }
      }
    }
    // add sunset information
    if (sunsetIndex < hour.sunsetArray.length) {
      const sunsetHour = hour.sunsetArray[sunsetIndex].getHours();
      if (hour.date.getDate() == hour.sunsetArray[sunsetIndex].getDate()) {
        if (hour.date.getHours() > sunsetHour) {
          sunsetIndex++;
        }
        if (hour.date.getHours() == sunsetHour) {
          // elements
          const sunsetElement = sunriseAndSunset.content.cloneNode(true);
          const sunsetTimeElement = sunsetElement.querySelector('.sunrise-sunset-time');
          const sunsetIcon = sunsetElement.querySelector('.sunrise-sunset-icon');
          const sunsetTitle = sunsetElement.querySelector('.sunrise-sunset-title');
          // values
          sunsetTimeElement.textContent = `${hour.formattedSunset[sunsetIndex]}`;
          sunsetTitle.textContent = 'Sunset';
          sunsetIcon.src = '/public/icons/sunset.svg';
          hourlyForecast.appendChild(sunsetElement);

          sunsetIndex++;
        }
      }
    }
  });
};


const renderWeather = ({ current, daily, hourly }) => {
  displayCurrentWeather(current, hourly);
  displayDailyWeather(daily);
  displayHourlyWeather(hourly);
  hideLoading();
};


const renderLocation = (myLocation) => {
  locationDOM.textContent = myLocation;
};

export { renderWeather, renderLocation };