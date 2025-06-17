import { RouterProvider } from "react-router";
import { router } from "../Router";

export const ZooApp = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
