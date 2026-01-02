import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // 1. Get the "endpoint" and other params from the frontend request
  // Example: /api/proxy?endpoint=games&search=mario
  const { endpoint, ...otherParams } = request.query;

  if (!endpoint) {
    return response.status(400).json({ error: 'Endpoint is required' });
  }

  const apiKey = process.env.RAWG_API_KEY; 
  const baseUrl = 'https://api.rawg.io/api/';

  // 2. Build the query string for RAWG (forwarding any extra params like 'search' or 'page')
  // We manually add the API Key here
  const queryParams = new URLSearchParams(otherParams as any);
  queryParams.append('key', apiKey as string);

  const finalUrl = `${baseUrl}${endpoint}?${queryParams.toString()}`;

  try {
    // 3. Server-to-Server Fetch
    const apiResponse = await fetch(finalUrl);
    const data = await apiResponse.json();

    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ error: 'Failed to fetch data' });
  }
}