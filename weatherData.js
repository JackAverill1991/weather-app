const fetchWeather = async (latitude, longitude, timezone) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,precipitation,weathercode,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum&current_weather=true&timezone=${timezone}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return {
      current: parseCurrentWeather(data),
      daily: parseDailyWeather(data),
      hourly: parseHourlyWeather(data)
    }
  } catch(error) {
    console.error(error);
  }
};


const parseCurrentWeather = ({ current_weather, daily }) => {
  const date = new Date(current_weather.time);
  const currentHour = date.getHours();
  const timeOfDay = getDayOrNight(daily, currentHour);
  return {
    currentTemp: Math.round(current_weather.temperature),
    windSpeed: Math.round(current_weather.windspeed),
    maxTemp: Math.round(daily.temperature_2m_max[0]),
    minTemp: Math.round(daily.temperature_2m_min[0]),
    weatherCode: current_weather.weathercode,
    timeOfDay
  }
};


const parseDailyWeather = ({ daily }) => {
  return daily.time.map((day, index) => {
    const date = new Date(day);
    const dayFormatted = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(date);
    return {
      weekday: dayFormatted,
      weatherCode: daily.weathercode[index],
      maxTemp: Math.round(daily.temperature_2m_max[index]),
    }
  });
};


const parseHourlyWeather = ({ hourly, current_weather, daily }) => {
  const currentTime = new Date(current_weather.time);
  const currentHour = currentTime.getHours();
  const sunriseArray = daily.sunrise.map(day => new Date(day));
  const sunsetArray = daily.sunset.map(day => new Date(day));
  const formattedSunrise = formatSunriseSunset(sunriseArray);
  const formattedSunset = formatSunriseSunset(sunsetArray);

  // finds the index of the current hour in the hourly.time array
  const startIndex = hourly.time.findIndex((hour) => {
    const currentHourArray = new Date(hour);
    return currentHourArray.getHours() === currentHour;
  });

  // returns array of hours starting at current hour (startIndex) and cuts off at 24 hours
  const hourlyResults = hourly.time.slice(startIndex, startIndex + 24);

  return hourlyResults.map((hour, index) => {
    const date = new Date(hour);
    const hourFormatted = date.getHours().toString().padStart(2, '0');
    const dayFormatted = new Intl.DateTimeFormat("en-GB", { weekday: "long" }).format(date);
    const timeOfDay = getDayOrNight(daily, hourFormatted);
    return {
      date,
      hourFormatted,
      dayFormatted,
      timeOfDay,
      sunriseArray,
      sunsetArray,
      formattedSunrise,
      formattedSunset,
      weatherCode: hourly.weathercode[index + startIndex],
      temperature: Math.round(hourly.temperature_2m[index + startIndex]),
      feelsLike: Math.round(hourly.apparent_temperature[index + startIndex]),
      windSpeed: hourly.windspeed_10m[index + startIndex],
      precipitation: hourly.precipitation[index + startIndex],
    };
  });

};


const formatSunriseSunset = (data) => {
  return data.map(time => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  });
};


const getDayOrNight = (daily, hour) => {
  const sunrise = new Date(daily.sunrise[0]).getHours();
  const sunset = new Date(daily.sunset[0]).getHours();
  if (hour >= sunrise && hour <= sunset) {
    return "day";
  } else return "night";
};


export { fetchWeather };