import { useNavigate } from "react-router-dom";
import { Proposal, useProposal } from "../../contexts/proposal";
import { useEffect, useState } from "react";

export function ProposalSpecifications() {
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [canGo, setCanGo] = useState(false)
    const { data, handleData } = useProposal()
    

    const handleSpecifications = () => {
        handleData({ proposalNumber: '' })
        setCanGo(true)
    }

    useEffect(() => {
        if(canGo) {
            const fields: (keyof Proposal)[] = ['deliveryTimeAndSchedule', 'shortTextItemFieldOne', 'featuresOfTheFirstBatteryBank', 'shortTextItemFieldTwo', 'featuresOfTheSecondBatteryBank'];
            const errorsResponse: Partial<Record<keyof Proposal, string>> = {};
        
            const allFieldsFilled = fields.every(field => {
                const isFilled = data[field] && data[field] !== '';
    
                if (!isFilled) {
                    errorsResponse[field] = `Preencha o campo ${field}`;
                }
    
                return isFilled;
            });
        
            if (allFieldsFilled && canGo) {
                navigate('/home');
            } else {
                setErrors(errorsResponse);
                setCanGo(false);
            }
        }
    }, [data, canGo]);

    console.log(errors)

    return (
        <div>
            <h1>ProposalSpecifications</h1>
            <button type="button" onClick={handleSpecifications} >Terminar</button>
        </div>
    );
}