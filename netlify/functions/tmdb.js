// netlify/functions/tmdb.js
const fetch = require('node-fetch');

exports.handler = async function(event) {
  const API_KEY = process.env.d1becbefc947f6d6af137051548adf7f;
  const path = event.queryStringParameters.path || '';
  const query = event.queryStringParameters.query || '';

  const url = `https://api.themoviedb.org/3/${path}?api_key=${API_KEY}&${query}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
