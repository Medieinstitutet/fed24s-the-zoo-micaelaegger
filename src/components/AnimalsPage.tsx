import React, { useContext } from "react";
import { Link } from "react-router";
import { AnimalContext } from "../context/AnimalContext";
import { useFetchAllAnimals } from "../hooks/useFetchAllAnimals";
import "./../styles/AnimalsPage.scss";

export const AnimalsPage = () => {
  const { animals } = useContext(AnimalContext); // Hämta djurdata från Context

  // Funktion för att beräkna status baserat på tiden sedan djuret senast matades
  const getStatus = (lastFed: string): { color: string; text: string } => {
    const now = new Date();
    const lastFedTime = new Date(lastFed);
    const hoursSinceFed =
      (now.getTime() - lastFedTime.getTime()) / (1000 * 60 * 60);

    if (hoursSinceFed < 3) return { color: "green", text: "Mätt" };
    if (hoursSinceFed < 5) return { color: "orange", text: "Hungrig" };
    return { color: "red", text: "Desperat behov av mat" };
  };

  return (
    <section className="animals-page">
      <h1>Animals in the Zoo</h1>
      <ul className="animals-list">
        {animals.map((animal) => {
          const { color, text } = getStatus(animal.lastFed);

          return (
            <li key={animal.id} className="animal-card">
              <Link to={`/animals/${animal.id}`} className="animal-card__link">
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
                  style={{ backgroundColor: color }}
                >
                  {text}
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
    </section>
  );
};

export default AnimalsPage;
