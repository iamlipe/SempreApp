import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProposalData, fieldLabels, useProposal } from "../../contexts/proposal";
import { Button } from "../../shared/button";
import { Input } from "../../shared/input";
import { Select } from "../../shared/select";

export function CostThird() {    
    const navigate = useNavigate()

    const [correnteDeEntradaProtecaoGeral, setCorrenteDeEntradaProtecaoGeral] = useState('')
    const [tipoDeDisjuntorProtecaoGeral, setTipoDeDisjuntorProtecaoGeral] = useState('')
    const [correnteDeRupturaProtecaoGeral, setCorrenteDeRupturaProtecaoGeral] = useState('')
    const [contatoAuxiliarProtecaoGeral, setContatoAuxiliarProtecaoGeral] = useState('')
    const [correnteDeSaidaBateria, setCorrenteDeSaidaBateria] = useState('')
    const [tipoDisjuntorBateria, setTipoDisjuntorBateria] = useState('')
    const [correnteDeRupturaBateria, setCorrenteDeRupturaBateria] = useState('')
    const [contatoAuxiliarBateria, setContatoAuxiliarBateria] = useState('')
    const [correnteDeSaidaConsumidor, setCorrenteDeSaidaConsumidor] = useState('')
    const [tipoDisjuntoConsumidor, setTipoDisjuntoConsumidor] = useState('')
    const [correnteDeRupturaConsumidor, seCorrenteDeRupturaConsumidor] = useState('')
    const [contatoAuxiliarConsumidor, setContatoAuxiliarConsumidor] = useState('')
    const [quantidadeDeDisjuntoresConsumidor, setQuantidadeDeDisjuntoresConsumidor] = useState('')

    const [errors, setErrors] = useState<Partial<Record<keyof ProposalData, string>>>({})
    const [canGo, setCanGo] = useState(false)

    const { data, handleData } = useProposal()

    const onSubmit = async () => {
        handleData({ correnteDeEntradaProtecaoGeral, tipoDeDisjuntorProtecaoGeral, correnteDeRupturaProtecaoGeral, contatoAuxiliarProtecaoGeral, correnteDeSaidaBateria, tipoDisjuntorBateria, correnteDeRupturaBateria, contatoAuxiliarBateria, correnteDeSaidaConsumidor, tipoDisjuntoConsumidor, correnteDeRupturaConsumidor, contatoAuxiliarConsumidor, quantidadeDeDisjuntoresConsumidor })
        setCanGo(true)
    }

    useEffect(() => {
        setCorrenteDeEntradaProtecaoGeral('10')
        setTipoDeDisjuntorProtecaoGeral(data.tipoDeDisjuntorProtecaoGeral)
        setCorrenteDeRupturaProtecaoGeral(data.correnteDeRupturaProtecaoGeral)
        setContatoAuxiliarProtecaoGeral(data.contatoAuxiliarProtecaoGeral)
        setCorrenteDeSaidaBateria('10')
        setTipoDisjuntorBateria(data.tipoDisjuntorBateria)
        setCorrenteDeRupturaBateria(data.correnteDeRupturaBateria)
        setContatoAuxiliarBateria(data.contatoAuxiliarBateria)
        setCorrenteDeSaidaConsumidor('10')
        setTipoDisjuntoConsumidor(data.tipoDisjuntoConsumidor)
        seCorrenteDeRupturaConsumidor(data.correnteDeRupturaConsumidor)
        setContatoAuxiliarConsumidor(data.contatoAuxiliarConsumidor)
        setQuantidadeDeDisjuntoresConsumidor(data.quantidadeDeDisjuntoresConsumidor)
    }, [])

    useEffect(() => {
        if(canGo) {
            const fields: (keyof ProposalData)[] = ['correnteDeEntradaProtecaoGeral', 'tipoDeDisjuntorProtecaoGeral', 'correnteDeRupturaProtecaoGeral', 'contatoAuxiliarProtecaoGeral', 'correnteDeSaidaBateria', 'tipoDisjuntorBateria', 'correnteDeRupturaBateria', 'contatoAuxiliarBateria', 'correnteDeSaidaConsumidor', 'tipoDisjuntoConsumidor', 'correnteDeRupturaConsumidor', 'contatoAuxiliarConsumidor', 'quantidadeDeDisjuntoresConsumidor'];
            const errorsResponse: Partial<Record<keyof ProposalData, string>> = {};
        
            const allFieldsFilled = fields.every(field => {
                const isFilled = data[field] && data[field] !== '';
    
                if (!isFilled) {
                    errorsResponse[field] = `Preencha o Campo ${fieldLabels[field]}`;
                }
    
                return isFilled;
            });
        
            if (allFieldsFilled) {
                navigate('/cost/fourth');
                setCanGo(false)
            } else {
                setErrors(errorsResponse);
                setCanGo(false);
            }
        }
    }, [data, canGo]);

    return (
        <div className="flex flex-col space-y-2">
            <p className="font-semibold text-slate-800 text-sm mb-4">6 - Proteção Geral de Entrada (CA)</p>
            
            <Input label="Corrente de Entrada" disabled placeholder="Digite aqui" type="text" defaultValue={correnteDeEntradaProtecaoGeral} />
            
            <Select label="Tipo de Disjuntor" error={errors.tipoDeDisjuntorProtecaoGeral} onChange={(e) => setTipoDeDisjuntorProtecaoGeral(e.target.value)} value={tipoDeDisjuntorProtecaoGeral}>
                <option value="">Selecione...</option> 
                <option value="CX MOLDADA" selected={tipoDeDisjuntorProtecaoGeral === "CX MOLDADA"}>CX MOLDADA (PADRÃO)</option> 
                <option value="MINI DIN" selected={tipoDeDisjuntorProtecaoGeral === "MINI DIN"}>MINI DIN</option> 
                <option value="MOTORIZADO" selected={tipoDeDisjuntorProtecaoGeral === "MOTORIZADO"}>MOTORIZADO</option> 
                <option value="OUTROS" selected={tipoDeDisjuntorProtecaoGeral === "OUTROS"}>OUTROS</option> 
            </Select>    

            <Select label="Corrente de Ruptura (KA)" error={errors.correnteDeRupturaProtecaoGeral} onChange={(e) => setCorrenteDeRupturaProtecaoGeral(e.target.value)} value={correnteDeRupturaProtecaoGeral}>
                <option value="">Selecione...</option> 
                <option value="10" selected={correnteDeRupturaProtecaoGeral === "10"}>10KA (PADRÃO)</option> 
                <option value="15" selected={correnteDeRupturaProtecaoGeral === "15"}>15KA</option> 
                <option value="18" selected={correnteDeRupturaProtecaoGeral === "18"}>18KA</option> 
                <option value="25" selected={correnteDeRupturaProtecaoGeral === "25"}>25KA</option> 
                <option value="35" selected={correnteDeRupturaProtecaoGeral === "35"}>35KA</option> 
                <option value="OUTROS" selected={correnteDeRupturaProtecaoGeral === "OUTROS"}>OUTROS</option> 
            </Select>    

            <Select label="Contato Auxiliar / bobina" error={errors.contatoAuxiliarProtecaoGeral} onChange={(e) => setContatoAuxiliarProtecaoGeral(e.target.value)} value={contatoAuxiliarProtecaoGeral}>
                <option value="">Selecione...</option> 
                <option value="NÃO" selected={contatoAuxiliarProtecaoGeral === "NÃO"}>NÃO (PADRÃO)</option> 
                <option value="CONT. REVERSÍVEL" selected={contatoAuxiliarProtecaoGeral === "CONT. REVERSÍVEL"}>CONT. REVERSÍVEL</option> 
                <option value="CONT. TRIP" selected={contatoAuxiliarProtecaoGeral === "CONT. TRIP"}>CONT. TRIP</option> 
                <option value="TRIP+REVERSIVEL" selected={contatoAuxiliarProtecaoGeral === "TRIP+REVERSIVEL"}>TRIP+REVERSIVEL</option> 
            </Select>    

            <div className="flex flex-col">
                <p className="font-semibold text-slate-800 text-sm mt-6 mb-2">7 - Proteção da Bateria</p>
            </div>

            <Input label="Corrente de Saída (A)" disabled placeholder="Digite aqui" type="text" defaultValue={correnteDeSaidaBateria} />

            <Select label="Tipo de Disjuntor" error={errors.tipoDisjuntorBateria} onChange={(e) => setTipoDisjuntorBateria(e.target.value)} value={tipoDisjuntorBateria}>
                <option value="">Selecione...</option> 
                <option value="CX MOLDADA" selected={tipoDisjuntorBateria === "CX MOLDADA"}>CX MOLDADA (PADRÃO)</option> 
                <option value="MINI DIN" selected={tipoDisjuntorBateria === "MINI DIN"}>MINI DIN</option> 
                <option value="MOTORIZADO" selected={tipoDisjuntorBateria === "MOTORIZADO"}>MOTORIZADO</option> 
                <option value="OUTROS" selected={tipoDisjuntorBateria === "OUTROS"}>OUTROS</option> 
            </Select>    

            <Select label="Corrente de Ruptura (KA)" error={errors.correnteDeRupturaBateria} onChange={(e) => setCorrenteDeRupturaBateria(e.target.value)} value={correnteDeRupturaBateria}>
                <option value="">Selecione...</option> 
                <option value="10" selected={correnteDeRupturaBateria === "10"}>10KA (PADRÃO)</option> 
                <option value="15" selected={correnteDeRupturaBateria === "15"}>15KA</option> 
                <option value="18" selected={correnteDeRupturaBateria === "18"}>18KA</option> 
                <option value="25" selected={correnteDeRupturaBateria === "25"}>25KA</option> 
                <option value="35" selected={correnteDeRupturaBateria === "35"}>35KA</option> 
                <option value="OUTROS" selected={correnteDeRupturaBateria === "OUTROS"}>OUTROS</option> 
            </Select>

            <Select label="Contato Auxiliar / bobina" error={errors.contatoAuxiliarBateria} onChange={(e) => setContatoAuxiliarBateria(e.target.value)} value={contatoAuxiliarBateria}>
                <option value="">Selecione...</option> 
                <option value="NÃO" selected={contatoAuxiliarBateria === "NÃO"}>NÃO (PADRÃO)</option> 
                <option value="CONT. REVERSÍVEL" selected={contatoAuxiliarBateria === "CONT. REVERSÍVEL"}>CONT. REVERSÍVEL</option> 
                <option value="CONT. TRIP" selected={contatoAuxiliarBateria === "CONT. TRIP"}>CONT. TRIP</option> 
                <option value="TRIP+REVERSIVEL" selected={contatoAuxiliarBateria === "TRIP+REVERSIVEL"}>TRIP+REVERSIVEL</option> 
            </Select>    

            <div className="flex flex-col">
                <p className="font-semibold text-slate-800 text-sm mt-6 mb-2">8 - Proteção do Consumidor</p>
            </div>

            <Input label="Corrente de Saída (A)" disabled placeholder="Digite aqui" type="text" defaultValue={correnteDeSaidaConsumidor} />

            <Select label="Tipo de Disjuntor" error={errors.tipoDisjuntoConsumidor} onChange={(e) => setTipoDisjuntoConsumidor(e.target.value)} value={tipoDisjuntoConsumidor}>
                <option value="">Selecione...</option> 
                <option value="CX MOLDADA" selected={tipoDisjuntoConsumidor === "CX MOLDADA"}>CX MOLDADA (PADRÃO)</option> 
                <option value="MINI DIN" selected={tipoDisjuntoConsumidor === "MINI DIN"}>MINI DIN</option> 
                <option value="MOTORIZADO" selected={tipoDisjuntoConsumidor === "MOTORIZADO"}>MOTORIZADO</option> 
                <option value="OUTROS" selected={tipoDisjuntoConsumidor === "OUTROS"}>OUTROS</option> 
            </Select>    

            <Select label="Corrente de Ruptura (KA)" error={errors.correnteDeRupturaConsumidor} onChange={(e) => seCorrenteDeRupturaConsumidor(e.target.value)} value={correnteDeRupturaConsumidor}>
                <option value="">Selecione...</option> 
                <option value="10" selected={correnteDeRupturaConsumidor === "10"}>10KA (PADRÃO)</option> 
                <option value="15" selected={correnteDeRupturaConsumidor === "15"}>15KA</option> 
                <option value="18" selected={correnteDeRupturaConsumidor === "18"}>18KA</option> 
                <option value="25" selected={correnteDeRupturaConsumidor === "25"}>25KA</option> 
                <option value="35" selected={correnteDeRupturaConsumidor === "35"}>35KA</option> 
                <option value="OUTROS" selected={correnteDeRupturaConsumidor === "OUTROS"}>OUTROS</option> 
            </Select>

            <Select label="Contato Auxiliar / bobina" error={errors.contatoAuxiliarConsumidor} onChange={(e) => setContatoAuxiliarConsumidor(e.target.value)} value={contatoAuxiliarConsumidor}>
                <option value="">Selecione...</option> 
                <option value="NÃO" selected={contatoAuxiliarConsumidor === "NÃO"}>NÃO (PADRÃO)</option> 
                <option value="CONT. REVERSÍVEL" selected={contatoAuxiliarConsumidor === "CONT. REVERSÍVEL"}>CONT. REVERSÍVEL</option> 
                <option value="CONT. TRIP" selected={contatoAuxiliarConsumidor === "CONT. TRIP"}>CONT. TRIP</option> 
                <option value="TRIP+REVERSIVEL" selected={contatoAuxiliarConsumidor === "TRIP+REVERSIVEL"}>TRIP+REVERSIVEL</option> 
            </Select>  

            <Select label="Tensão Máxima Consumidor" error={errors.quantidadeDeDisjuntoresConsumidor} onChange={(e) => setQuantidadeDeDisjuntoresConsumidor(e.target.value)} value={quantidadeDeDisjuntoresConsumidor}>
                <option value="">Selecione...</option>
                {Array.from({ length: 50 }, (_, index) => (
                    <option key={index + 1} value={index + 1} selected={quantidadeDeDisjuntoresConsumidor === `${index + 1}`}>
                        {index + 1}
                    </option>
                ))}     
            </Select>  

            <div className="flex flex-col">
                <Button className="mt-10" variant="default" type="button" onClick={onSubmit}>Próximo</Button>
            </div>
        </div>
    );
}