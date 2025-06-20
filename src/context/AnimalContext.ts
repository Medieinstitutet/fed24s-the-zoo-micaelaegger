import { createContext, type Dispatch } from "react";
import { type AnimalAction } from "../reducer/AnimalReducer";
import type { IAnimal } from "../models/IAnimal";

interface IAnimalsContext {
  animals: IAnimal[];
  dispatch: Dispatch<AnimalAction>;
}

export const AnimalContext = createContext<IAnimalsContext>({
  animals: [],
  dispatch: () => {}, //Placeholder-funktion
});
