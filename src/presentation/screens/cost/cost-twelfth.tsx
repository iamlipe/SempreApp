import { useEffect, useState } from "react";
import { ProposalData, fieldLabels, useProposal } from "../../contexts/proposal";
import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/button";
import { Input } from "../../shared/input";

export function CostTwelfth() {
    const navigate = useNavigate()

    const [outrosOpcionais, setOutrosOpcionais] = useState('')
    const [outrosOpcionaisValor, setOutrosOpcionaisValor] = useState('')
    const [valorBateria1, setValorBateria1] = useState('')

    const [errors, setErrors] = useState<Partial<Record<keyof ProposalData, string>>>({})
    const [canGo, setCanGo] = useState(false)

    const { data, handleData } = useProposal()

    const onSubmit = async () => {
        handleData({ 
            outros_opcionais: outrosOpcionais, 
            outros_opcionais_valor: outrosOpcionaisValor, 
            valor_bateria_1: valorBateria1 
        })
        setCanGo(true)
    }

    useEffect(() => {
        setOutrosOpcionais(data.outros_opcionais)
        setOutrosOpcionaisValor(data.outros_opcionais_valor)
        setValorBateria1(data.valor_bateria_1)
    }, [])

    useEffect(() => {
        if(canGo) {
            const fields: (keyof ProposalData)[] = [];

            if (outrosOpcionais && outrosOpcionais !== "") {
                fields.push('outros_opcionais')
                fields.push('outros_opcionais_valor') 
                fields.push('valor_bateria_1') 
            } else {
                fields.push('valor_bateria_1') 
            }

            console.log(fields)

            const errorsResponse: Partial<Record<keyof ProposalData, string>> = {};
        
            const allFieldsFilled = fields.every(field => {
                const isFilled = data[field] && data[field] !== '';
    
                if (!isFilled) {
                    errorsResponse[field] = `Preencha o Campo ${fieldLabels[field]}`;
                }
    
                return isFilled;
            });
        
            if (allFieldsFilled) {
                navigate('/cost/thirteenth');
                setCanGo(false)
            } else {
                setErrors(errorsResponse);
                setCanGo(false);
            }
        }
    }, [data, canGo]);

    return (
        <div className="flex flex-col space-y-2">
            <p className="font-semibold text-slate-800 text-sm mb-4">18 - Outros Itens Especiais</p>

            <Input label="Outros opcionais" error={errors.outros_opcionais} placeholder="Digite..." type="text" onChange={(e) => setOutrosOpcionais(e.target.value)} value={outrosOpcionais} />
            <Input label="Valor (R$)" error={errors.outros_opcionais_valor} placeholder="Digite..." type="text" onChange={(e) => setOutrosOpcionaisValor(e.target.value)} value={outrosOpcionaisValor} />
            <Input label="Insira o Valor s/IPI (R$)" error={errors.valor_bateria_1} placeholder="Digite..." type="text" onChange={(e) => setValorBateria1(e.target.value)} value={valorBateria1} />

            <div className="flex flex-col">
                <Button className="mt-10" variant="default" type="button" onClick={onSubmit}>Próximo</Button>
            </div>
        </div>
    );
}