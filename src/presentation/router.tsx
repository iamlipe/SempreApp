import { createHashRouter } from "react-router-dom";
import { MyDocument } from "./screens/document";
import { Home } from "./screens/home";
import { Login } from "./screens/login";
import { ProposalPersonData } from "./screens/proposal/personal-person-data";
import { ProposalPayment } from "./screens/proposal/proposal-payment";
import { ProposalRoot } from "./screens/proposal/proposal-root";
import { ProposalSpecifications } from "./screens/proposal/personal-specifications";
import { CostRoot } from "./screens/cost/cost-root";
import { CostAccessoriesAndOptions } from "./screens/cost/cost-accessories-and-options";
import { CostAlernatingCurrentInputCharacteristics } from "./screens/cost/cost-alternating-current-input-characteristics";
import { CostBasicCharacteristics } from "./screens/cost/cost-basic-characteristics";
import { CostBatteryProtection } from "./screens/cost/cost-battery-protection";
import { CostConstructiveCharacteristics } from "./screens/cost/cost-constructive-characteristics";
import { CostConsumerCharacteristics } from "./screens/cost/cost-consumer-characteristics";
import { CostConsumerProtection } from "./screens/cost/cost-consumer-protection";
import { CostDistortionAndTrigger } from "./screens/cost/cost-distortion-and-trigger";
import { CostFrontPanelManualControl } from "./screens/cost/cost-front-panel-manual-control";
import { CostGeneralAlernatingCurrentInputProtection } from "./screens/cost/cost-general-alternating-current-input-protection";
import { CostOtherProtection } from "./screens/cost/cost-other-protections";
import { CostVoltmeterAndTransducers } from "./screens/cost/cost-voltmeter-and-transducers";
import { CostWiringBusbarAndIdentification } from "./screens/cost/cost-wiring-busbar-and-identification";
import { CostBatteryBankCharacteristics } from "./screens/cost/cost-battery-bank-characteristics";

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
        path: "/cost/:id",
        element: <CostRoot />,
        children: [
            {
                path: 'cost-accessories-and-options',
                element: <CostAccessoriesAndOptions />
            },
            {
                path: 'cost-alternating-current-input-characteristics',
                element: <CostAlernatingCurrentInputCharacteristics />
            },
            {
                path: 'cost-basic-characteristics',
                element: <CostBasicCharacteristics />
            },
            {
                path: 'cost-battery-protection',
                element: <CostBatteryProtection />
            },
            {
                path: 'cost-constructive-characteristics',
                element: <CostConstructiveCharacteristics />
            },
            {
                path: 'cost-consumer-characteristics',
                element: <CostConsumerCharacteristics />
            },
            {
                path: 'cost-consumer-protection',
                element: <CostConsumerProtection />
            },
            {
                path: 'cost-distortion-and-trigger',
                element: <CostDistortionAndTrigger />
            },
            {
                path: 'cost-front-panel-manual-control',
                element: <CostFrontPanelManualControl />
            },
            {
                path: 'cost-general-alternating-current-input-protection',
                element: <CostGeneralAlernatingCurrentInputProtection />
            },
            {
                path: 'cost-other-protections',
                element: <CostOtherProtection />
            },
            {
                path: 'cost-voltmeter-and-transducers',
                element: <CostVoltmeterAndTransducers />
            },
            {
                path: 'cost-wiring-busbar-and-identification',
                element: <CostWiringBusbarAndIdentification />
            },
            {
                path: 'cost-battery-bank-characteristics',
                element: <CostBatteryBankCharacteristics />
            },
        ]
    },
]);