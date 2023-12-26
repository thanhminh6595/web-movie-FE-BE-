import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Browse from "./pages/browse/Browse";
import Search from "./pages/search/Search";
import ErrorPage from "./pages/page/ErrorPage";
import NavBarPage from "./pages/page/NavBarPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBarPage />,
      errorElement: <ErrorPage />,
      children: [
        { path: "", element: <Browse /> },
        { path: "search", element: <Search /> },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
