import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import HomePage from "./components/HomePage";
import AnimalsPage from "./components/AnimalsPage";
import AnimalPage from "./components/AnimalPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/animals",
        element: <AnimalsPage />,
        //Bör man ha en loader här?
      },
      {
        path: "animals/:id",
        element: <AnimalPage />,
        //Bör man ha en loader här?
      },
    ],
  },
]);
