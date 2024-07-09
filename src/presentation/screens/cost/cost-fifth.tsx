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
        handleData({ 
            material_do_gabinete: materialDoGabinete, 
            grau_de_protecao: grauDeProtecao, 
            tipo_de_pintura: tipoDePintura, 
            cor_externa: corExterna, 
            soleira_na_base: soleiraNaBase, 
            entrada_e_saida_de_cabos: entradaESaidaDeCabos, 
            exaustao_de_ar_quente: exaustaoDeArQuente, 
            protecao_nr10: protecaoNR10 
        })
        setCanGo(true)
    }

    useEffect(() => {
        setMaterialDoGabinete(data.material_do_gabinete)
        setGrauDeProtecao(data.grau_de_protecao)
        setTipoDePintura(data.tipo_de_pintura)
        setCorExterna(data.cor_externa)
        setSoleiraNaBase(data.soleira_na_base)
        setEntradaESaidaDeCabos(data.entrada_e_saida_de_cabos)
        setExaustaoDeArQuente(data.exaustao_de_ar_quente)
        setProtecaoNR10(data.protecao_nr10)
    }, [])

    useEffect(() => {
        if(canGo) {
            const fields: (keyof ProposalData)[] = [
                'material_do_gabinete', 
                'grau_de_protecao', 
                'tipo_de_pintura', 
                'cor_externa', 
                'soleira_na_base', 
                'entrada_e_saida_de_cabos', 
                'exaustao_de_ar_quente', 
                'protecao_nr10'
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

            <Select label="Material do Gabinete" error={errors.material_do_gabinete} onChange={(e) => setMaterialDoGabinete(e.target.value)} value={materialDoGabinete}>
                <option value="">Selecione...</option> 
                <option value="PADRÃO" selected={materialDoGabinete === "PADRÃO"}>PADRÃO (USG 14/12)</option> 
                <option value="ALUMINIO" selected={materialDoGabinete === "ALUMINIO"}>ALUMINIO</option> 
                <option value="INOX 304" selected={materialDoGabinete === "INOX 304"}>INOX 304</option> 
                <option value="INOX 316" selected={materialDoGabinete === "INOX 316"}>INOX 316</option> 
                <option value="OUTROS" selected={materialDoGabinete === "OUTROS"}>OUTROS</option> 
            </Select>  

            <Select label="Grau de Proteção" error={errors.grau_de_protecao} onChange={(e) => setGrauDeProtecao(e.target.value)} value={grauDeProtecao}>
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

            <Select label="Tipo de Pintura" error={errors.tipo_de_pintura} onChange={(e) => setTipoDePintura(e.target.value)} value={tipoDePintura}>
                <option value="">Selecione...</option> 
                <option value="EPOXI 80 MICRAS" selected={tipoDePintura === "EPOXI 80 MICRAS"}>EPOXI 80 MICRAS (PADRÃO)</option> 
                <option value="EPOXI 190 MICRAS" selected={tipoDePintura === "EPOXI 190 MICRAS"}>EPOXI 190 MICRAS</option> 
                <option value="FOSFATIZADA" selected={tipoDePintura === "FOSFATIZADA"}>FOSFATIZADA</option> 
                <option value="N2841 PETROBRAS" selected={tipoDePintura === "N2841 PETROBRAS"}>N2841 PETROBRAS</option> 
                <option value="ESPECIAL" selected={tipoDePintura === "ESPECIAL"}>ESPECIAL</option> 
            </Select>         

            <Select label="Cor externa" error={errors.cor_externa} onChange={(e) => setCorExterna(e.target.value)} value={corExterna}>
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
                error={errors.soleira_na_base}
            />
            
            <Select label="Entrada e saída de cabos" error={errors.entrada_e_saida_de_cabos} onChange={(e) => setEntradaESaidaDeCabos(e.target.value)} value={entradaESaidaDeCabos}>
                <option value="">Selecione...</option> 
                <option value="ENTRADA E SAÍDA DE TERMINAIS" selected={entradaESaidaDeCabos === "ENTRADA E SAÍDA DE TERMINAIS"}>ENTRADA E SAÍDA DE TERMINAIS</option> 
                <option value="SUPERIOR" selected={entradaESaidaDeCabos === "SUPERIOR"}>SUPERIOR</option> 
                <option value="INFERIOR (PADRÃO)" selected={entradaESaidaDeCabos === "INFERIOR (PADRÃO)"}>INFERIOR (PADRÃO)</option> 
                <option value="SUPERIOR COM FECHO FENOLITE" selected={entradaESaidaDeCabos === "SUPERIOR COM FECHO FENOLITE"}>SUPERIOR COM FECHO FENOLITE</option> 
                <option value="INFERIOR COM FECHO FENOLITE" selected={entradaESaidaDeCabos === "INFERIOR COM FECHO FENOLITE"}>INFERIOR COM FECHO FENOLITE</option> 
            </Select>

            <Select label="Exaustão de ar quente" error={errors.exaustao_de_ar_quente} onChange={(e) => setExaustaoDeArQuente(e.target.value)} value={exaustaoDeArQuente}>
                <option value="">Selecione...</option> 
                <option value="NÃO" selected={exaustaoDeArQuente === "NÃO"}>NÃO (PADRÃO)</option> 
                <option value="OBRIGATÓRIO DEVIDO A POTÊNCIA" selected={exaustaoDeArQuente === "OBRIGATÓRIO DEVIDO A POTÊNCIA"}>OBRIGATÓRIO DEVIDO A POTÊNCIA</option> 
                <option value="CONFORME ET" selected={exaustaoDeArQuente === "CONFORME ET"}>CONFORME ET</option> 
            </Select>  

            <Select label="Proteção NR10" error={errors.protecao_nr10} onChange={(e) => setProtecaoNR10(e.target.value)} value={protecaoNR10}>
                <option value="">Selecione...</option> 
                <option value="PROTEÇÃO EM POLICARBONATO (PADRÃO)" selected={protecaoNR10 === "PROTEÇÃO EM POLICARBONATO (PADRÃO)"}>PROTEÇÃO EM POLICARBONATO (PADRÃO)</option> 
                <option value="PROTEÇÃO C/ CONTRA PORTA (METAL)" selected={protecaoNR10 === "PROTEÇÃO C/ CONTRA PORTA (METAL)"}>PROTEÇÃO C/ CONTRA PORTA (METAL)</option> 
            </Select>  

            <div className="flex flex-col">
                <Button className="mt-10" variant="default" type="button" onClick={onSubmit}>Próximo</Button>
            </div>
        </div>
    );
}