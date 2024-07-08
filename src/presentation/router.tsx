import { createHashRouter } from "react-router-dom";
import { MyDocument } from "./screens/documents/proposal-pdf";
import { Home } from "./screens/home";
import { Login } from "./screens/login";
import { ProposalPersonData } from "./screens/proposal/personal-person-data";
import { ProposalPayment } from "./screens/proposal/proposal-payment";
import { ProposalRoot } from "./screens/proposal/proposal-root";
import { ProposalSpecifications } from "./screens/proposal/personal-specifications";
import { CostRoot } from "./screens/cost/cost-root";
import { CostFirst } from "./screens/cost/cost-first";
import { CostThird } from "./screens/cost/cost-third";
import { CostFourth } from "./screens/cost/cost-fourth";
import { CostSixth } from "./screens/cost/cost-sixth";
import { CostSeventh } from "./screens/cost/cost-seventh";
import { CostEight } from "./screens/cost/cost-eighth";
import { CostNinth } from "./screens/cost/cost-ninth";
import { CostSecond } from "./screens/cost/cost-second";
import { CostTenth } from "./screens/cost/cost-tenth";
import { CostEleventh } from "./screens/cost/cost-eleventh";
import { CostTwelfth } from "./screens/cost/cost-twelfth";
import { CostThirteenth } from "./screens/cost/cost-thirteenth";
import { CostFifth } from "./screens/cost/cost-fifth";

export const router = createHashRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/document",
        element: <MyDocument />,
    },

    {
        path: "/proposal",
        element: <ProposalRoot />,
        children: [
            {
                path: 'person-data',
                element: <ProposalPersonData />
            },
            {
                path: 'payment',
                element: <ProposalPayment />
            },
            {
                path: 'specifications',
                element: <ProposalSpecifications />
            },
        ]
    },

    {
        path: "/cost",
        element: <CostRoot />,
        children: [
            {
                path: 'first',
                element: <CostFirst />
            },
            {
                path: 'second',
                element: <CostSecond />
            },
            {
                path: 'third',
                element: <CostThird />
            },
            {
                path: 'fourth',
                element: <CostFourth />
            },
            {
                path: 'fifth',
                element: <CostFifth />
            },
            {
                path: 'sixth',
                element: <CostSixth />
            },
            {
                path: 'seventh',
                element: <CostSeventh />
            },
            {
                path: 'eighth',
                element: <CostEight />
            },
            {
                path: 'ninth',
                element: <CostNinth />
            },
            {
                path: 'tenth',
                element: <CostTenth />
            },
            {
                path: 'eleventh',
                element: <CostEleventh />
            },
            {
                path: 'twelfth',
                element: <CostTwelfth />
            },
            {
                path: 'thirteenth',
                element: <CostThirteenth />
            },
        ]
    },
]);