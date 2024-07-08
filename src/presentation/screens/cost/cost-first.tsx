import { useEffect, useState } from "react";
import { ProposalData, fieldLabels, useProposal } from "../../contexts/proposal";
import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/button";
import { Input } from "../../shared/input";
import { Select } from "../../shared/select";

export function CostFirst() {
    const navigate = useNavigate()

    const [equipmentType, setEqupmentType] = useState('')
    const [nominalVoltage, setNominalVoltage] = useState('')
    const [outputCurrent, setOutputCurrent] = useState('')
    const [nominalInputVoltage, setNominalInputVoltage] = useState('')
    const [nominalFrequency, setNominalFrequency] = useState('')
    const [powerFactor, setPowerFactor] = useState('')
    const [tolerance, setTolerance] = useState('')
    const [efficiency, setEfficiency] = useState('')
    const [batteryType, setBatteryType] = useState('')
    const [numberOfElements, setNumberOfElements] = useState('')
    const [capacity, setCapacity] = useState('')
    const [voltageFluctuation, setVoltageFluctuation] = useState('')
    const [voltageLoad, setVoltageLoad] = useState('')
    const [voltageDeepDischarge, setVoltageDeepDischarge] = useState('')

    const [errors, setErrors] = useState<Partial<Record<keyof ProposalData, string>>>({})
    const [canGo, setCanGo] = useState(false)

    const { data, handleData } = useProposal()

    const onSubmit = async () => {
        handleData({ equipmentType, nominalVoltage, outputCurrent, nominalInputVoltage, nominalFrequency, powerFactor, tolerance, efficiency, batteryType, numberOfElements, capacity, voltageFluctuation, voltageLoad, voltageDeepDischarge })
        setCanGo(true)
    }

    useEffect(() => {
        setEqupmentType(data.equipmentType)
        setNominalVoltage(data.nominalVoltage)
        setOutputCurrent(data.outputCurrent)
        setNominalInputVoltage(data.nominalInputVoltage)
        setNominalFrequency(data.nominalFrequency)
        setPowerFactor(data.powerFactor)
        setTolerance(data.tolerance)
        setEfficiency(data.efficiency)
        setBatteryType(data.batteryType)
        setNumberOfElements(data.numberOfElements)
        setCapacity(data.capacity)
        setVoltageFluctuation(data.voltageFluctuation)
        setVoltageLoad(data.voltageLoad)
        setVoltageDeepDischarge(data.voltageDeepDischarge)
    }, [])

    useEffect(() => {
        if(canGo) {
            const fields: (keyof ProposalData)[] = ['equipmentType', 'nominalVoltage', 'outputCurrent', 'nominalInputVoltage', 'nominalFrequency', 'powerFactor', 'tolerance', 'efficiency', 'batteryType', 'numberOfElements', 'capacity', 'voltageFluctuation', 'voltageLoad', 'voltageDeepDischarge'];
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

            <Select label="Tipo de Equipamento" error={errors.equipmentType} onChange={(e) => setEqupmentType(e.target.value)} value={equipmentType}>
                <option value="">Selecione...</option>
                <option value="SPRS" selected={equipmentType === "SPRS"}>SPRS</option>
                <option value="Exportação" selected={equipmentType === "Exportação"}>TPRS</option>
                <option value="Industrialização" selected={equipmentType === "Industrialização"}>SMRD</option>
            </Select>

            <Select label="Tensão Nominal (Vcc)" error={errors.nominalVoltage} onChange={(e) => setNominalVoltage(e.target.value)} value={nominalVoltage}>
                <option value="">Selecione...</option>
                <option value="24" selected={nominalVoltage === "24"}>24V</option>
                <option value="48" selected={nominalVoltage === "48"}>48V</option>
                <option value="110" selected={nominalVoltage === "110"}>110V</option>
                <option value="125" selected={nominalVoltage === "125"}>125V</option>
                <option value="220" selected={nominalVoltage === "220"}>220V</option>
                <option value="OUTROS" selected={nominalVoltage === "OUTROS"}>OUTROS</option>
            </Select>

            <Select label="Corrente de Saída (A)" error={errors.outputCurrent} onChange={(e) => setOutputCurrent(e.target.value)} value={outputCurrent}>
                <option value="">Selecione...</option>
                <option value="10" selected={outputCurrent === "10"}>10A</option>
                <option value="15" selected={outputCurrent === "15"}>15A</option>
                <option value="25" selected={outputCurrent === "25"}>25A</option>
                <option value="35" selected={outputCurrent === "35"}>35A</option>
                <option value="50" selected={outputCurrent === "50"}>50A</option>
                <option value="75" selected={outputCurrent === "75"}>75A</option>
                <option value="100" selected={outputCurrent === "100"}>100A</option>
                <option value="125" selected={outputCurrent === "125"}>125A</option>
                <option value="150" selected={outputCurrent === "150"}>150A</option>
                <option value="175" selected={outputCurrent === "175"}>175A</option>
                <option value="200" selected={outputCurrent === "200"}>200A</option>
                <option value="250" selected={outputCurrent === "250"}>250A</option>
                <option value="300" selected={outputCurrent === "300"}>300A</option>
                <option value="400" selected={outputCurrent === "400"}>400A</option>
                <option value="450" selected={outputCurrent === "450"}>450A</option>
                <option value="500" selected={outputCurrent === "500"}>500A</option>
                <option value="600" selected={outputCurrent === "600"}>600A</option>
                <option value="700" selected={outputCurrent === "700"}>700A</option>
                <option value="800" selected={outputCurrent === "800"}>800A</option>
            </Select>

            <div className="flex flex-col">
                <p className="font-semibold text-slate-800 text-sm mt-6 mb-2">2 - Características Entrada Corrente Alternada</p>
            </div>

            <Select label="Tensão Nominal Entrada (Vca)" error={errors.nominalInputVoltage} onChange={(e) => setNominalInputVoltage(e.target.value)} value={nominalInputVoltage}>
                <option value="">Selecione...</option>
                <option value="110" selected={nominalInputVoltage === "110"}>110V</option>
                <option value="220" selected={nominalInputVoltage === "220"}>220V</option>
                <option value="380" selected={nominalInputVoltage === "380"}>380V</option>
                <option value="400" selected={nominalInputVoltage === "400"}>400V</option>
                <option value="440" selected={nominalInputVoltage === "440"}>440V</option>
                <option value="460" selected={nominalInputVoltage === "460"}>460V</option>
                <option value="480" selected={nominalInputVoltage === "480"}>480V</option>
                <option value="690" selected={nominalInputVoltage === "690"}>690V</option>
            </Select>

            <Select label="Tensão Nominal Entrada (Vca)" error={errors.nominalFrequency} onChange={(e) => setNominalFrequency(e.target.value)} value={nominalFrequency}>
                <option value="">Selecione...</option>
                <option value="50" selected={nominalFrequency === "50"}>50Hz</option>
                <option value="60" selected={nominalFrequency === "60"}>60Hz</option>
            </Select>

            <Select label="Fator de Potência" error={errors.powerFactor} onChange={(e) => setPowerFactor(e.target.value)} value={powerFactor}>
                <option value="">Selecione...</option>
                <option value="0.7" selected={powerFactor === "0.7"}>≥70% (PADRÃO)</option>
                <option value="0.8" selected={powerFactor === "0.8"}>≥80%</option>
                <option value="0.85" selected={powerFactor === "0.85"}>≥85%</option>
                <option value="0.90" selected={powerFactor === "0.90"}>≥90%</option>
                <option value="0.92" selected={powerFactor === "0.92"}>≥92%</option>
            </Select>

            <Select label="Tolerância (%)" error={errors.tolerance} onChange={(e) => setTolerance(e.target.value)} value={tolerance}>
                <option value="">Selecione...</option>
                <option value="0.1" selected={tolerance === "0.1"}>10% (PADRÃO)</option>
                <option value="0.15" selected={tolerance === "0.15"}>15%</option>
                <option value="0.20" selected={tolerance === "0.20"}>20%</option>
            </Select>


            <Select label="Rendimento (%)" error={errors.efficiency} onChange={(e) => setEfficiency(e.target.value)} value={efficiency}>
                <option value="">Selecione...</option>
                <option value="0.8" selected={efficiency === "0.8"}>≥ 80%</option>
                <option value="0.85" selected={efficiency === "0.85"}>≥ 85%</option>
                <option value="0.88" selected={efficiency === "0.88"}>≥ 88%</option>
                <option value="0.90" selected={efficiency === "0.90"}>≥ 90%</option>
                <option value="0.95" selected={efficiency === "0.95"}>≥ 95%</option>
            </Select>

            <div className="flex flex-col">
                <p className="font-semibold text-slate-800 text-sm mt-6 mb-2">3 -Características Banco de Baterias</p>
            </div>

            <Select label="Tipo de Baterias" error={errors.batteryType} onChange={(e) => setBatteryType(e.target.value)} value={batteryType}>
                <option value="">Selecione...</option>
                <option value="VENTILADA" selected={batteryType === "VENTILADA"}>VENTILADA</option>
                <option value="ALCALINA" selected={batteryType === "ALCALINA"}>ALCALINA</option>
                <option value="SELADA" selected={batteryType === "SELADA"}>SELADA</option>
                <option value="VRLA" selected={batteryType === "VRLA"}>VRLA</option>
                <option value="GEL E AGM" selected={batteryType === "GEL E AGM"}>GEL E AGM</option>
                <option value="OUTROS" selected={batteryType === "OUTROS"}>OUTROS</option>
            </Select>

            <Select label="Número de Elementos" error={errors.numberOfElements} onChange={(e) => setNumberOfElements(e.target.value)} value={numberOfElements}>
                <option value="">Selecione...</option>
                {Array.from({ length: 300 }, (_, index) => (
                    <option key={index + 1} value={index + 1} selected={numberOfElements === `${index + 1}`}>
                        {index + 1}
                    </option>
                ))}            
            </Select>


            <Select label="Capacidade A/h" error={errors.capacity} onChange={(e) => setCapacity(e.target.value)} value={capacity}>
                <option value="">Selecione...</option>
                {Array.from({ length: 2200 }, (_, index) => (
                    <option key={index + 1} value={index + 1} selected={capacity === `${index + 1}`}>
                        {`${index + 1}A`}
                    </option>
                ))}            
            </Select>

            <div className="flex">
                <div className="flex-1 mr-2">
                    <Select label="V. de Flutuação V/el." error={errors.batteryType} onChange={(e) => setVoltageFluctuation(e.target.value)} value={voltageFluctuation}>
                        <option value="">Selecione...</option>
                        <option value="1.2" selected={voltageFluctuation === "1.2"}>1,2</option>
                        <option value="1.25" selected={voltageFluctuation === "1.25"}>1,25</option>
                        <option value="1.3" selected={voltageFluctuation === "1.3"}>1,3</option>
                        <option value="1.35" selected={voltageFluctuation === "1.35"}>1,35</option>
                        <option value="1.4" selected={voltageFluctuation === "1.4"}>1,4</option>
                        <option value="1.45" selected={voltageFluctuation === "1.45"}>1,45</option>
                        <option value="1.5" selected={voltageFluctuation === "1.5"}>1,5</option>
                        <option value="2.2" selected={voltageFluctuation === "2.2"}>2,2</option>
                        <option value="2.25" selected={voltageFluctuation === "2.25"}>2,25</option>
                        <option value="2.35" selected={voltageFluctuation === "2.35"}>2,35</option>
                    </Select>
                </div>

                <div className="flex-2">
                    <Input className="" label="V. de Flutuação" disabled placeholder="Digite aqui" type="text" value={'10'} />
                </div>
            </div>
            
            <div className="flex">
                <div className="flex-1 mr-2">
                    <Select label="V. de Carga V/el" error={errors.voltageLoad} onChange={(e) => setVoltageLoad(e.target.value)} value={voltageLoad}>
                        <option value="">Selecione...</option>
                        <option value="1.25" selected={voltageLoad === "1.25"}>1,25</option>
                        <option value="1.3" selected={voltageLoad === "1.3"}>1,3</option>
                        <option value="1.35" selected={voltageLoad === "1.35"}>1,35</option>
                        <option value="1.4" selected={voltageLoad === "1.4"}>1,4</option>
                        <option value="1.45" selected={voltageLoad === "1.45"}>1,45</option>
                        <option value="1.5" selected={voltageLoad === "1.5"}>1,5</option>
                        <option value="2.2" selected={voltageLoad === "2.2"}>2,2</option>
                        <option value="2.25" selected={voltageLoad === "2.25"}>2,25</option>
                        <option value="2.27" selected={voltageLoad === "2.27"}>2,27</option>
                        <option value="2.3" selected={voltageLoad === "2.3"}>2,3</option>
                        <option value="2.35" selected={voltageLoad === "2.35"}>2,35</option>
                        <option value="2.4" selected={voltageLoad === "2.4"}>2,4</option>
                        <option value="2.45" selected={voltageLoad === "2.45"}>2,45</option>
                    </Select>
                </div>

                <div className="flex-2">
                    <Input className="" label="Voltagem de Carga" disabled placeholder="Digite aqui" type="text" value={'10'} />
                </div>
            </div>

            <div className="flex">
                <div className="flex-1 mr-2">
                    <Select label="V. de Carga Profunda V/el" error={errors.voltageDeepDischarge} onChange={(e) => setVoltageDeepDischarge(e.target.value)} value={voltageDeepDischarge}>
                        <option value="">Selecione...</option>
                        <option value="1.55" selected={voltageDeepDischarge === "1.55"}>1,55</option>
                        <option value="1.6" selected={voltageDeepDischarge === "1.6"}>1,6</option>
                        <option value="1.65" selected={voltageDeepDischarge === "1.65"}>1,65</option>
                        <option value="1.7" selected={voltageDeepDischarge === "1.7"}>1,7</option>
                        <option value="2.45" selected={voltageDeepDischarge === "2.45"}>2,45</option>
                        <option value="2.5" selected={voltageDeepDischarge === "2.5"}>2,5</option>
                        <option value="2.55" selected={voltageDeepDischarge === "2.55"}>2,55</option>
                        <option value="2.6" selected={voltageDeepDischarge === "2.6"}>2,6</option>
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