export async function handler(event) {
    const apiKey = process.env.d1becbefc947f6d6af137051548adf7f;
    const { path, query } = event.queryStringParameters;
  
    const url = `https://api.themoviedb.org/3/${path}?api_key=${apiKey}&${query}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch TMDB data' }),
      };
    }
  }
  