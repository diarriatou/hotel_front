import api from './api';

interface Hotel {
  _id: string;
  name: string;
  address: string;
  price: number;
  currency: string;
  photo: string;
}

interface HotelServiceResponse {
  success: boolean;
  data: Hotel[];
  error?: string;
}

export const hotelService = {
  async getAllHotels(): Promise<HotelServiceResponse> {
    try {
      const response = await api.get('/hotels');
      return {
        success: true,
        data: response.data.data || []
      };
    } catch (error: any) {
      console.error('getAllHotels error:', error);
      return {
        success: false,
        data: [],
        error: error.response?.data?.message || 'Erreur de chargement'
      };
    }
  }
};
