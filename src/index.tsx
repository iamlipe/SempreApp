import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/login";
import { Home } from "./pages/home";

const router = createHashRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/home",
        element: <Home />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
);