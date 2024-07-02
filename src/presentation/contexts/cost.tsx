import { PropsWithChildren, createContext, useContext, useState } from "react"

interface Cost {
    payment: string
}

interface CostProps {
    data: Cost,
    handleData: (values: Partial<Cost>) => void;
}

export const CostContext = createContext<CostProps>(null)

export function CostProvider({ children }: PropsWithChildren) {
    const [data, setData] = useState<Cost>({ payment: '' })

    function handleData(values: Partial<Cost>) {
        setData({ ...data, ...values })
    }

    return (
        <CostContext.Provider value={{ data, handleData }} >
            {children}
        </CostContext.Provider>
    )
}

export function useCost() {
    const context = useContext(CostContext)

    if (!context) {
        throw new Error('something went wrong')
    }

    return context
}