import { Outlet, useLocation } from "react-router";
import { AnimalContext } from "../context/AnimalContext";
import { useReducer } from "react";
import { AnimalReducer } from "../reducer/AnimalReducer";
import "./../styles/Layout.scss";
import { useFetchAllAnimals } from "../hooks/useFetchAllAnimals";

export const Layout = () => {
  // Reducer för att hantera djurens state
  const [animals, dispatch] = useReducer(AnimalReducer, []);

  // Hämta alla djur när Layout-komponenten monteras
  useFetchAllAnimals(dispatch); // Pass dispatch to the hook

  const location = useLocation(); // Hämta den aktuella sidans path
  const isHomePage = location.pathname === "/"; // Kontrollera om vi är på HomePage

  return (
    <div className={`layout ${isHomePage ? "layout--homepage" : ""}`}>
      <header className="layout__header">
        <h1>ZooAPP</h1>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/animals">Animals</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Placera Context Provider runt main */}
      <AnimalContext.Provider value={{ animals, dispatch }}>
        <main className="layout__main">
          <Outlet />
        </main>
      </AnimalContext.Provider>

      <footer className="layout__footer">
        <p>Created by Micaela</p>
      </footer>
    </div>
  );
};
