import { PropsWithChildren, createContext, useContext, useState } from "react"

export const fieldLabels: Record<keyof ProposalData, string> = {
    proposalNumber: 'Número da Proposta',
    customerReference: 'Referência do Cliente',
    company: 'Empresa',
    cnpj: 'CNPJ',
    requester: 'Solicitante',
    email: 'Email',
    phone: 'Telefone',
    invoicing: "Faturamento",
    invoicingStatus: "Estado de Faturamento",
    system: "Sistema",
    formPayment: "Forma de Pagamento",
    notesPaymentCondition: "Observações Condição de Pagamento",
    deliveryTimeAndSchedule: "Prazo de Entrega e Cronograma",
    shortTextItemFieldOne: "Texto Abreviado Campo do Item 1",
    featuresOfTheFirstBatteryBank: "Características do Primeiro Banco de Baterias",
    shortTextItemFieldTwo: "Texto Abreviado Campo do Item 2",
    featuresOfTheSecondBatteryBank: "Características do Segundo Banco de Baterias"
}

export interface ProposalData {
    proposalNumber: string;
    customerReference: string;
    company: string;
    cnpj: string;
    requester: string;
    email: string;
    phone: string;
    invoicing: string;
    invoicingStatus: string;
    system: string;
    formPayment: string;
    notesPaymentCondition: string
    deliveryTimeAndSchedule: string;
    shortTextItemFieldOne: string;
    featuresOfTheFirstBatteryBank: string;
    shortTextItemFieldTwo: string;
    featuresOfTheSecondBatteryBank: string;
}

interface ProposalProps {
    data: ProposalData
    handleData: (values: Partial<ProposalData>) => void;
}

const initialProposal = { 
    proposalNumber: '',
    customerReference: '',
    company: '',
    cnpj: '',
    requester: '',
    email: '',
    phone: '',
    invoicing: "",
    invoicingStatus: "",
    system: "",
    formPayment: "",
    notesPaymentCondition: "",
    deliveryTimeAndSchedule: "",
    shortTextItemFieldOne: "",
    featuresOfTheFirstBatteryBank: "",
    shortTextItemFieldTwo: "",
    featuresOfTheSecondBatteryBank: ""
}

export const ProposalContext = createContext<ProposalProps>(null)

export function ProposalProvider({ children }: PropsWithChildren) {
    const [data, setData] = useState<ProposalData>(initialProposal)

    function handleData(values: Partial<ProposalData>) {
        setData({ ...data, ...values })
    }

    return (
        <ProposalContext.Provider value={{ data, handleData }} >
            {children}
        </ProposalContext.Provider>
    )
}

export function useProposal() {
    const context = useContext(ProposalContext)

    if (!context) {
        throw new Error('something went wrong')
    }

    return context
}