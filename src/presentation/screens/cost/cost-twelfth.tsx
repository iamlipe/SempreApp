import { useEffect, useState } from "react";
import { ProposalData, fieldLabels, useProposal } from "../../contexts/proposal";
import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/button";
import { Input } from "../../shared/input";

export function CostTwelfth() {
    const navigate = useNavigate()

    const [outrosOpcionais, setOutrosOpcionais] = useState('')
    const [outrosOpcionaisValor, setOutrosOpcionaisValor] = useState('')
    const [bateriaUmValor, setBateriaUmValor] = useState('')

    const [errors, setErrors] = useState<Partial<Record<keyof ProposalData, string>>>({})
    const [canGo, setCanGo] = useState(false)

    const { data, handleData } = useProposal()

    const onSubmit = async () => {
        handleData({ outrosOpcionais, outrosOpcionaisValor, bateriaUmValor })
        setCanGo(true)
    }

    useEffect(() => {
        setOutrosOpcionais(data.outrosOpcionais)
        setOutrosOpcionaisValor(data.outrosOpcionaisValor)
        setBateriaUmValor(data.bateriaUmValor)
    }, [])

    useEffect(() => {
        if(canGo) {
            const fields: (keyof ProposalData)[] = [];

            if (outrosOpcionais && outrosOpcionais !== "") {
                fields.push('outrosOpcionais')
                fields.push('outrosOpcionaisValor') 
                fields.push('bateriaUmValor') 
            } else {
                fields.push('bateriaUmValor') 
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

            <Input label="Outros opcionais" error={errors.outrosOpcionais} placeholder="Digite..." type="text" onChange={(e) => setOutrosOpcionais(e.target.value)} value={outrosOpcionais} />
            <Input label="Valor (R$)" error={errors.outrosOpcionaisValor} placeholder="Digite..." type="text" onChange={(e) => setOutrosOpcionaisValor(e.target.value)} value={outrosOpcionaisValor} />
            <Input label="Insira o Valor s/IPI (R$)" error={errors.bateriaUmValor} placeholder="Digite..." type="text" onChange={(e) => setBateriaUmValor(e.target.value)} value={bateriaUmValor} />

            <div className="flex flex-col">
                <Button className="mt-10" variant="default" type="button" onClick={onSubmit}>Próximo</Button>
            </div>
        </div>
    );
}