exports.handler = async function(event) {
  // Import fetch from Node.js
  const fetch = (await import('node-fetch')).default;

  // Get latitude and longitude
  const { type, address, latitude, longitude } = JSON.parse(event.body);

  // Get API key from .env file
  const apiKey = process.env.GOOGLE_API_KEY;

  let url;

  // Pass latitude, longitude and API key into Google URL 
  if (type === 'location') {
    url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;
  } 
  else if (type === 'reverse-location') {
    url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
  }
  else if (type === 'time-zone') {
    url = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=1331161200&key=${apiKey}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    }
  }
}