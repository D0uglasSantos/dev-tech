import axios from 'axios';

const API_URL = 'https://viacep.com.br/ws';

export const fetchAddressByZip = async (zip: string) => {
  try {
    const response = await axios.get(`${API_URL}/${zip}/json/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching address:', error);
    throw error;
  }
};
