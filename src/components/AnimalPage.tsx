import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { AnimalContext } from "../context/AnimalContext";
import { AnimalActionTypes } from "../reducer/AnimalReducer";
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

  // Kontrollera om knappen ska vara inaktiverad
  const isFeedButtonDisabled = (): boolean => {
    if (!animal) return true;
    const now = new Date();
    const lastFedTime = new Date(animal.lastFed);
    const hoursSinceFed =
      (now.getTime() - lastFedTime.getTime()) / (1000 * 60 * 60);
    return hoursSinceFed < 4; // Knappen är inaktiverad om djuret matades för mindre än 4 timmar sedan
  };

  // Visa en varning om djuret snart behöver matas
  const showFeedingWarning = (): boolean => {
    if (!animal) return false;
    const now = new Date();
    const lastFedTime = new Date(animal.lastFed);
    const hoursSinceFed =
      (now.getTime() - lastFedTime.getTime()) / (1000 * 60 * 60);
    return hoursSinceFed >= 3 && hoursSinceFed < 4; // Varning om det gått mellan 3 och 4 timmar
  };

  if (!animal) {
    return <p>Loading...</p>; // Visa laddning medan djuret hämtas
  }

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
      {showFeedingWarning() && (
        <p className="animal-page__warning">
          This animal needs to be fed soon!
        </p>
      )}
      <button
        className="animal-page__feed-button"
        onClick={feedAnimal}
        disabled={isFeedButtonDisabled()}
      >
        {isFeedButtonDisabled() ? "Cannot Feed Yet" : "Feed Animal"}
      </button>
    </section>
  );
};

export default AnimalPage;
