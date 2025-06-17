export interface IAnimal {
  id: number;
  name: string;
  imageUrl: string;
  isFed: boolean;
  lastFed: string; // Tidpunkt då djuret senast matades (ISO 8601-format)
  shortDescription: string;
  longDescription: string;
  yearOfBirth: number;
  latinName: string;
}
