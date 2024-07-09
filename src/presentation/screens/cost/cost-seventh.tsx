import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProposalData, fieldLabels, useProposal } from "../../contexts/proposal";
import { Button } from "../../shared/button";
import { Select } from "../../shared/select";
import { Radio } from "../../shared/radio";

export function CostSeventh() {
    const navigate = useNavigate()

    const [tipoDeInstrumento, setTipoDeInstrumento] = useState('')
    const [instrumentoDeMedicaoVoltimetroCorrenteContinua, setInstrumentoDeMedicaoVoltimetroCorrenteContinua] = useState('')
    const [instrumentoDeMedicaoVoltimetroCorrenteAlternada, setInstrumentoDeMedicaoVoltimetroCorrenteAlternada] = useState('')
    const [instrumentoDeMedicaoAmperimetroCorrenteContinua, setInstrumentoDeMedicaoAmperimetroCorrenteContinua] = useState('')
    const [instrumentoDeMedicaoAmperimetroCorrenteAlternada, setInstrumentoDeMedicaoAmperimetroCorrenteAlternada] = useState('')
    const [transdutorQuatroAVinteMATensao, setTransdutorQuatroAVinteMATensao] = useState('')
    const [transdutorQuatroAVinteMACorrente, setTransdutorQuatroAVinteMACorrente] = useState('')

    const [errors, setErrors] = useState<Partial<Record<keyof ProposalData, string>>>({})
    const [canGo, setCanGo] = useState(false)

    const { data, handleData } = useProposal()

    const onSubmit = async () => {
        handleData({ 
            tipo_de_instrumento: tipoDeInstrumento, 
            instrumento_de_medicao_voltimetro_corrente_continua: instrumentoDeMedicaoVoltimetroCorrenteContinua, 
            instrumento_de_medicao_voltimetro_corrente_alternada: instrumentoDeMedicaoVoltimetroCorrenteAlternada, 
            instrumento_de_medicao_amperimetro_corrente_continua: instrumentoDeMedicaoAmperimetroCorrenteContinua, 
            instrumento_de_medicao_amperimetro_corrente_alternada: instrumentoDeMedicaoAmperimetroCorrenteAlternada, 
            transdutor_quatro_a_vinte_ma_tensao: transdutorQuatroAVinteMATensao, 
            transdutor_quatro_a_vinte_ma_corrente: transdutorQuatroAVinteMACorrente 
        })
        setCanGo(true)
    }

    useEffect(() => {
        setTipoDeInstrumento(data.tipo_de_instrumento)
        setInstrumentoDeMedicaoVoltimetroCorrenteContinua(data.instrumento_de_medicao_voltimetro_corrente_continua)
        setInstrumentoDeMedicaoVoltimetroCorrenteAlternada(data.instrumento_de_medicao_voltimetro_corrente_continua)
        setInstrumentoDeMedicaoAmperimetroCorrenteContinua(data.instrumento_de_medicao_amperimetro_corrente_continua)
        setInstrumentoDeMedicaoAmperimetroCorrenteAlternada(data.instrumento_de_medicao_amperimetro_corrente_alternada)
        setTransdutorQuatroAVinteMATensao(data.transdutor_quatro_a_vinte_ma_tensao)
        setTransdutorQuatroAVinteMACorrente(data.transdutor_quatro_a_vinte_ma_corrente)
    }, [])

    useEffect(() => {
        if(canGo) {
            const fields: (keyof ProposalData)[] = [
                'tipo_de_instrumento', 
                'instrumento_de_medicao_voltimetro_corrente_continua', 
                'instrumento_de_medicao_voltimetro_corrente_alternada', 
                'instrumento_de_medicao_amperimetro_corrente_continua', 
                'instrumento_de_medicao_amperimetro_corrente_alternada', 
                'transdutor_quatro_a_vinte_ma_tensao', 
                'transdutor_quatro_a_vinte_ma_corrente'
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
                navigate('/cost/eighth');
                setCanGo(false)
            } else {
                setErrors(errorsResponse);
                setCanGo(false);
            }
        }
    }, [data, canGo]);

    return (
        <div className="flex flex-col space-y-2">
            <p className="font-semibold text-slate-800 text-sm mb-4">11 - Voltímetro e Transdutores</p>

            <Radio
                label="Tipo de Instrumento"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={tipoDeInstrumento}
                onChange={(e) => setTipoDeInstrumento(e)}
                error={errors.tipo_de_instrumento}
            />

            <Radio
                label="Inst. de medição Voltímetro CC"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={ instrumentoDeMedicaoVoltimetroCorrenteContinua === "Não" ? 'Não' : instrumentoDeMedicaoVoltimetroCorrenteContinua !== "" ? "Sim" : ""}
                onChange={(e) => { 
                    if (e === "Não") {
                        setInstrumentoDeMedicaoVoltimetroCorrenteContinua(e)
                    } else {
                        setInstrumentoDeMedicaoVoltimetroCorrenteContinua("")
                    }
                    } }
                error={ instrumentoDeMedicaoVoltimetroCorrenteContinua === "Não" ? "" : errors.instrumento_de_medicao_voltimetro_corrente_continua}
            />

            { instrumentoDeMedicaoVoltimetroCorrenteContinua !== "Não" ?      
                <Select error={errors.instrumento_de_medicao_voltimetro_corrente_continua} onChange={(e) => setInstrumentoDeMedicaoVoltimetroCorrenteContinua(e.target.value)} value={instrumentoDeMedicaoVoltimetroCorrenteContinua}>
                    <option value="">Selecione...</option>
                    <option value="P/ BATERIA (Vcc)" selected={instrumentoDeMedicaoVoltimetroCorrenteContinua === "P/ BATERIA (Vcc)"}>P/ BATERIA (Vcc)</option>
                    <option value="P/ CONSUMIDOR (Vcc)" selected={instrumentoDeMedicaoVoltimetroCorrenteContinua === "P/ CONSUMIDOR (Vcc)"}>P/ CONSUMIDOR (Vcc)</option>
                    <option value="CONSUMIDOR + BATERIA (Vcc)" selected={instrumentoDeMedicaoVoltimetroCorrenteContinua === "CONSUMIDOR + BATERIA (Vcc)"}>CONSUMIDOR + BATERIA (Vcc)</option>
                </Select>   
            : null }

            <Radio
                label="Inst. de medição Voltímetro CA"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={ instrumentoDeMedicaoVoltimetroCorrenteAlternada === "Não" ? 'Não' : instrumentoDeMedicaoVoltimetroCorrenteAlternada !== "" ? "Sim" : ""}
                onChange={(e) => {
                    if (e === "Não") {
                        setInstrumentoDeMedicaoVoltimetroCorrenteAlternada(e)
                    } else {
                        setInstrumentoDeMedicaoVoltimetroCorrenteAlternada("")
                    } 
                } }
                error={ instrumentoDeMedicaoVoltimetroCorrenteAlternada === "Não" ? "" : errors.instrumento_de_medicao_voltimetro_corrente_alternada}
            />

            { instrumentoDeMedicaoVoltimetroCorrenteAlternada !== "Não" ?    
                <Select error={errors.instrumento_de_medicao_voltimetro_corrente_alternada} onChange={(e) => setInstrumentoDeMedicaoVoltimetroCorrenteAlternada(e.target.value)} value={instrumentoDeMedicaoVoltimetroCorrenteAlternada}>
                    <option value="">Selecione...</option>
                    <option value="KIT VCA s/TP c/CH ROTATIVA" selected={instrumentoDeMedicaoVoltimetroCorrenteAlternada === "KIT VCA s/TP c/CH ROTATIVA"}>KIT VCA s/TP c/CH ROTATIVA</option>
                    <option value="KIT VCA c/TP E CH ROTATIVA" selected={instrumentoDeMedicaoVoltimetroCorrenteAlternada === "KIT VCA c/TP E CH ROTATIVA"}>KIT VCA c/TP E CH ROTATIVA</option>
                </Select>   
            : null }

            <Radio
                label="Inst. de medição Amperim. CC"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={ instrumentoDeMedicaoAmperimetroCorrenteContinua === "Não" ? 'Não'  : instrumentoDeMedicaoAmperimetroCorrenteContinua !== "" ? "Sim" : ""}
                onChange={(e) => { 
                    if (e === "Não") {
                        setInstrumentoDeMedicaoVoltimetroCorrenteAlternada(e)
                    } else {
                        setInstrumentoDeMedicaoVoltimetroCorrenteAlternada("")
                    }  } }
                error={instrumentoDeMedicaoAmperimetroCorrenteContinua === "Não" ? "" : errors.instrumento_de_medicao_amperimetro_corrente_continua}
            />

            { instrumentoDeMedicaoAmperimetroCorrenteContinua !== "Não" ?        
                <Select error={errors.instrumento_de_medicao_amperimetro_corrente_continua} onChange={(e) => setInstrumentoDeMedicaoAmperimetroCorrenteContinua(e.target.value)} value={instrumentoDeMedicaoAmperimetroCorrenteContinua}>
                    <option value="">Selecione...</option>
                    <option value="P/ BATERIA (Acc)" selected={instrumentoDeMedicaoAmperimetroCorrenteContinua === "P/ BATERIA (Acc)"}>P/ BATERIA (Acc)</option>
                    <option value="P/ CONSUMIDOR (Acc)" selected={instrumentoDeMedicaoAmperimetroCorrenteContinua === "P/ CONSUMIDOR (Acc)"}>P/ CONSUMIDOR (Acc)</option>
                    <option value="CONSUMIDOR + BATERIA (Acc)" selected={instrumentoDeMedicaoAmperimetroCorrenteContinua === "CONSUMIDOR + BATERIA (Acc)"}>CONSUMIDOR + BATERIA (Acc)</option>
                </Select>   
            : null }

            <Radio
                label="Inst. de medição Amperim. CA"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={ instrumentoDeMedicaoAmperimetroCorrenteAlternada === "Não" ? 'Não' : instrumentoDeMedicaoAmperimetroCorrenteAlternada !== "" ? "Sim" : ""}
                onChange={(e) => {
                    if (e === "Não") {
                        setInstrumentoDeMedicaoAmperimetroCorrenteAlternada(e)
                    } else {
                        setInstrumentoDeMedicaoAmperimetroCorrenteAlternada("")
                    } } }
                error={instrumentoDeMedicaoAmperimetroCorrenteAlternada === "Não" ? "" : errors.instrumento_de_medicao_amperimetro_corrente_alternada}
            />

            { instrumentoDeMedicaoAmperimetroCorrenteAlternada !== "Não" ?      
                <Select error={errors.instrumento_de_medicao_amperimetro_corrente_alternada} onChange={(e) => setInstrumentoDeMedicaoAmperimetroCorrenteAlternada(e.target.value)} value={instrumentoDeMedicaoAmperimetroCorrenteAlternada}>
                    <option value="">Selecione...</option>
                    <option value="KIT VCA c/TC c/CH ROTATIVA (Aca)" selected={instrumentoDeMedicaoAmperimetroCorrenteAlternada === "KIT VCA c/TC c/CH ROTATIVA (Aca)"}>KIT VCA c/TC c/CH ROTATIVA (Aca)</option>
                </Select>   
            : null }

            <Radio
                label="Transdutor 4-20ma tensão"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={ transdutorQuatroAVinteMATensao === "Não" ? 'Não' : transdutorQuatroAVinteMATensao !== "" ? "Sim" : ""}
                onChange={(e) => { 
                    if (e === "Não") {
                        setTransdutorQuatroAVinteMATensao(e)
                    } else {
                        setTransdutorQuatroAVinteMATensao("")
                    } } }
                error={transdutorQuatroAVinteMATensao === "Não" ? "" : errors.transdutor_quatro_a_vinte_ma_tensao}
            />

            { transdutorQuatroAVinteMATensao !== "Não" ?         
                <Select  error={errors.transdutor_quatro_a_vinte_ma_tensao} onChange={(e) => setTransdutorQuatroAVinteMATensao(e.target.value)} value={transdutorQuatroAVinteMATensao}>
                    <option value="">Selecione...</option>
                    <option value="P/ BATERIA (Vcc)" selected={transdutorQuatroAVinteMATensao === "P/ BATERIA (Vcc)"}>P/ BATERIA (Vcc)</option>
                    <option value="P/ CONSUMIDOR (Vcc)" selected={transdutorQuatroAVinteMATensao === "P/ CONSUMIDOR (Vcc)"}>P/ CONSUMIDOR (Vcc)</option>
                    <option value="Entrada (Vca)" selected={transdutorQuatroAVinteMATensao === "Entrada (Vca)"}>Entrada (Vca)</option>
                    <option value="CONSUMIDOR + BATERIA (Vcc)" selected={transdutorQuatroAVinteMATensao === "CONSUMIDOR + BATERIA (Vcc)"}>CONSUMIDOR + BATERIA (Vcc)</option>
                    <option value="CONSUMIDOR + BATERIA (Vcc) + ENTRADA (Vca)" selected={transdutorQuatroAVinteMATensao === "CONSUMIDOR + BATERIA (Vcc) + ENTRADA (Vca)"}>CONSUMIDOR + BATERIA (Vcc) + ENTRADA (Vca)</option>
                </Select>   
            : null }

            <Radio
                label="Transdutor 4-20ma corrente"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={ transdutorQuatroAVinteMACorrente === "Não" ? 'Não' : transdutorQuatroAVinteMACorrente !== "" ? "Sim" : ""}
                onChange={(e) => { 
                    if (e === "Não") {
                        setTransdutorQuatroAVinteMACorrente(e)
                    } else {
                        setTransdutorQuatroAVinteMACorrente("")
                    }
                 } }
                error={transdutorQuatroAVinteMACorrente === "Não" ? "" :  errors.transdutor_quatro_a_vinte_ma_corrente}
            />

            { transdutorQuatroAVinteMACorrente !== "Não" ?         
                <Select error={errors.transdutor_quatro_a_vinte_ma_corrente} onChange={(e) => setTransdutorQuatroAVinteMACorrente(e.target.value)} value={transdutorQuatroAVinteMACorrente}>
                    <option value="">Selecione...</option>
                    <option value="P/ BATERIA (Vcc)" selected={transdutorQuatroAVinteMACorrente === "P/ BATERIA (Vcc)"}>P/ BATERIA (Vcc)</option>
                    <option value="P/ CONSUMIDOR (Vcc)" selected={transdutorQuatroAVinteMACorrente === "P/ CONSUMIDOR (Vcc)"}>P/ CONSUMIDOR (Vcc)</option>
                    <option value="Entrada (Vca)" selected={transdutorQuatroAVinteMACorrente === "Entrada (Vca)"}>Entrada (Vca)</option>
                    <option value="CONSUMIDOR + BATERIA (Vcc)" selected={transdutorQuatroAVinteMACorrente === "CONSUMIDOR + BATERIA (Vcc)"}>CONSUMIDOR + BATERIA (Vcc)</option>
                    <option value="CONSUMIDOR + BATERIA (Vcc) + ENTRADA (Vca)" selected={transdutorQuatroAVinteMACorrente === "CONSUMIDOR + BATERIA (Vcc) + ENTRADA (Vca)"}>CONSUMIDOR + BATERIA (Vcc) + ENTRADA (Vca)</option>
                </Select>   
            : null }

            <div className="flex flex-col">
                <Button className="mt-10" variant="default" type="button" onClick={onSubmit}>Próximo</Button>
            </div>
        </div>
    );
}