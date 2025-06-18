import { useContext } from "react"; // Ta bort useEffect eftersom den inte används
import { useParams } from "react-router";
import { AnimalContext } from "../context/AnimalContext";
import { AnimalActionTypes } from "../reducer/AnimalReducer";
import { getAnimalFeedingStatus } from "../utils/animalStatus"; // Importera den nya funktionen
import "./../styles/AnimalPage.scss";

export const AnimalPage = () => {
  const { id } = useParams<{ id: string }>(); // Hämta ID från URL
  const { animals, dispatch } = useContext(AnimalContext); // Hämta djurdata och dispatch från Context

  // Hitta djuret i Context
  const animal = animals.find((a) => a.id === Number(id));

  // Funktion för att mata djuret
  const feedAnimal = () => {
    if (animal) {
      const now = new Date().toISOString();
      dispatch({
        type: AnimalActionTypes.FEED_ANIMAL,
        payload: { id: animal.id, lastFed: now },
      });
    }
  };

  if (!animal) {
    return <p>Loading...</p>; // Visa laddning medan djuret hämtas
  }

  // Använd den nya funktionen för att hämta status
  const { isFeedButtonDisabled, showThreeHourWarning } = getAnimalFeedingStatus(
    animal.lastFed
  );

  return (
    <section className="animal-page">
      <h1>{animal.name}</h1>
      <img
        className="animal-page__image"
        src={animal.imageUrl}
        alt={animal.name}
        onError={(e) => {
          e.currentTarget.src = "/placeholder.jpeg";
          e.currentTarget.alt = "Placeholder image";
        }}
      />
      <p className="animal-page__description">{animal.longDescription}</p>
      <p className="animal-page__last-fed">Last fed: {animal.lastFed}</p>
      {showThreeHourWarning && (
        <p className="animal-page__warning">
          This animal needs to be fed soon!
        </p>
      )}
      <button
        className="animal-page__feed-button"
        onClick={feedAnimal}
        disabled={isFeedButtonDisabled} // Använd isFeedButtonDisabled direkt
      >
        {isFeedButtonDisabled ? "Cannot Feed Yet" : "Feed Animal"}{" "}
        {/* Använd isFeedButtonDisabled direkt */}
      </button>
    </section>
  );
};

export default AnimalPage;
