import { PropsWithChildren, createContext, useContext, useState } from "react"

interface Proposal {
    cnpj: string
}

interface ProposalProps {
    data: Proposal
    handleData: (values: Partial<Proposal>) => void;
}

export const ProposalContext = createContext<ProposalProps>(null)

export function ProposalProvider({ children }: PropsWithChildren) {
    const [data, setData] = useState<Proposal>({ cnpj: '' })

    function handleData(values: Partial<Proposal>) {
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