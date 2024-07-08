import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProposalData, fieldLabels, useProposal } from "../../contexts/proposal";
import { Button } from "../../shared/button";
import { Select } from "../../shared/select";
import { Radio } from "../../shared/radio";

export function CostFifth() {
    const navigate = useNavigate()

    const [materialDoGabinete, setMaterialDoGabinete] = useState('')
    const [grauDeProtecao, setGrauDeProtecao] = useState('')
    const [tipoDePintura, setTipoDePintura] = useState('')
    const [corExterna, setCorExterna] = useState('')
    const [soleiraNaBase, setSoleiraNaBase] = useState('')
    const [entradaESaidaDeCabos, setEntradaESaidaDeCabos] = useState('')
    const [exaustaoDeArQuente, setExaustaoDeArQuente] = useState('')
    const [protecaoNR10, setProtecaoNR10] = useState('')

    const [errors, setErrors] = useState<Partial<Record<keyof ProposalData, string>>>({})
    const [canGo, setCanGo] = useState(false)

    const { data, handleData } = useProposal()

    const onSubmit = async () => {
        handleData({ materialDoGabinete, grauDeProtecao, tipoDePintura, corExterna, soleiraNaBase, entradaESaidaDeCabos, exaustaoDeArQuente, protecaoNR10 })
        setCanGo(true)
    }

    useEffect(() => {
        setMaterialDoGabinete(data.materialDoGabinete)
        setGrauDeProtecao(data.grauDeProtecao)
        setTipoDePintura(data.tipoDePintura)
        setCorExterna(data.corExterna)
        setSoleiraNaBase(data.soleiraNaBase)
        setEntradaESaidaDeCabos(data.entradaESaidaDeCabos)
        setExaustaoDeArQuente(data.exaustaoDeArQuente)
        setProtecaoNR10(data.protecaoNR10)
    }, [])

    useEffect(() => {
        if(canGo) {
            const fields: (keyof ProposalData)[] = ['materialDoGabinete', 'grauDeProtecao', 'tipoDePintura', 'corExterna', 'soleiraNaBase', 'entradaESaidaDeCabos', 'exaustaoDeArQuente', 'protecaoNR10'];
            const errorsResponse: Partial<Record<keyof ProposalData, string>> = {};
        
            const allFieldsFilled = fields.every(field => {
                const isFilled = data[field] && data[field] !== '';
    
                if (!isFilled) {
                    errorsResponse[field] = `Preencha o Campo ${fieldLabels[field]}`;
                }
    
                return isFilled;
            });
        
            if (allFieldsFilled) {
                navigate('/cost/sixth');
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

            <Select label="Material do Gabinete" error={errors.materialDoGabinete} onChange={(e) => setMaterialDoGabinete(e.target.value)} value={materialDoGabinete}>
                <option value="">Selecione...</option> 
                <option value="PADRÃO" selected={materialDoGabinete === "PADRÃO"}>PADRÃO (USG 14/12)</option> 
                <option value="ALUMINIO" selected={materialDoGabinete === "ALUMINIO"}>ALUMINIO</option> 
                <option value="INOX 304" selected={materialDoGabinete === "INOX 304"}>INOX 304</option> 
                <option value="INOX 316" selected={materialDoGabinete === "INOX 316"}>INOX 316</option> 
                <option value="OUTROS" selected={materialDoGabinete === "OUTROS"}>OUTROS</option> 
            </Select>  

            <Select label="Grau de Proteção" error={errors.grauDeProtecao} onChange={(e) => setGrauDeProtecao(e.target.value)} value={grauDeProtecao}>
                <option value="">Selecione...</option> 
                <option value="IP-21" selected={grauDeProtecao === "IP-21"}>IP-21</option> 
                <option value="IP-22" selected={grauDeProtecao === "IP-22"}>IP-22</option> 
                <option value="IP-23" selected={grauDeProtecao === "IP-23"}>IP-23</option> 
                <option value="IP-24" selected={grauDeProtecao === "IP-24"}>IP-24</option> 
                <option value="IP-31" selected={grauDeProtecao === "IP-31"}>IP-31</option> 
                <option value="IP-32" selected={grauDeProtecao === "IP-32"}>IP-32</option> 
                <option value="IP-33" selected={grauDeProtecao === "IP-33"}>IP-33</option> 
                <option value="IP-34" selected={grauDeProtecao === "IP-34"}>IP-34</option> 
                <option value="IP-41" selected={grauDeProtecao === "IP-41"}>IP-41</option> 
                <option value="IP-42" selected={grauDeProtecao === "IP-42"}>IP-42</option> 
                <option value="IP-43" selected={grauDeProtecao === "IP-43"}>IP-43</option> 
                <option value="IP-44" selected={grauDeProtecao === "IP-44"}>IP-44</option> 
                <option value="IP-53" selected={grauDeProtecao === "IP-53"}>IP-53</option> 
                <option value="IP-54" selected={grauDeProtecao === "IP-54"}>IP-54</option> 
                <option value="IP-55" selected={grauDeProtecao === "IP-55"}>IP-55</option> 
                <option value="OUTROS" selected={grauDeProtecao === "OUTROS"}>OUTROS</option> 
            </Select>

            <Select label="Tipo de Pintura" error={errors.tipoDePintura} onChange={(e) => setTipoDePintura(e.target.value)} value={tipoDePintura}>
                <option value="">Selecione...</option> 
                <option value="EPOXI 80 MICRAS" selected={materialDoGabinete === "EPOXI 80 MICRAS"}>EPOXI 80 MICRAS (PADRÃO)</option> 
                <option value="EPOXI 190 MICRAS" selected={materialDoGabinete === "EPOXI 190 MICRAS"}>EPOXI 190 MICRAS</option> 
                <option value="FOSFATIZADA" selected={materialDoGabinete === "FOSFATIZADA"}>FOSFATIZADA</option> 
                <option value="N2841 PETROBRAS" selected={materialDoGabinete === "N2841 PETROBRAS"}>N2841 PETROBRAS</option> 
                <option value="ESPECIAL" selected={materialDoGabinete === "ESPECIAL"}>ESPECIAL</option> 
            </Select>         

            <Select label="Cor externa" error={errors.corExterna} onChange={(e) => setCorExterna(e.target.value)} value={corExterna}>
                <option value="">Selecione...</option> 
                <option value="CINZA RAL 7032" selected={corExterna === "CINZA RAL 7032"}>CINZA RAL 7032</option> 
                <option value="CINZA RAL 7035" selected={corExterna === "CINZA RAL 7035"}>CINZA RAL 7035</option> 
                <option value="CINZA MUNSELL N6,5" selected={corExterna === "CINZA MUNSELL N6,5"}>CINZA MUNSELL N6,5</option> 
                <option value="PRETO RAL 9005" selected={corExterna === "PRETO RAL 9005"}>PRETO RAL 9005</option> 
                <option value="OUTROS" selected={corExterna === "OUTROS"}>OUTROS</option> 
            </Select>   

            <Radio
                label="Soleira na Base"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={soleiraNaBase}
                onChange={(e) => setSoleiraNaBase(e)}
                error={errors.soleiraNaBase}
            />
            
            <Select label="Entrada e saída de cabos" error={errors.entradaESaidaDeCabos} onChange={(e) => setEntradaESaidaDeCabos(e.target.value)} value={entradaESaidaDeCabos}>
                <option value="">Selecione...</option> 
                <option value="ENTRADA E SAÍDA DE TERMINAIS" selected={corExterna === "ENTRADA E SAÍDA DE TERMINAIS"}>ENTRADA E SAÍDA DE TERMINAIS</option> 
                <option value="SUPERIOR" selected={corExterna === "SUPERIOR"}>SUPERIOR</option> 
                <option value="INFERIOR (PADRÃO)" selected={corExterna === "INFERIOR (PADRÃO)"}>INFERIOR (PADRÃO)</option> 
                <option value="SUPERIOR COM FECHO FENOLITE" selected={corExterna === "SUPERIOR COM FECHO FENOLITE"}>SUPERIOR COM FECHO FENOLITE</option> 
                <option value="INFERIOR COM FECHO FENOLITE" selected={corExterna === "INFERIOR COM FECHO FENOLITE"}>INFERIOR COM FECHO FENOLITE</option> 
            </Select>

            <Select label="Exaustão de ar quente" error={errors.exaustaoDeArQuente} onChange={(e) => setExaustaoDeArQuente(e.target.value)} value={exaustaoDeArQuente}>
                <option value="">Selecione...</option> 
                <option value="NÃO" selected={corExterna === "NÃO"}>NÃO (PADRÃO)</option> 
                <option value="OBRIGATÓRIO DEVIDO A POTÊNCIA" selected={corExterna === "OBRIGATÓRIO DEVIDO A POTÊNCIA"}>OBRIGATÓRIO DEVIDO A POTÊNCIA</option> 
                <option value="CONFORME ET" selected={corExterna === "CONFORME ET"}>CONFORME ET</option> 
            </Select>  

            <Select label="Proteção NR10" error={errors.protecaoNR10} onChange={(e) => setProtecaoNR10(e.target.value)} value={protecaoNR10}>
                <option value="">Selecione...</option> 
                <option value="PROTEÇÃO EM POLICARBONATO (PADRÃO)" selected={corExterna === "PROTEÇÃO EM POLICARBONATO (PADRÃO)"}>PROTEÇÃO EM POLICARBONATO (PADRÃO)</option> 
                <option value="PROTEÇÃO C/ CONTRA PORTA (METAL)" selected={corExterna === "PROTEÇÃO C/ CONTRA PORTA (METAL)"}>PROTEÇÃO C/ CONTRA PORTA (METAL)</option> 
            </Select>  

            <div className="flex flex-col">
                <Button className="mt-10" variant="default" type="button" onClick={onSubmit}>Próximo</Button>
            </div>
        </div>
    );
}