import { useEffect, useState } from "react";
import { ProposalData, fieldLabels, useProposal } from "../../contexts/proposal";
import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/button";
import { Input } from "../../shared/input";

export function CostNinth() {
    const navigate = useNavigate()

    const [maoDeObraEngenharia, setMaoDeObraEngenharia] = useState('')
    const [maoDeObraMecanica, setMaoDeObraMecanica] = useState('')
    const [maoDeObraEletrica, setMaoDeObraEletrica] = useState('')
    const [maoDeObraOperacional, setMaoDeObraOperacional] = useState('')
    const [maoDeObraAdministracao, setMaoDeObraAdministracao] = useState('')

    const [errors, setErrors] = useState<Partial<Record<keyof ProposalData, string>>>({})
    const [canGo, setCanGo] = useState(false)

    const { data, handleData } = useProposal()

    const onSubmit = async () => {
        handleData({ maoDeObraEngenharia, maoDeObraMecanica, maoDeObraEletrica, maoDeObraOperacional, maoDeObraAdministracao })
        setCanGo(true)
    }

    useEffect(() => {
        setMaoDeObraEngenharia('10')
        setMaoDeObraMecanica('10')
        setMaoDeObraEletrica('10')
        setMaoDeObraOperacional('10')
        setMaoDeObraAdministracao('10')
    }, [])

    useEffect(() => {
        if(canGo) {
            const fields: (keyof ProposalData)[] = ['maoDeObraEngenharia', 'maoDeObraMecanica', 'maoDeObraEletrica', 'maoDeObraOperacional', 'maoDeObraAdministracao'];
            const errorsResponse: Partial<Record<keyof ProposalData, string>> = {};
        
            const allFieldsFilled = fields.every(field => {
                const isFilled = data[field] && data[field] !== '';
    
                if (!isFilled) {
                    errorsResponse[field] = `Preencha o Campo ${fieldLabels[field]}`;
                }
    
                return isFilled;
            });
        
            if (allFieldsFilled) {
                navigate('/cost/tenth');
                setCanGo(false)
            } else {
                setErrors(errorsResponse);
                setCanGo(false);
            }
        }
    }, [data, canGo]);

    console.log(errors)

    return (
        <div className="flex flex-col space-y-2">
            <p className="font-semibold text-slate-800 text-sm mb-4">15 - Mão de Obra</p>
            <Input label="M. O. -  Engenharia (média)" error={errors.maoDeObraMecanica} disabled placeholder="Digite aqui" type="text" defaultValue={maoDeObraEngenharia} />
            <Input label="M. O. -  Mecânica (média)" error={errors.maoDeObraMecanica} disabled placeholder="Digite aqui" type="text" defaultValue={maoDeObraMecanica} />
            <Input label="M. O. -  Elétrica (média)" error={errors.maoDeObraEletrica} disabled placeholder="Digite aqui" type="text" defaultValue={maoDeObraEletrica} />
            <Input label="M. O. -  Operacional (média)" error={errors.maoDeObraOperacional} disabled placeholder="Digite aqui" type="text" defaultValue={maoDeObraOperacional} />
            <Input label="M. O. -  Administração (média)" error={errors.maoDeObraAdministracao} disabled placeholder="Digite aqui" type="text" defaultValue={maoDeObraAdministracao} />


            <div className="flex flex-col">
                <Button className="mt-10" variant="default" type="button" onClick={onSubmit}>Próximo</Button>
            </div>
        </div>
    );
}