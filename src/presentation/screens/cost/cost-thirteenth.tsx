import { useEffect, useState } from "react";
import { ProposalData, fieldLabels, useProposal } from "../../contexts/proposal";
import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/button";
import { Input } from "../../shared/input";
import { db } from "../../utils/database-client";

export function CostThirteenth() {
    const navigate = useNavigate()

    const [valorSemImpostos, setValorSemImpostos] = useState('')
    const [irpj, setIrpj] = useState('')
    const [cofins, setCofins] = useState('')
    const [pis, setPis] = useState('')
    const [csll, setCsll] = useState('')
    const [icms, setIcms] = useState('')
    const [ipi, setIpi] = useState('')
    const [valorComPisCofins, setValorComPisCofins] = useState('')
    const [valorComIcms, setValorComIcms] = useState('')
    const [valorUnitarioComTodosOsImpostos, setValorUnitarioComTodosOsImpostos] = useState('')

    const [errors, setErrors] = useState<Partial<Record<keyof ProposalData, string>>>({})
    const [canGo, setCanGo] = useState(false)

    const { id, data, handleData } = useProposal()

    const onSubmit = async () => {
        handleData({ valorSemImpostos, irpj, cofins, pis, csll, icms, ipi, valorComPisCofins, valorComIcms, valorUnitarioComTodosOsImpostos })
        setCanGo(true)
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
        setValorSemImpostos('10')
        setIrpj('10')
        setCofins('10')
        setPis('10')
        setCsll('10')
        setIcms('10')
        setIpi('10')
        setValorComPisCofins('10')
        setValorComIcms('10')
        setValorUnitarioComTodosOsImpostos('10')
    }, [])

    useEffect(() => {
        if(canGo) {
            const fields: (keyof ProposalData)[] = ['valorSemImpostos', 'irpj', 'cofins', 'pis', 'csll', 'icms', 'valorComPisCofins', 'valorComIcms', 'valorUnitarioComTodosOsImpostos'];
            const errorsResponse: Partial<Record<keyof ProposalData, string>> = {};
        
            const allFieldsFilled = fields.every(field => {
                const isFilled = data[field] && data[field] !== '';
    
                if (!isFilled) {
                    errorsResponse[field] = `Preencha o Campo ${fieldLabels[field]}`;
                }
    
                return isFilled;
            });
        
            if (allFieldsFilled) {
                handleUpdateProposal()
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
            <Input label="Valor sem Impostos (R$)" error={errors.valorSemImpostos} placeholder="Digite aqui" type="text" defaultValue={valorSemImpostos} />
            <Input label="COFINS (3%)" error={errors.cofins} placeholder="Digite aqui" type="text" defaultValue={cofins} />
            <Input label="PIS (0,65%)" error={errors.pis} placeholder="Digite aqui" type="text" defaultValue={pis} />
            <Input label="CSLL (1,08%)" error={errors.csll} placeholder="Digite aqui" type="text" defaultValue={csll} />
            <Input label="ICMS" error={errors.icms} placeholder="Digite aqui" type="text" defaultValue={icms} />
            <Input label="IPI" error={errors.ipi} placeholder="Digite aqui" type="text" defaultValue={ipi} />
            <Input label="Valor com PIS/COFINS" error={errors.valorComPisCofins} placeholder="Digite aqui" type="text" defaultValue={valorComPisCofins} />
            <Input label="Valor com ICMS" error={errors.valorComIcms} placeholder="Digite aqui" type="text" defaultValue={valorComIcms} />
            <Input label="Valor Unitário com todos os Impostos" error={errors.valorUnitarioComTodosOsImpostos} placeholder="Digite aqui" type="text" defaultValue={valorUnitarioComTodosOsImpostos} />

            <div className="flex flex-col space-y-2">
                <Button className="mt-10" variant="outline" type="button" onClick={() => navigate('/document')}>Gerar PDF</Button>
                <Button variant="default" type="button" onClick={onSubmit}>Finalizar</Button>
            </div>
        </div>
    );
}
    