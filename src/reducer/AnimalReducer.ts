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
      return JSON.parse(action.payload) as IAnimal[];

    case AnimalActionTypes.UPDATE_ANIMAL:
      const updatedAnimal = JSON.parse(action.payload) as IAnimal;
      return animals.map((animal) =>
        animal.id === updatedAnimal.id ? updatedAnimal : animal
      );

    case AnimalActionTypes.FEED_ANIMAL: // Hantera matning av djur
      const { id, lastFed } = action.payload;
      return animals.map((animal) =>
        animal.id === id ? { ...animal, lastFed, isFed: true } : animal
      );

    default:
      return animals;
  }
};
