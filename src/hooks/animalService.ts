import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined in enviormental variables");
}

export const getAllAnimals = async (): Promise<any[]> => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching all animals:", error);
    throw error;
  }
};

export const getAnimalById = async (id: number | string): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching animal with ID ${id}:`, error);
    throw error;
  }
};
