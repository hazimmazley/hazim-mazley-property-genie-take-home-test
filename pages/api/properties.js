import axios from 'axios';

const API_URL = 'https://agents.propertygenie.com.my/api/properties-mock';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { page = 1, sort = '' } = req.query;

    const params = new URLSearchParams();
    params.append('page', page);
    if (sort) {
      params.append('sort', sort);
    }

    const response = await axios.post(`${API_URL}?${params.toString()}`, null, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('API Error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch properties',
      message: error.message
    });
  }
}
