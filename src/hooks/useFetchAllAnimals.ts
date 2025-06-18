import { useContext, useEffect } from "react";
import axios from "axios";
import { AnimalContext } from "../context/AnimalContext";
import { AnimalActionTypes, type AnimalAction } from "../reducer/AnimalReducer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined in environmental variables");
}

// Modified function signature
export const useFetchAllAnimals = (dispatch: React.Dispatch<AnimalAction>) => {
  useEffect(() => {
    const fetchAllAnimals = async () => {
      try {
        const response = await axios.get(API_BASE_URL); // Hämta alla djur
        dispatch({
          type: AnimalActionTypes.SET_ANIMALS, // Uppdatera reducer
          payload: response.data,
        });
      } catch (error) {
        console.error("Error fetching all animals:", error);
      }
    };

    fetchAllAnimals();
  }, [dispatch]); // Added dispatch to dependency array
};
