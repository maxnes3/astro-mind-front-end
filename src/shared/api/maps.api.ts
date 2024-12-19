import axios from 'axios';
import { MapRequest, MapResponse, MapsListResponse, MapType } from '../types';

class ApiMaps {
  private readonly baseURL = import.meta.env.VITE_SERVER_URL;

  getMapsList = async (): Promise<MapsListResponse> => {
    try {
      const response = await axios.get<MapsListResponse>(
        `${this.baseURL}/maps`,
      );
      return response.data;
    } catch (error) {
      console.error('Error predicting price:', error);
      throw error;
    }
  };

  getMapById = async (id: MapType['id']): Promise<MapResponse> => {
    try {
      const response = await axios.get<MapResponse>(
        `${this.baseURL}/map/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error predicting price:', error);
      throw error;
    }
  };

  saveMap = async (data: MapRequest): Promise<boolean> => {
    try {
      const response = await axios.post<boolean>(
        `${this.baseURL}/map/${data.id}`,
        data,
      );
      return response.data;
    } catch (error) {
      console.error('Error predicting price:', error);
      throw error;
    }
  };

  deleteMapById = async (id: MapType['id']): Promise<boolean> => {
    try {
      const response = await axios.delete<boolean>(`${this.baseURL}/map/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error predicting price:', error);
      throw error;
    }
  };
}

const apiMaps = new ApiMaps();
export default apiMaps;
