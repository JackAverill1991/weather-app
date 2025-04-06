const iconMap = new Map();

const addWeatherInterface = (weatherCodes, iconName, colorScheme, weatherDescription) => {
  if (!Array.isArray(iconName)) {
    // Convert a single string to an array
    iconName = [iconName]; 
  }
  weatherCodes.forEach(weatherCode => {
    iconMap.set(weatherCode, { iconName, colorScheme, weatherDescription });
  });
};



// weather code / svg filename / color scheme class / weather description
addWeatherInterface([0, 1], ["sun", "moon"], ["clear-sky-day", "sky-night"], ["sunny", "clear"]);
addWeatherInterface([2], ["cloud-sun", "cloud-moon"], ["clear-sky-day", "sky-night"], ["partially cloudy"]);
addWeatherInterface([3], ["cloud"], ["overcast-sky-day", "sky-night"], ["cloudy"]);
addWeatherInterface([45, 48], ["fog"], ["overcast-sky-day", "sky-night"], ["foggy"]);
addWeatherInterface([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], ["rain"], ["overcast-sky-day", "sky-night"], ["rain"]);
addWeatherInterface([71, 73, 75, 77, 85, 86], ["snow"], ["overcast-sky-day", "sky-night"], ["snow"]);
addWeatherInterface([95, 96, 99], ["cloud-bolt"], ["overcast-sky-day", "sky-night"], ["thunderstorms"]);



const setIconIndex = (array, time) => {
  let iconIndex;
  // sets index of 0 or 1 based on day & night / length of array
  if (time === "day") {
    iconIndex = 0;
  } else {
    if (array.length > 1) {
      iconIndex = 1;
    } else {
      iconIndex = 0;
    }
  }
  return iconIndex;
};



const formatWeatherDescription = (weatherCode, timeOfDay) => {
  const weatherLabel = iconMap.get(weatherCode);
  const { weatherDescription } = weatherLabel;
  const iconIndex = setIconIndex(weatherDescription, timeOfDay);
  if (weatherLabel) {
    const finalWeatherDesc = weatherDescription[iconIndex];
    return finalWeatherDesc;
  } 
};



const formatIconUrl = (weatherCode, timeOfDay) => {
  const iconNamesArray = iconMap.get(weatherCode);
  const { iconName } = iconNamesArray;
  const iconIndex = setIconIndex(iconName, timeOfDay);
  const weatherIcon = iconName[iconIndex];
  if (weatherIcon) {
    const url = `public/icons/${weatherIcon}.svg`;
    return url;
  }
};



const formatBackgroundColor = (weatherCode, timeOfDay) => {
  const backgroundColors = iconMap.get(weatherCode);
  const { colorScheme } = backgroundColors;
  const iconIndex = setIconIndex(colorScheme, timeOfDay);
  const weatherClass = colorScheme[iconIndex];
  if (weatherClass) {
    document.body.classList = "";
    document.body.classList.add(weatherClass);
  }
};



export {
  iconMap,
  formatIconUrl,
  formatBackgroundColor,
  formatWeatherDescription
};