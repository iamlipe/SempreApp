import { useNavigate } from "react-router-dom";
import { Proposal, useProposal } from "../../contexts/proposal";
import { useEffect, useState } from "react";

export function ProposalPayment() {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [canGo, setCanGo] = useState(false)
    const { data, handleData } = useProposal()

    const handlePayment = () => {
        handleData({ proposalNumber: '' })
        setCanGo(true)
    }

    useEffect(() => {
        if(canGo) {
            const fields: (keyof Proposal)[] = ['invoicing', 'invoicingStatus', 'system', 'formPayment', 'notesPaymentCondition'];
            const errorsResponse: Partial<Record<keyof Proposal, string>> = {};
        
            const allFieldsFilled = fields.every(field => {
                const isFilled = data[field] && data[field] !== '';
    
                if (!isFilled) {
                    errorsResponse[field] = `Preencha o campo ${field}`;
                }
    
                return isFilled;
            });
        
            if (allFieldsFilled) {
                navigate('/proposal/personal-specifications');
            } else {
                setErrors(errorsResponse);
                setCanGo(false);
            }
        }
    }, [data, canGo]);

    console.log(errors)

    return (
        <div>
            <h1>ProposalPayment</h1>
            <button type="button" onClick={handlePayment} >Proximo</button>
        </div>
    );
}