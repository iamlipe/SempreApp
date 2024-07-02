import { useNavigate } from "react-router-dom";
import { ProposalData, useProposal } from "../../contexts/proposal";
import { useEffect, useState } from "react";
import { Input } from "../../shared/input";
import { Button } from "../../shared/button";
import { db } from "../../utils/database-client";

export function ProposalSpecifications() {
    const navigate = useNavigate()

    const [deliveryTimeAndSchedule, setDeliveryTimeAndSchedule] = useState('')
    const [shortTextItemFieldOne, setShortTextItemFieldOne] = useState('')
    const [featuresOfTheFirstBatteryBank, setFeaturesOfTheFirstBatteryBank] = useState('')
    const [shortTextItemFieldTwo, setShortTextItemFieldTwo] = useState('')
    const [featuresOfTheSecondBatteryBank, setFeaturesOfTheSecondBatteryBank] = useState('')
    const [errors, setErrors] = useState<Partial<Record<keyof ProposalData, string>>>({})
    const [canGo, setCanGo] = useState(false)
    
    const { data, handleData } = useProposal()
    
    const handleSpecifications = () => {
        handleData({ deliveryTimeAndSchedule, shortTextItemFieldOne, featuresOfTheFirstBatteryBank, shortTextItemFieldTwo, featuresOfTheSecondBatteryBank })
        setCanGo(true)
    }

    const handleSaveProposal = async () => {
        try {
            const resp = await db.saveProposal({...data, createdAt: new Date().toISOString()})
        
            if (!resp.success) {
                alert(resp.message)
            } else {
                navigate('/home')
            }
        } catch (error) {
            alert(error)
        }


        
        console.log()

    }

    useEffect(() => {
        if(canGo) {
            const fields: (keyof ProposalData)[] = ['deliveryTimeAndSchedule', 'shortTextItemFieldOne', 'featuresOfTheFirstBatteryBank', 'shortTextItemFieldTwo', 'featuresOfTheSecondBatteryBank'];
            const errorsResponse: Partial<Record<keyof ProposalData, string>> = {};
        
            const allFieldsFilled = fields.every(field => {
                const isFilled = data[field] && data[field] !== '';
    
                if (!isFilled) {
                    errorsResponse[field] = `Preencha o campo ${field}`;
                }
    
                return isFilled;
            });
        
            if (allFieldsFilled) {
                handleSaveProposal()
                setCanGo(false)
            } else {
                setErrors(errorsResponse);
                setCanGo(false);
            }
        }
    }, [data, canGo]);

    return (
        <div className="flex flex-col space-y-2">
        <Input label="Prazo de Entrega e Cronograma" error={errors.deliveryTimeAndSchedule} placeholder="Prazo de Entrega e Cronograma" type="text" onChange={(e) => setDeliveryTimeAndSchedule(e.target.value)} value={deliveryTimeAndSchedule} />
        <Input label="Texto Abreviado Campo do Item 1" error={errors.shortTextItemFieldOne}  placeholder="Texto Abreviado Campo do Item 1" type="text" onChange={(e) => setShortTextItemFieldOne(e.target.value)} value={shortTextItemFieldOne} />
        <Input label="Características do Primeiro Banco de Baterias" error={errors.featuresOfTheFirstBatteryBank} placeholder="Características do Primeiro Banco de Baterias" type="text" onChange={(e) => setFeaturesOfTheFirstBatteryBank(e.target.value)} value={featuresOfTheFirstBatteryBank} />
        <Input label="Texto Abreviado Campo do Item 2" error={errors.shortTextItemFieldTwo} placeholder="Texto Abreviado Campo do Item 2" type="text" onChange={(e) => setShortTextItemFieldTwo(e.target.value)} value={shortTextItemFieldTwo} />
        <Input label="Características do Segundo Banco de Baterias" error={errors.featuresOfTheSecondBatteryBank} placeholder="Características do Segundo Banco de Baterias" type="text" onChange={(e) => setFeaturesOfTheSecondBatteryBank(e.target.value)} value={featuresOfTheSecondBatteryBank} />

        <div className="flex flex-col">
            <Button className="mt-10" variant="default" type="button" onClick={handleSpecifications}>Próximo</Button>
        </div>
    </div>
    );
}