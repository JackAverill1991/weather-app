exports.handler = async function(event) {
  // Get latitude and longitude
  const { address } = JSON.parse(event.body);

  // Get API key from .env file
  const apiKey = process.env.GOOGLE_API_KEY;

  // Pass address and API key into Google URL
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`;

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