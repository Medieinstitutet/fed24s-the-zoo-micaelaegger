import { useContext, useEffect } from "react";
import axios from "axios";
import { AnimalContext } from "../context/AnimalContext";
import { AnimalActionTypes } from "../reducer/AnimalReducer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined in environmental variables");
}

export const useFetchAllAnimals = () => {
  const { dispatch } = useContext(AnimalContext); // Hämta dispatch från Context

  useEffect(() => {
    const fetchAllAnimals = async () => {
      try {
        const response = await axios.get(API_BASE_URL); // Hämta alla djur
        dispatch({
          type: AnimalActionTypes.SET_ANIMALS, // Uppdatera reducer
          payload: JSON.stringify(response.data),
        });
      } catch (error) {
        console.error("Error fetching all animals:", error);
      }
    };

    fetchAllAnimals();
  }, [dispatch]); // Kör endast när dispatch ändras
};
