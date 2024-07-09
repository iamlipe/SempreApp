import { useNavigate } from "react-router-dom";
import { ProposalData, fieldLabels, useProposal } from "../../contexts/proposal";
import { useEffect, useState } from "react";
import { Input } from "../../shared/input";
import { Button } from "../../shared/button";
import { Select } from "../../shared/select";

export function ProposalPayment() {
    const navigate = useNavigate()

    const [faturamento, setFaturamento] = useState('')
    const [estadoDeFaturamento, setEstadoDeFaturamento] = useState('')
    const [sistema, setSistema] = useState('')
    const [formaDePagamento, setFormaDePagamento] = useState('')
    const [condicaoDePagamento, setCondicaoDePagamento] = useState('')

    const [errors, setErrors] = useState<Partial<Record<keyof ProposalData, string>>>({})
    const [canGo, setCanGo] = useState(false)
    
    const { data, handleData } = useProposal()

    const handlePayment = () => {
        handleData({  
            faturamento: faturamento, 
            estado_de_faturamento: estadoDeFaturamento, 
            sistema: sistema, 
            forma_de_pagamento: formaDePagamento, 
            condicao_de_pagamento: condicaoDePagamento 
        })
        setCanGo(true)
    }

    useEffect(() => {
        setFaturamento(data.faturamento)
        setEstadoDeFaturamento(data.estado_de_faturamento)
        setSistema(data.sistema)
        setFormaDePagamento(data.forma_de_pagamento)
        setCondicaoDePagamento(data.condicao_de_pagamento)
    }, [])

    useEffect(() => {
        if(canGo) {
            const fields: (keyof ProposalData)[] = [
                'faturamento', 
                'estado_de_faturamento', 
                'sistema', 
                'forma_de_pagamento'
            ];

            const errorsResponse: Partial<Record<keyof ProposalData, string>> = {};
            let notesPaymentConditionIsFilled = true

            const allFieldsFilled = fields.every(field => {
                const isFilled = data[field] && data[field] !== '';
    
                if (!isFilled) {
                    errorsResponse[field] = `Preencha o Campo ${fieldLabels[field]}`;
                }
    
                return isFilled;
            });

            if (formaDePagamento === "OUTROS") {
                const isFilled = data.condicao_de_pagamento && data.condicao_de_pagamento !== '';

                if (!isFilled) {
                    notesPaymentConditionIsFilled = false
                    errorsResponse.condicao_de_pagamento = `Preencha o Campo ${fieldLabels.condicao_de_pagamento}`;
                }
            }
        
            if (allFieldsFilled && notesPaymentConditionIsFilled) {
                navigate('/proposal/specifications');
                setCanGo(false)
            } else {
                setErrors(errorsResponse);
                setCanGo(false);
            }
        }
    }, [data, canGo]);

    return (
        <div className="flex flex-col space-y-2">
            <Select label="Faturamento" error={errors.faturamento} onChange={(e) => setFaturamento(e.target.value)} value={faturamento}>
                <option value="">Selecione...</option>
                <option value="Revenda" selected={faturamento === "Revenda"}>Revenda</option>
                <option value="Exportação" selected={faturamento === "Exportação"}>Exportação</option>
                <option value="Industrialização" selected={faturamento === "Industrialização"}>Industrialização</option>
            </Select>

            <Select label="Estado de Faturamento" error={errors.estado_de_faturamento} onChange={(e) => setEstadoDeFaturamento(e.target.value)} value={estadoDeFaturamento}>
                <option value="">Selecione...</option>
                <option value="Revenda" selected={estadoDeFaturamento === "Revenda"}>Revenda</option>
                <option value="Exportação" selected={estadoDeFaturamento === "Exportação"}>Exportação</option>
            </Select>

            <Select label="Sistema" error={errors.sistema} onChange={(e) => setSistema(e.target.value)} value={sistema}>
                <option value="">Selecione...</option>
                <option value="Revenda" selected={sistema === "Revenda"}>Revenda</option>
                <option value="Exportação" selected={sistema === "Exportação"}>Exportação</option>
                <option value="Industrialização" selected={sistema === "Industrialização"}>Industrialização</option>
            </Select>

            <Select label="Forma de Pagamento" error={errors.forma_de_pagamento} onChange={(e) => setFormaDePagamento(e.target.value)} value={formaDePagamento}>
                <option value="">Selecione...</option>
                <option value="100%, 15DDL%" selected={formaDePagamento === "100%, 15DDL%"}>100%, 15DDL%</option>
                <option value="100% 28DDL" selected={formaDePagamento === "100% 28DDL"}>100% 28DDL</option>
                <option value="100% 30DDL" selected={formaDePagamento === "100% 30DDL"}>100% 30DDL</option>
                <option value="100% 45DDL" selected={formaDePagamento === "100% 45DDL"}>100% 45DDL</option>
                <option value="100% 60DDL" selected={formaDePagamento === "100% 60DDL"}>100% 60DDL</option>
                <option value="50% ANTECIPADO + 50% 30DDL" selected={formaDePagamento === "50% ANTECIPADO + 50% 30DDL"}>50% ANTECIPADO + 50% 30DDL</option>
                <option value="30% NO PEDIDO + 70%30DDL" selected={formaDePagamento === "30% NO PEDIDO + 70%30DDL"}>30% NO PEDIDO + 70%30DDL</option>
                <option value="OUTROS" selected={formaDePagamento === "OUTROS"}>OUTROS</option>
            </Select>

            { formaDePagamento === "OUTROS" ? 
                    <Input label="Observações Condição de Pagamento" error={errors.condicao_de_pagamento} placeholder="Observações Condição de Pagamento" type="text" onChange={(e) => setCondicaoDePagamento(e.target.value)} value={condicaoDePagamento} /> 
                : null 
            }
        
            <div className="flex flex-col">
                <Button className="mt-10" variant="default" type="button" onClick={handlePayment}>Próximo</Button>
            </div>
        </div>
    );
}