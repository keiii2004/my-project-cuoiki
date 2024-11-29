import axios from 'axios';

export const fetchUser = async () => {
  try {
    const response = await axios.get('http://localhost:3000/account');
    return response.data; 
  } catch (error) {
    console.error('Error fetching product data:', error);
    return [];
  }
};






















