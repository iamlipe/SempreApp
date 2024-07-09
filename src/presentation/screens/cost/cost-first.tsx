import { useEffect, useState } from "react";
import { ProposalData, fieldLabels, useProposal } from "../../contexts/proposal";
import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/button";
import { Input } from "../../shared/input";
import { Select } from "../../shared/select";

export function CostFirst() {
    const navigate = useNavigate()

    const [tipoDeEquipamento, setTipoDeEquipamento] = useState('')
    const [tensaoNominal, setTensaoNominal] = useState('')
    const [correnteDeSaida, setCorrenteDeSaida] = useState('')
    const [tensaoNominalDeEntrada, setTensaoNominalDeEntrada] = useState('')
    const [frequenciaNominal, setFrequenciaNominal] = useState('')
    const [fatorDePotencia, setFatorDePotencia] = useState('')
    const [tolerancia, setTolerancia] = useState('')
    const [rendimento, setRendimento] = useState('')
    const [tipoDeBateria, setTipoDeBateria] = useState('')
    const [numeroDeElementos, setNumeroDeElementos] = useState('')
    const [capacidade, setCapacidade] = useState('')
    const [voltagemDeFlutuacao, setVoltagemDeFlutuacao] = useState('')
    const [voltagemDeCarga, setVoltagemDeCarga] = useState('')
    const [voltagemDeCargaProfunda, setVoltagemDeCargaProfunda] = useState('')

    const [errors, setErrors] = useState<Partial<Record<keyof ProposalData, string>>>({})
    const [canGo, setCanGo] = useState(false)

    const { data, handleData } = useProposal()

    const onSubmit = async () => {
        handleData({ 
            tipo_de_equipamento: tipoDeEquipamento, 
            tensao_nominal: tensaoNominal, 
            corrente_de_saida: correnteDeSaida, 
            tensao_nominal_entrada: tensaoNominalDeEntrada, 
            frequencia_nominal: frequenciaNominal, 
            fator_de_potencia: fatorDePotencia, 
            tolerancia: tolerancia, 
            rendimento: rendimento, 
            tipo_de_bateria: tipoDeBateria, 
            numero_de_elementos: numeroDeElementos, 
            capacidade: capacidade,
            voltagem_de_flutuacao: voltagemDeFlutuacao, 
            voltagem_de_carga: voltagemDeCarga, 
            voltagem_de_carga_profunda: voltagemDeCargaProfunda 
        })
        setCanGo(true)
    }

    useEffect(() => {
        setTipoDeEquipamento(data.tipo_de_equipamento)
        setTensaoNominal(data.tensao_nominal)
        setCorrenteDeSaida(data.corrente_de_saida)
        setTensaoNominalDeEntrada(data.tensao_nominal_entrada)
        setFrequenciaNominal(data.frequencia_nominal)
        setFatorDePotencia(data.fator_de_potencia)
        setTolerancia(data.tolerancia)
        setRendimento(data.rendimento)
        setTipoDeBateria(data.tipo_de_bateria)
        setNumeroDeElementos(data.numero_de_elementos)
        setCapacidade(data.capacidade)
        setVoltagemDeFlutuacao(data.voltagem_de_flutuacao)
        setVoltagemDeCarga(data.voltagem_de_carga)
        setVoltagemDeCargaProfunda(data.voltagem_de_carga_profunda)
    }, [])

    useEffect(() => {
        if(canGo) {
            const fields: (keyof ProposalData)[] = [
                'tipo_de_equipamento', 
                'tensao_nominal', 
                'corrente_de_saida', 
                'tensao_nominal_entrada', 
                'frequencia_nominal', 
                'fator_de_potencia', 
                'tolerancia', 
                'rendimento', 
                'tipo_de_bateria', 
                'numero_de_elementos', 
                'capacidade', 
                'voltagem_de_flutuacao', 
                'voltagem_de_carga', 
                'voltagem_de_carga_profunda'
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
                navigate('/cost/second');
                setCanGo(false)
            } else {
                setErrors(errorsResponse);
                setCanGo(false);
            }
        }
    }, [data, canGo]);

    return (
        <div className="flex flex-col space-y-2">
            <p className="font-semibold text-slate-800 text-sm mb-4">1 - Características Básicas</p>

            <Select label="Tipo de Equipamento" error={errors.tipo_de_equipamento} onChange={(e) => setTipoDeEquipamento(e.target.value)} value={tipoDeEquipamento}>
                <option value="">Selecione...</option>
                <option value="SPRS" selected={tipoDeEquipamento === "SPRS"}>SPRS</option>
                <option value="Exportação" selected={tipoDeEquipamento === "Exportação"}>TPRS</option>
                <option value="Industrialização" selected={tipoDeEquipamento === "Industrialização"}>SMRD</option>
            </Select>

            <Select label="Tensão Nominal (Vcc)" error={errors.tensao_nominal} onChange={(e) => setTensaoNominal(e.target.value)} value={tensaoNominal}>
                <option value="">Selecione...</option>
                <option value="24" selected={tensaoNominal === "24"}>24V</option>
                <option value="48" selected={tensaoNominal === "48"}>48V</option>
                <option value="110" selected={tensaoNominal === "110"}>110V</option>
                <option value="125" selected={tensaoNominal === "125"}>125V</option>
                <option value="220" selected={tensaoNominal === "220"}>220V</option>
                <option value="OUTROS" selected={tensaoNominal === "OUTROS"}>OUTROS</option>
            </Select>

            <Select label="Corrente de Saída (A)" error={errors.corrente_de_saida} onChange={(e) => setCorrenteDeSaida(e.target.value)} value={correnteDeSaida}>
                <option value="">Selecione...</option>
                <option value="10" selected={correnteDeSaida === "10"}>10A</option>
                <option value="15" selected={correnteDeSaida === "15"}>15A</option>
                <option value="25" selected={correnteDeSaida === "25"}>25A</option>
                <option value="35" selected={correnteDeSaida === "35"}>35A</option>
                <option value="50" selected={correnteDeSaida === "50"}>50A</option>
                <option value="75" selected={correnteDeSaida === "75"}>75A</option>
                <option value="100" selected={correnteDeSaida === "100"}>100A</option>
                <option value="125" selected={correnteDeSaida === "125"}>125A</option>
                <option value="150" selected={correnteDeSaida === "150"}>150A</option>
                <option value="175" selected={correnteDeSaida === "175"}>175A</option>
                <option value="200" selected={correnteDeSaida === "200"}>200A</option>
                <option value="250" selected={correnteDeSaida === "250"}>250A</option>
                <option value="300" selected={correnteDeSaida === "300"}>300A</option>
                <option value="400" selected={correnteDeSaida === "400"}>400A</option>
                <option value="450" selected={correnteDeSaida === "450"}>450A</option>
                <option value="500" selected={correnteDeSaida === "500"}>500A</option>
                <option value="600" selected={correnteDeSaida === "600"}>600A</option>
                <option value="700" selected={correnteDeSaida === "700"}>700A</option>
                <option value="800" selected={correnteDeSaida === "800"}>800A</option>
            </Select>

            <div className="flex flex-col">
                <p className="font-semibold text-slate-800 text-sm mt-6 mb-2">2 - Características Entrada Corrente Alternada</p>
            </div>

            <Select label="Tensão Nominal Entrada (Vca)" error={errors.tensao_nominal_entrada} onChange={(e) => setTensaoNominalDeEntrada(e.target.value)} value={tensaoNominalDeEntrada}>
                <option value="">Selecione...</option>
                <option value="110" selected={tensaoNominalDeEntrada === "110"}>110V</option>
                <option value="220" selected={tensaoNominalDeEntrada === "220"}>220V</option>
                <option value="380" selected={tensaoNominalDeEntrada === "380"}>380V</option>
                <option value="400" selected={tensaoNominalDeEntrada === "400"}>400V</option>
                <option value="440" selected={tensaoNominalDeEntrada === "440"}>440V</option>
                <option value="460" selected={tensaoNominalDeEntrada === "460"}>460V</option>
                <option value="480" selected={tensaoNominalDeEntrada === "480"}>480V</option>
                <option value="690" selected={tensaoNominalDeEntrada === "690"}>690V</option>
            </Select>

            <Select label="Tensão Nominal Entrada (Vca)" error={errors.frequencia_nominal} onChange={(e) => setFrequenciaNominal(e.target.value)} value={frequenciaNominal}>
                <option value="">Selecione...</option>
                <option value="50" selected={frequenciaNominal === "50"}>50Hz</option>
                <option value="60" selected={frequenciaNominal === "60"}>60Hz</option>
            </Select>

            <Select label="Fator de Potência" error={errors.fator_de_potencia} onChange={(e) => setFatorDePotencia(e.target.value)} value={fatorDePotencia}>
                <option value="">Selecione...</option>
                <option value="0.7" selected={fatorDePotencia === "0.7"}>≥70% (PADRÃO)</option>
                <option value="0.8" selected={fatorDePotencia === "0.8"}>≥80%</option>
                <option value="0.85" selected={fatorDePotencia === "0.85"}>≥85%</option>
                <option value="0.90" selected={fatorDePotencia === "0.90"}>≥90%</option>
                <option value="0.92" selected={fatorDePotencia === "0.92"}>≥92%</option>
            </Select>

            <Select label="Tolerância (%)" error={errors.tolerancia} onChange={(e) => setTolerancia(e.target.value)} value={tolerancia}>
                <option value="">Selecione...</option>
                <option value="0.1" selected={tolerancia === "0.1"}>10% (PADRÃO)</option>
                <option value="0.15" selected={tolerancia === "0.15"}>15%</option>
                <option value="0.20" selected={tolerancia === "0.20"}>20%</option>
            </Select>


            <Select label="Rendimento (%)" error={errors.rendimento} onChange={(e) => setRendimento(e.target.value)} value={rendimento}>
                <option value="">Selecione...</option>
                <option value="0.8" selected={rendimento === "0.8"}>≥ 80%</option>
                <option value="0.85" selected={rendimento === "0.85"}>≥ 85%</option>
                <option value="0.88" selected={rendimento === "0.88"}>≥ 88%</option>
                <option value="0.90" selected={rendimento === "0.90"}>≥ 90%</option>
                <option value="0.95" selected={rendimento === "0.95"}>≥ 95%</option>
            </Select>

            <div className="flex flex-col">
                <p className="font-semibold text-slate-800 text-sm mt-6 mb-2">3 -Características Banco de Baterias</p>
            </div>

            <Select label="Tipo de Baterias" error={errors.tipo_de_bateria} onChange={(e) => setTipoDeBateria(e.target.value)} value={tipoDeBateria}>
                <option value="">Selecione...</option>
                <option value="VENTILADA" selected={tipoDeBateria === "VENTILADA"}>VENTILADA</option>
                <option value="ALCALINA" selected={tipoDeBateria === "ALCALINA"}>ALCALINA</option>
                <option value="SELADA" selected={tipoDeBateria === "SELADA"}>SELADA</option>
                <option value="VRLA" selected={tipoDeBateria === "VRLA"}>VRLA</option>
                <option value="GEL E AGM" selected={tipoDeBateria === "GEL E AGM"}>GEL E AGM</option>
                <option value="OUTROS" selected={tipoDeBateria === "OUTROS"}>OUTROS</option>
            </Select>

            <Select label="Número de Elementos" error={errors.numero_de_elementos} onChange={(e) => setNumeroDeElementos(e.target.value)} value={numeroDeElementos}>
                <option value="">Selecione...</option>
                {Array.from({ length: 300 }, (_, index) => (
                    <option key={index + 1} value={index + 1} selected={numeroDeElementos === `${index + 1}`}>
                        {index + 1}
                    </option>
                ))}            
            </Select>


            <Select label="Capacidade A/h" error={errors.capacidade} onChange={(e) => setCapacidade(e.target.value)} value={capacidade}>
                <option value="">Selecione...</option>
                {Array.from({ length: 2200 }, (_, index) => (
                    <option key={index + 1} value={index + 1} selected={capacidade === `${index + 1}`}>
                        {`${index + 1}A`}
                    </option>
                ))}            
            </Select>

            <div className="flex">
                <div className="flex-1 mr-2">
                    <Select label="V. de Flutuação V/el." error={errors.voltagem_de_flutuacao} onChange={(e) => setVoltagemDeFlutuacao(e.target.value)} value={voltagemDeFlutuacao}>
                        <option value="">Selecione...</option>
                        <option value="1.2" selected={voltagemDeFlutuacao === "1.2"}>1,2</option>
                        <option value="1.25" selected={voltagemDeFlutuacao === "1.25"}>1,25</option>
                        <option value="1.3" selected={voltagemDeFlutuacao === "1.3"}>1,3</option>
                        <option value="1.35" selected={voltagemDeFlutuacao === "1.35"}>1,35</option>
                        <option value="1.4" selected={voltagemDeFlutuacao === "1.4"}>1,4</option>
                        <option value="1.45" selected={voltagemDeFlutuacao === "1.45"}>1,45</option>
                        <option value="1.5" selected={voltagemDeFlutuacao === "1.5"}>1,5</option>
                        <option value="2.2" selected={voltagemDeFlutuacao === "2.2"}>2,2</option>
                        <option value="2.25" selected={voltagemDeFlutuacao === "2.25"}>2,25</option>
                        <option value="2.35" selected={voltagemDeFlutuacao === "2.35"}>2,35</option>
                    </Select>
                </div>

                <div className="flex-2">
                    <Input className="" label="V. de Flutuação" disabled placeholder="Digite aqui" type="text" value={'10'} />
                </div>
            </div>
            
            <div className="flex">
                <div className="flex-1 mr-2">
                    <Select label="V. de Carga V/el" error={errors.voltagem_de_carga} onChange={(e) => setVoltagemDeCarga(e.target.value)} value={voltagemDeCarga}>
                        <option value="">Selecione...</option>
                        <option value="1.25" selected={voltagemDeCarga === "1.25"}>1,25</option>
                        <option value="1.3" selected={voltagemDeCarga === "1.3"}>1,3</option>
                        <option value="1.35" selected={voltagemDeCarga === "1.35"}>1,35</option>
                        <option value="1.4" selected={voltagemDeCarga === "1.4"}>1,4</option>
                        <option value="1.45" selected={voltagemDeCarga === "1.45"}>1,45</option>
                        <option value="1.5" selected={voltagemDeCarga === "1.5"}>1,5</option>
                        <option value="2.2" selected={voltagemDeCarga === "2.2"}>2,2</option>
                        <option value="2.25" selected={voltagemDeCarga === "2.25"}>2,25</option>
                        <option value="2.27" selected={voltagemDeCarga === "2.27"}>2,27</option>
                        <option value="2.3" selected={voltagemDeCarga === "2.3"}>2,3</option>
                        <option value="2.35" selected={voltagemDeCarga === "2.35"}>2,35</option>
                        <option value="2.4" selected={voltagemDeCarga === "2.4"}>2,4</option>
                        <option value="2.45" selected={voltagemDeCarga === "2.45"}>2,45</option>
                    </Select>
                </div>

                <div className="flex-2">
                    <Input className="" label="Voltagem de Carga" disabled placeholder="Digite aqui" type="text" value={'10'} />
                </div>
            </div>

            <div className="flex">
                <div className="flex-1 mr-2">
                    <Select label="V. de Carga Profunda V/el" error={errors.voltagem_de_carga_profunda} onChange={(e) => setVoltagemDeCargaProfunda(e.target.value)} value={voltagemDeCargaProfunda}>
                        <option value="">Selecione...</option>
                        <option value="1.55" selected={voltagemDeCargaProfunda === "1.55"}>1,55</option>
                        <option value="1.6" selected={voltagemDeCargaProfunda === "1.6"}>1,6</option>
                        <option value="1.65" selected={voltagemDeCargaProfunda === "1.65"}>1,65</option>
                        <option value="1.7" selected={voltagemDeCargaProfunda === "1.7"}>1,7</option>
                        <option value="2.45" selected={voltagemDeCargaProfunda === "2.45"}>2,45</option>
                        <option value="2.5" selected={voltagemDeCargaProfunda === "2.5"}>2,5</option>
                        <option value="2.55" selected={voltagemDeCargaProfunda === "2.55"}>2,55</option>
                        <option value="2.6" selected={voltagemDeCargaProfunda === "2.6"}>2,6</option>
                    </Select>
                </div>

                <div className="flex-2">
                    <Input className="" label="V. de Carga Profunda" disabled placeholder="Digite aqui" type="text" value={'10'} />
                </div>
            </div>

            <div className="flex flex-col">
                <Button className="mt-10" variant="default" type="button" onClick={onSubmit}>Próximo</Button>
            </div>
        </div>
    );
}