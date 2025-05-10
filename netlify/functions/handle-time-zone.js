exports.handler = async function(event) {
  // Get latitude and longitude
  const { latitude, longitude } = JSON.parse(event.body);

  // Get API key from .env file
  const apiKey = process.env.GOOGLE_API_KEY;

  const timestamp = Math.floor(Date.now() / 1000);

  // Pass latitude, longitude and API key into Google URL
  const url = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${timestamp}&key=${apiKey}`;

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