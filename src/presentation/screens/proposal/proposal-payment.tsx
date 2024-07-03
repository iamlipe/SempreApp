import { useNavigate } from "react-router-dom";
import { ProposalData, fieldLabels, useProposal } from "../../contexts/proposal";
import { useEffect, useState } from "react";
import { Input } from "../../shared/input";
import { Button } from "../../shared/button";
import { Select } from "../../shared/select";

export function ProposalPayment() {
    const navigate = useNavigate()

    const [invoicing, setInvoicing] = useState('')
    const [invoicingStatus, setInvoicingStatus] = useState('')
    const [system, setSystem] = useState('')
    const [formPayment, setFormPayment] = useState('')
    const [notesPaymentCondition, setNotesPaymentCondition] = useState('')
    const [errors, setErrors] = useState<Partial<Record<keyof ProposalData, string>>>({})
    const [canGo, setCanGo] = useState(false)
    
    const { data, handleData } = useProposal()

    const handlePayment = () => {
        handleData({ invoicing, invoicingStatus, system, formPayment, notesPaymentCondition })
        setCanGo(true)
    }

    useEffect(() => {
        setInvoicing(data.invoicing)
        setInvoicingStatus(data.invoicingStatus)
        setSystem(data.system)
        setNotesPaymentCondition(data.notesPaymentCondition)
        setFormPayment(data.formPayment)
    }, [])

    useEffect(() => {
        if(canGo) {
            const fields: (keyof ProposalData)[] = ['invoicing', 'invoicingStatus', 'system', 'formPayment'];
            const errorsResponse: Partial<Record<keyof ProposalData, string>> = {};
            let notesPaymentConditionIsFilled = true

            const allFieldsFilled = fields.every(field => {
                const isFilled = data[field] && data[field] !== '';
    
                if (!isFilled) {
                    errorsResponse[field] = `Preencha o Campo ${fieldLabels[field]}`;
                }
    
                return isFilled;
            });

            if (formPayment === "OUTROS") {
                const isFilled = data.notesPaymentCondition && data.notesPaymentCondition !== '';

                if (!isFilled) {
                    notesPaymentConditionIsFilled = false
                    errorsResponse.notesPaymentCondition = `Preencha o Campo ${fieldLabels.notesPaymentCondition}`;
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
            <Select label="Faturamento" error={errors.invoicing} onChange={(e) => setInvoicing(e.target.value)} value={invoicing}>
                <option value="">Selecione...</option>
                <option value="Revenda" selected={invoicing === "Revenda"}>Revenda</option>
                <option value="Exportação" selected={invoicing === "Exportação"}>Exportação</option>
                <option value="Industrialização" selected={invoicing === "Industrialização"}>Industrialização</option>
            </Select>

            <Select label="Estado de Faturamento" error={errors.invoicingStatus} onChange={(e) => setInvoicingStatus(e.target.value)} value={invoicingStatus}>
                <option value="">Selecione...</option>
                <option value="Revenda" selected={invoicingStatus === "Revenda"}>Revenda</option>
                <option value="Exportação" selected={invoicingStatus === "Exportação"}>Exportação</option>
            </Select>

            <Select label="Sistema" error={errors.system} onChange={(e) => setSystem(e.target.value)} value={system}>
                <option value="">Selecione...</option>
                <option value="Revenda" selected={system === "Revenda"}>Revenda</option>
                <option value="Exportação" selected={system === "Exportação"}>Exportação</option>
                <option value="Industrialização" selected={system === "Industrialização"}>Industrialização</option>
            </Select>

            <Select label="Forma de Pagamento" error={errors.formPayment} onChange={(e) => setFormPayment(e.target.value)} value={formPayment}>
                <option value="">Selecione...</option>
                <option value="100%, 15DDL%" selected={formPayment === "100%, 15DDL%"}>100%, 15DDL%</option>
                <option value="100% 28DDL" selected={formPayment === "100% 28DDL"}>100% 28DDL</option>
                <option value="100% 30DDL" selected={formPayment === "100% 30DDL"}>100% 30DDL</option>
                <option value="100% 45DDL" selected={formPayment === "100% 45DDL"}>100% 45DDL</option>
                <option value="100% 60DDL" selected={formPayment === "100% 60DDL"}>100% 60DDL</option>
                <option value="50% ANTECIPADO + 50% 30DDL" selected={formPayment === "50% ANTECIPADO + 50% 30DDL"}>50% ANTECIPADO + 50% 30DDL</option>
                <option value="30% NO PEDIDO + 70%30DDL" selected={formPayment === "30% NO PEDIDO + 70%30DDL"}>30% NO PEDIDO + 70%30DDL</option>
                <option value="OUTROS" selected={formPayment === "OUTROS"}>OUTROS</option>
            </Select>

            { formPayment === "OUTROS" ? 
                    <Input label="Observações Condição de Pagamento" error={errors.notesPaymentCondition} placeholder="Observações Condição de Pagamento" type="text" onChange={(e) => setNotesPaymentCondition(e.target.value)} value={notesPaymentCondition} /> 
                : null 
            }
        
            <div className="flex flex-col">
                <Button className="mt-10" variant="default" type="button" onClick={handlePayment}>Próximo</Button>
            </div>
        </div>
    );
}