// netlify/functions/tmdb.js

exports.handler = async function(event) {
  const API_KEY = 'd1becbefc947f6d6af137051548adf7f'; // Your TMDB API key

  const path = event.queryStringParameters?.path || '';
  const query = event.queryStringParameters?.query || '';

  if (!path) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing 'path' query parameter" }),
    };
  }

  const url = `https://api.themoviedb.org/3/${path}?api_key=${API_KEY}&${query}`;

  try {
    const res = await fetch(url); // ✅ Native fetch (no require)
    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify({ error: `TMDB API responded with status ${res.status}` }),
      };
    }

    const data = await res.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // ✅ Allow CORS
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
