import { useContext } from "react";
import { Link } from "react-router";
import { AnimalContext } from "../context/AnimalContext";
import { getAnimalFeedingStatus } from "../utils/animalStatus"; // Importera den nya funktionen
import "./../styles/AnimalsPage.scss";

export const AnimalsPage = () => {
  const { animals } = useContext(AnimalContext); // Hämta djurdata från Context

  return (
    <section className="animals-page">
      <h1>Animals in the Zoo</h1>
      {!animals || animals.length === 0 ? (
        <p>Loading animals...</p>
      ) : (
        <ul className="animals-list">
          {animals.map((animal) => {
            // Använd den nya funktionen för att hämta statusColor och statusText
            const { statusColor, statusText } = getAnimalFeedingStatus(
              animal.lastFed
            );

            return (
              <li key={animal.id} className="animal-card">
                <Link
                  to={`/animals/${animal.id}`}
                  className="animal-card__link"
                >
                  <img
                    className="animal-card__image"
                    src={animal.imageUrl}
                    alt={animal.name}
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.jpeg";
                      e.currentTarget.alt = "Placeholder image";
                    }}
                  />
                  <div
                    className="animal-card__status-line"
                    style={{ backgroundColor: statusColor }} // Använd statusColor
                  >
                    {statusText} {/* Använd statusText */}
                  </div>
                  <div className="animal-card__info">
                    <h2>{animal.name}</h2>
                    <p>{animal.shortDescription}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default AnimalsPage;
