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
  const status = getAnimalFeedingStatus(
    // Store the whole status object
    animal.lastFed
  );

  return (
    <section className="animal-page">
      <div className="animal-page__image-column">
        <img
          className="animal-page__image"
          src={animal.imageUrl}
          alt={animal.name}
          onError={(e) => {
            e.currentTarget.src = "/placeholder.jpeg";
            e.currentTarget.alt = "Placeholder image";
          }}
        />
      </div>
      <div className="animal-page__details-column">
        <h1>{animal.name}</h1>
        <p className="animal-page__description">{animal.longDescription}</p>
        {/* Assuming lastFed should be formatted as previously, if not, this needs Date() constructor */}
        <div className="animal-page__last-fed">
          Last fed: {new Date(animal.lastFed).toLocaleString()}
        </div>
        {status.showThreeHourWarning && ( // This covers both 3-hour and implies 5-hour if logic is sequential in util
          <div className="animal-page__warning">
            {status.statusText || "This animal needs to be fed soon!"}{" "}
            {/* Use status.statusText if available, else fallback */}
          </div>
        )}
        <button
          className="animal-page__feed-button"
          onClick={feedAnimal} // Renamed from handleFeedAnimal to match existing function
          disabled={status.isFeedButtonDisabled}
        >
          {status.isFeedButtonDisabled
            ? "Cannot Feed Yet"
            : `Feed ${animal.name}`}
        </button>
      </div>
    </section>
  );
};

export default AnimalPage;
