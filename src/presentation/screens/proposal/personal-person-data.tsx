import { useNavigate } from "react-router-dom";
import { ProposalData, fieldLabels, useProposal } from "../../contexts/proposal";
import { useEffect, useState } from "react";
import { Input } from "../../shared/input";
import { Button } from "../../shared/button";

export function ProposalPersonData() {
    const navigate = useNavigate()
    
    const [numeroDaProposta, setNumeroDaProposta] = useState('')
    const [referenciaDoCliente, setReferenciaDoCliente] = useState('')
    const [empresa, setEmpresa] = useState('')
    const [cnpj, setCnpj] = useState('')
    const [solicitante, setSolicitante] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    
    const [errors, setErrors] = useState<Partial<Record<keyof ProposalData, string>>>({})
    const [canGo, setCanGo] = useState(false)

    const { data, handleData } = useProposal()
    
    const handlePersonalData = () => {
        handleData({ 
            numero_da_proposta: numeroDaProposta, 
            referencia_do_cliente: referenciaDoCliente, 
            empresa, 
            cnpj, 
            solicitante, 
            email, 
            telefone, 
        })
        setCanGo(true)
    }

    useEffect(() => {
        setNumeroDaProposta(data.numero_da_proposta)
        setReferenciaDoCliente(data.referencia_do_cliente)
        setEmpresa(data.empresa)
        setCnpj(data.cnpj)
        setSolicitante(data.solicitante)
        setEmail(data.email)
        setTelefone(data.telefone)
    }, [])

    useEffect(() => {
        if(canGo) {
            const fields: (keyof ProposalData)[] = [
                'numero_da_proposta', 
                'referencia_do_cliente', 
                'empresa', 
                'cnpj', 
                'solicitante', 
                'email', 
                'telefone'
            ];
            const errorsResponse: Partial<Record<keyof ProposalData, string>> = {};
        
            const allFieldsFilled = fields.every(field => {
                const isFilled = data[field] && data[field] !== '';
    
                if (!isFilled) {
                    errorsResponse[field] = `Preencha o Campo ${fieldLabels[field]}`;
                }
    
                return isFilled;
            });
        
            if (allFieldsFilled) {
                navigate('/proposal/payment');
                setCanGo(false)
            } else {
                setErrors(errorsResponse);
                setCanGo(false);
            }
        }
    }, [data, canGo]);

    return (
        <div className="flex flex-col space-y-2">
            <Input label="Número da Proposta" error={errors.numero_da_proposta} placeholder="Número da Proposta" type="text" onChange={(e) => setNumeroDaProposta(e.target.value)} value={numeroDaProposta} />
            <Input label="Referência do Cliente" error={errors.referencia_do_cliente}  placeholder="Referência do Cliente" type="text" onChange={(e) => setReferenciaDoCliente(e.target.value)} value={referenciaDoCliente} />
            <Input label="Empresa" error={errors.empresa} placeholder="Empresa" type="text" onChange={(e) => setEmpresa(e.target.value)} value={empresa} />
            <Input label="CNPJ" error={errors.cnpj} placeholder="CNPJ" type="text" onChange={(e) => setCnpj(e.target.value)} value={cnpj} />
            <Input label="Solicitante" error={errors.solicitante} placeholder="Solicitante" type="text" onChange={(e) => setSolicitante(e.target.value)} value={solicitante} />
            <Input label="Email" error={errors.email} placeholder="Email" type="text" onChange={(e) => setEmail(e.target.value)} value={email} />
            <Input label="Telefone" error={errors.telefone} placeholder="Telefone" type="text" onChange={(e) => setTelefone(e.target.value)} value={telefone} />


            <div className="flex flex-col">
                <Button className="mt-10" variant="default" type="button" onClick={handlePersonalData}>Próximo</Button>
            </div>
        </div>
    );
}