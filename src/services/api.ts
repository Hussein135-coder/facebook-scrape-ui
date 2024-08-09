import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;

export const getConfig = async () => {
  const response = await axios.get(`${API_URL}/config`);
  return response.data;
};

export const updateConfig = async (config: unknown) => {
  await axios.post(`${API_URL}/config`, config);
};

export const getImages = async () => {
  const response = await axios.get(`${API_URL}/images`);
  return response.data;
};
