import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./presentation/router";
import { ProposalProvider } from "./presentation/contexts/proposal";


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ProposalProvider>
            <RouterProvider router={router} />
        </ProposalProvider>
    </React.StrictMode>
);