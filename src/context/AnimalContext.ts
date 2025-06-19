import { createContext, type Dispatch } from "react";
import { AnimalReducer, type AnimalAction } from "../reducer/AnimalReducer";
import type { IAnimal } from "../models/IAnimal";
import { useFetchAllAnimals } from "../hooks/useFetchAllAnimals";

interface IAnimalsContext {
  animals: IAnimal[];
  dispatch: Dispatch<AnimalAction>;
}

export const AnimalContext = createContext<IAnimalsContext>({
  animals: [],
  dispatch: () => {}, //Placeholder-funktion
});
