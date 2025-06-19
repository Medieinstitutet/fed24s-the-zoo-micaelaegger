import { useEffect } from "react";
import axios from "axios";
import { AnimalActionTypes, type AnimalAction } from "../reducer/AnimalReducer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined in environmental variables");
}

export const useFetchAllAnimals = (dispatch: React.Dispatch<AnimalAction>) => {
  useEffect(() => {
    //Har inte hunnit testa ls, då min browser verkar ha någon inställning som gör att jag inte kommer åt ls
    const localAnimalsData = localStorage.getItem("animals");
    if (localAnimalsData) {
      try {
        const parsedAnimals = JSON.parse(localAnimalsData);
        if (Array.isArray(parsedAnimals)) {
          dispatch({
            type: AnimalActionTypes.SET_ANIMALS,
            payload: parsedAnimals,
          });
          return;
        }
      } catch (error) {
        console.error("Error parsing animals from localStorage:", error);
      }
    }
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
  }, [dispatch]);
};
