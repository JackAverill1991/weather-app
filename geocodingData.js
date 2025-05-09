// Uses Google geocoding to get address information
const getLocation = async (address) => {  
  const response = await fetch('/.netlify/functions/handle-api-data', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ type: 'location', address })
  });

  const data = await response.json();
  return data;
}


// Uses Google Timezone API to get current timezone information
const getTimeZone = async (latitude, longitude) => {  
  const response = await fetch('/.netlify/functions/handle-api-data', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ type: 'time-zone', latitude, longitude })
  });

  const data = await response.json();
  return data;
}


// Uses Google reverse geocoding to get current address from longitude and latitude
const getReverseLocation = async (latitude, longitude) => {  
  const response = await fetch('/.netlify/functions/handle-api-data', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ type: 'reverse-location', latitude, longitude })
  });
  console.log('call reverse location');
  const data = await response.json();
  return data;
}

// const parseCurrentLocation = ({ results }) => {
//   const address = results[8].formatted_address;
//   return address;
// }




export {
  getLocation,
  getReverseLocation,
  getTimeZone
}