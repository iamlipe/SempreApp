import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProposalData, fieldLabels, useProposal } from "../../contexts/proposal";
import { Button } from "../../shared/button";
import { Select } from "../../shared/select";
import { Radio } from "../../shared/radio";

export function CostFourth() {
    const navigate = useNavigate()

    const [fusivelDePotencia, setFusivelDePotencia] = useState('')
    const [protecaoCircuitosAuxiliares, setProtecaoCircuitosAuxiliares] = useState('')
    const [fusivelDePotenciaNaColunaRetificadora, setFusivelDePotenciaNaColunaRetificadora] = useState('')
    const [tratamentoDaBarra, setTratamentoDaBarra] = useState('')
    const [tipoDeFiacao, setTipoDeFiacao] = useState('')
    const [identificacaoDeCabos, setIdentificacaoDeCabos] = useState('')

    const [errors, setErrors] = useState<Partial<Record<keyof ProposalData, string>>>({})
    const [canGo, setCanGo] = useState(false)

    const { data, handleData } = useProposal()

    const onSubmit = async () => {
        handleData({ fusivelDePotencia, protecaoCircuitosAuxiliares, fusivelDePotenciaNaColunaRetificadora, tratamentoDaBarra, tipoDeFiacao, identificacaoDeCabos })
        setCanGo(true)
    }

    useEffect(() => {
        setFusivelDePotencia(data.fusivelDePotencia)
        setProtecaoCircuitosAuxiliares(data.protecaoCircuitosAuxiliares)
        setFusivelDePotenciaNaColunaRetificadora(data.fusivelDePotenciaNaColunaRetificadora)
        setTratamentoDaBarra(data.tratamentoDaBarra)
        setTipoDeFiacao(data.tipoDeFiacao)
        setIdentificacaoDeCabos(data.identificacaoDeCabos)
    }, [])

    useEffect(() => {
        if(canGo) {
            const fields: (keyof ProposalData)[] = ['fusivelDePotencia', 'protecaoCircuitosAuxiliares', 'fusivelDePotenciaNaColunaRetificadora', 'tratamentoDaBarra', 'tipoDeFiacao', 'identificacaoDeCabos'];
            const errorsResponse: Partial<Record<keyof ProposalData, string>> = {};
        
            const allFieldsFilled = fields.every(field => {
                const isFilled = data[field] && data[field] !== '';
    
                if (!isFilled) {
                    errorsResponse[field] = `Preencha o Campo ${fieldLabels[field]}`;
                }
    
                return isFilled;
            });
        
            if (allFieldsFilled) {
                navigate('/cost/fifth');
                setCanGo(false)
            } else {
                setErrors(errorsResponse);
                setCanGo(false);
            }
        }
    }, [data, canGo]);



    return (
        <div className="flex flex-col space-y-2">
            <p className="font-semibold text-slate-800 text-sm mb-2">9 - Outras Proteções</p>

            <Select label="Fusível de Potência (F1)" error={errors.fusivelDePotencia} onChange={(e) => setFusivelDePotencia(e.target.value)} value={fusivelDePotencia}>
                <option value="">Selecione...</option> 
                <option value="FUSIVEL NH" selected={fusivelDePotencia === "FUSIVEL NH"}>FUSIVEL NH (PADRÃO)</option> 
                <option value="FUSIVEL C/CONTATO AUXILIAR" selected={fusivelDePotencia === "FUSIVEL C/CONTATO AUXILIAR"}>FUSIVEL C/CONTATO AUXILIAR</option> 
                <option value="DISJUNTOR" selected={fusivelDePotencia === "DISJUNTOR"}>DISJUNTOR</option> 
            </Select>  

            <Select label="Proteção Circuitos Auxiliares" error={errors.protecaoCircuitosAuxiliares} onChange={(e) => setProtecaoCircuitosAuxiliares(e.target.value)} value={protecaoCircuitosAuxiliares}>
                <option value="">Selecione...</option> 
                <option value="FUSIVEL CARTUCHO" selected={protecaoCircuitosAuxiliares === "FUSIVEL CARTUCHO"}>FUSIVEL CARTUCHO (PADRÃO)</option> 
                <option value="MINI DISJUNTOR" selected={protecaoCircuitosAuxiliares === "MINI DISJUNTOR"}>MINI DISJUNTOR</option> 
            </Select>  

            <Radio
                label="Fusível de Potência na coluna retificadora (FR1/FR2/FR3)"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não (Padrão)' },
                ]}
                value={fusivelDePotenciaNaColunaRetificadora}
                onChange={(e) => setFusivelDePotenciaNaColunaRetificadora(e)}
                error={errors.fusivelDePotenciaNaColunaRetificadora}
            />

            <div className="flex flex-col">
                <p className="font-semibold text-slate-800 text-sm mt-6 mb-2">10 - Fiação, Barramento e Identificação</p>
            </div>

            <Select label="Tratamento da Barra" error={errors.tratamentoDaBarra} onChange={(e) => setTratamentoDaBarra(e.target.value)} value={tratamentoDaBarra}>
                <option value="">Selecione...</option> 
                <option value="PRATEADO" selected={protecaoCircuitosAuxiliares === "PRATEADO"}>PRATEADO</option> 
                <option value="ISOLADO" selected={protecaoCircuitosAuxiliares === "ISOLADO"}>ISOLADO</option> 
                <option value="COLORIDO" selected={protecaoCircuitosAuxiliares === "COLORIDO"}>COLORIDO</option> 
                <option value="PADRÃO" selected={protecaoCircuitosAuxiliares === "PADRÃO"}>PADRÃO</option> 
            </Select>  

            <Select label="Tipo de Fiação" error={errors.tipoDeFiacao} onChange={(e) => setTipoDeFiacao(e.target.value)} value={tipoDeFiacao}>
                <option value="">Selecione...</option> 
                <option value="CABO PRETO 750V" selected={tipoDeFiacao === "CABO PRETO 750V"}>CABO PRETO 750V (PADRÃO)</option> 
                <option value="CABO PRETO 1KV" selected={tipoDeFiacao === "CABO PRETO 1KV"}>CABO PRETO 1KV</option> 
                <option value="CABO EPR / ESTANHADO" selected={tipoDeFiacao === "CABO EPR / ESTANHADO"}>CABO EPR / ESTANHADO</option> 
                <option value="CABO COLORIDO" selected={tipoDeFiacao === "CABO COLORIDO"}>CABO COLORIDO</option> 
            </Select>  

            <Select label="Identificação de Cabos" error={errors.identificacaoDeCabos} onChange={(e) => setIdentificacaoDeCabos(e.target.value)} value={identificacaoDeCabos}>
                <option value="">Selecione...</option> 
                <option value="PADRÃO" selected={identificacaoDeCabos === "PADRÃO"}>PADRÃO</option> 
                <option value="ESPECIAL" selected={identificacaoDeCabos === "ESPECIAL"}>ESPECIAL</option> 
            </Select>  


            <div className="flex flex-col">
                <Button className="mt-10" variant="default" type="button" onClick={onSubmit}>Próximo</Button>
            </div>
        </div>
    );
}