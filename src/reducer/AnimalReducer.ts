import type { IAnimal } from "../models/IAnimal";

export enum AnimalActionTypes {
  SET_ANIMALS,
  UPDATE_ANIMAL,
  FEED_ANIMAL, // Ny action för att mata djur
}

export type AnimalAction = {
  type: AnimalActionTypes;
  payload: any;
};

export const AnimalReducer = (
  animals: IAnimal[],
  action: AnimalAction
): IAnimal[] => {
  switch (action.type) {
    case AnimalActionTypes.SET_ANIMALS:
      localStorage.setItem("animals", JSON.stringify(action.payload));
      return action.payload as IAnimal[];

    case AnimalActionTypes.UPDATE_ANIMAL:
      const updatedAnimal = action.payload as IAnimal;
      return animals.map((animal) =>
        animal.id === updatedAnimal.id ? updatedAnimal : animal
      );

    case AnimalActionTypes.FEED_ANIMAL:
      console.log(
        "[Reducer] Feeding animal ID:",
        action.payload.id,
        "New lastFed:",
        action.payload.lastFed
      );
      const { id, lastFed } = action.payload;
      const updatedAnimals = animals.map((animal) =>
        animal.id === id ? { ...animal, lastFed } : animal
      );
      localStorage.setItem("animals", JSON.stringify(updatedAnimals));
      return updatedAnimals;

    default:
      return animals;
  }
};
