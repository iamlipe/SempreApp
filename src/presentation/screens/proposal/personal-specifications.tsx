import { useNavigate } from "react-router-dom";
import { ProposalData, useProposal } from "../../contexts/proposal";
import { useEffect, useState } from "react";
import { Input } from "../../shared/input";
import { Button } from "../../shared/button";
import { db } from "../../utils/database-client";

export function ProposalSpecifications() {
    const navigate = useNavigate()

    const [prazoDeEntregaECronograma, setPrazoDeEntregaECronograma] = useState('')
    const [campoItem1, setCampoItem1] = useState('')
    const [caracteristicasDoPrimeiroBancoDeBaterias, setCaracteristicasDoPrimeiroBancoDeBaterias] = useState('')
    const [campoItem2, setCampoItem2] = useState('')
    const [caracteristicasDoSegundoBancoDeBaterias, setCaracteristicasDoSegundoBancoDeBaterias] = useState('')

    const [errors, setErrors] = useState<Partial<Record<keyof ProposalData, string>>>({})
    const [canGo, setCanGo] = useState(false)
    
    const { id, data, handleData } = useProposal()
    
    const handleSpecifications = () => {
        handleData({ 
            prazo_de_entrega_e_cronograma: prazoDeEntregaECronograma, 
            campo_item_1: campoItem1, 
            caracteristicas_do_primeiro_banco_de_baterias: caracteristicasDoPrimeiroBancoDeBaterias, 
            campo_item_2: campoItem2, 
            caracteristicas_do_segundo_banco_de_baterias: caracteristicasDoSegundoBancoDeBaterias 
        })
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
    }
    
    const handleUpdateProposal = async () => {
        try {
            const resp = await db.updateProposal({...data, id})
        
            if (!resp.success) {
                alert(resp.message)
            } else {
                navigate('/home')
            }
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        setPrazoDeEntregaECronograma(data.prazo_de_entrega_e_cronograma)
        setCampoItem1(data.campo_item_1)
        setCaracteristicasDoPrimeiroBancoDeBaterias(data.caracteristicas_do_primeiro_banco_de_baterias)
        setCampoItem2(data.campo_item_2)
        setCaracteristicasDoSegundoBancoDeBaterias(data.caracteristicas_do_segundo_banco_de_baterias)
    }, [])

    useEffect(() => {
        if(canGo) {
            const fields: (keyof ProposalData)[] = [
                'prazo_de_entrega_e_cronograma', 
                'campo_item_1', 
                'caracteristicas_do_primeiro_banco_de_baterias', 
                'campo_item_2', 
                'caracteristicas_do_segundo_banco_de_baterias'
            ];
            const errorsResponse: Partial<Record<keyof ProposalData, string>> = {};
        
            const allFieldsFilled = fields.every(field => {
                const isFilled = data[field] && data[field] !== '';
    
                if (!isFilled) {
                    errorsResponse[field] = `Preencha o campo ${field}`;
                }
    
                return isFilled;
            });
        
            if (allFieldsFilled) {
                if (id) {
                    handleUpdateProposal()
                } else {
                    handleSaveProposal()
                }
                
                setCanGo(false)
            } else {
                setErrors(errorsResponse);
                setCanGo(false);
            }
        }
    }, [data, canGo]);

    return (
        <div className="flex flex-col space-y-2">
        <Input label="Prazo de Entrega e Cronograma" error={errors.prazo_de_entrega_e_cronograma} placeholder="Prazo de Entrega e Cronograma" type="text" onChange={(e) => setPrazoDeEntregaECronograma(e.target.value)} value={prazoDeEntregaECronograma} />
        <Input label="Texto Abreviado Campo do Item 1" error={errors.campo_item_1}  placeholder="Texto Abreviado Campo do Item 1" type="text" onChange={(e) => setCampoItem1(e.target.value)} value={campoItem1} />
        <Input label="Características do Primeiro Banco de Baterias" error={errors.caracteristicas_do_primeiro_banco_de_baterias} placeholder="Características do Primeiro Banco de Baterias" type="text" onChange={(e) => setCaracteristicasDoPrimeiroBancoDeBaterias(e.target.value)} value={caracteristicasDoPrimeiroBancoDeBaterias} />
        <Input label="Texto Abreviado Campo do Item 2" error={errors.campo_item_2} placeholder="Texto Abreviado Campo do Item 2" type="text" onChange={(e) => setCampoItem2(e.target.value)} value={campoItem2} />
        <Input label="Características do Segundo Banco de Baterias" error={errors.caracteristicas_do_segundo_banco_de_baterias} placeholder="Características do Segundo Banco de Baterias" type="text" onChange={(e) => setCaracteristicasDoSegundoBancoDeBaterias(e.target.value)} value={caracteristicasDoSegundoBancoDeBaterias} />

        <div className="flex flex-col">
            <Button className="mt-10" variant="default" type="button" onClick={handleSpecifications}>Próximo</Button>
        </div>
    </div>
    );
}