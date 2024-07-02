import { useNavigate } from "react-router-dom";
import { Proposal, fieldLabels, useProposal } from "../../contexts/proposal";
import { useEffect, useState } from "react";
import { Input } from "../../shared/input";
import { Button } from "../../shared/button";

export function ProposalPersonData() {
    const navigate = useNavigate()
    
    const [proposalNumber, setProposalNumber] = useState('')
    const [customerReference, setCustomerReference] = useState('')
    const [company, setCompany] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [requester, setRequester] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [errors, setErrors] = useState<Partial<Record<keyof Proposal, string>>>({})
    const [canGo, setCanGo] = useState(false)

    const { data, handleData } = useProposal()
    
    const handlePersonalData = () => {
        handleData({ proposalNumber, customerReference, company, cnpj, requester, email, phone })
        setCanGo(true)
    }

    console.log(data)

    useEffect(() => {
        setProposalNumber(data.proposalNumber)
        setCustomerReference(data.customerReference)
        setCompany(data.company)
        setCnpj(data.cnpj)
        setRequester(data.requester)
        setEmail(data.email)
        setPhone(data.phone)
    }, [])

    useEffect(() => {
        if(canGo) {
            const fields: (keyof Proposal)[] = ['proposalNumber', 'customerReference', 'company', 'cnpj', 'requester', 'email', 'phone'];
            const errorsResponse: Partial<Record<keyof Proposal, string>> = {};
        
            const allFieldsFilled = fields.every(field => {
                const isFilled = data[field] && data[field] !== '';
    
                if (!isFilled) {
                    errorsResponse[field] = `Preencha o Campo ${fieldLabels[field]}`;
                }
    
                return isFilled;
            });
        
            if (allFieldsFilled) {
                navigate('/proposal/payment');
            } else {
                setErrors(errorsResponse);
                setCanGo(false);
            }
        }
    }, [data, canGo]);

    return (
        <div className="flex flex-col space-y-2">
            <Input label="Número da Proposta" error={errors.proposalNumber} placeholder="Número da Proposta" type="text" onChange={(e) => setProposalNumber(e.target.value)} value={proposalNumber} />
            <Input label="Referência do Cliente" error={errors.customerReference}  placeholder="Referência do Cliente" type="text" onChange={(e) => setCustomerReference(e.target.value)} value={customerReference} />
            <Input label="Empresa" error={errors.company} placeholder="Empresa" type="text" onChange={(e) => setCompany(e.target.value)} value={company} />
            <Input label="CNPJ" error={errors.cnpj} placeholder="CNPJ" type="text" onChange={(e) => setCnpj(e.target.value)} value={cnpj} />
            <Input label="Solicitante" error={errors.requester} placeholder="Solicitante" type="text" onChange={(e) => setRequester(e.target.value)} value={requester} />
            <Input label="Email" error={errors.email} placeholder="Email" type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
            <Input label="Telefone" error={errors.phone} placeholder="Telefone" type="text" onChange={(e) => setPhone(e.target.value)} value={phone} />

            <div className="flex flex-col">
                <Button className="mt-10" variant="default" type="button" onClick={handlePersonalData}>Próximo</Button>
            </div>
        </div>
    );
}