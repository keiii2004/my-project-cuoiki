import axios from 'axios';

export const fetchOrderHistory = async () => {
  try {
    const response = await axios.get('http://localhost:3000/orderHistory');
    return response.data; 
  } catch (error) {
    console.error('Error fetching product data:', error);
    return [];
  }
};






















