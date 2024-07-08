import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProposalData, fieldLabels, useProposal } from "../../contexts/proposal";
import { Button } from "../../shared/button";
import { Select } from "../../shared/select";
import { Radio } from "../../shared/radio";

export function CostSeventh() {
    const navigate = useNavigate()

    const [tipoDeInstrumento, setTipoDeInstrumento] = useState('')
    const [instDeMedicaoVoltimetroCorrenteContinua, setInstDeMedicaoVoltimetroCorrenteContinua] = useState('')
    const [instDeMedicaoVoltimetroCorrenteAlternada, setInstDeMedicaoVoltimetroCorrenteAlternada] = useState('')
    const [instDeMedicaoAmperimetroCorrenteContinua, setInstDeMedicaoAmperimetroCorrenteContinua] = useState('')
    const [instDeMedicaoAmperimetroCorrenteAlternada, setInstDeMedicaoAmperimetroCorrenteAlternada] = useState('')
    const [transdutorQuatroAVinteMATensao, setTransdutorQuatroAVinteMATensao] = useState('')
    const [transdutorQuatroAVinteMACorrente, setTransdutorQuatroAVinteMACorrente] = useState('')

    const [openInputInstDeMedicaoVoltimetroCorrenteContinua, setOpenInputInstDeMedicaoVoltimetroCorrenteContinua] = useState(false)
    const [openInputInstDeMedicaoVoltimetroCorrenteAlternada, setOpenInputInstDeMedicaoVoltimetroCorrenteAlternada] = useState(false)
    const [openInputInstDeMedicaoAmperimetroCorrenteContinua, setOpenInputInstDeMedicaoAmperimetroCorrenteContinua] = useState(false)
    const [openInputInstDeMedicaoAmperimetroCorrenteAlternada, setOpenInputInstDeMedicaoAmperimetroCorrenteAlternada] = useState(false)
    const [openInputTransdutorQuatroAVinteMATensao, setOpenInputTransdutorQuatroAVinteMATensao] = useState(false)
    const [openInputTransdutorQuatroAVinteMACorrente, setOpenInputTransdutorQuatroAVinteMACorrente] = useState(false)

    const [errors, setErrors] = useState<Partial<Record<keyof ProposalData, string>>>({})
    const [canGo, setCanGo] = useState(false)

    const { data, handleData } = useProposal()

    const onSubmit = async () => {
        handleData({ tipoDeInstrumento, instDeMedicaoVoltimetroCorrenteContinua, instDeMedicaoVoltimetroCorrenteAlternada, instDeMedicaoAmperimetroCorrenteContinua, instDeMedicaoAmperimetroCorrenteAlternada, transdutorQuatroAVinteMATensao, transdutorQuatroAVinteMACorrente })
        setCanGo(true)
    }

    useEffect(() => {
        setTipoDeInstrumento(data.tipoDeInstrumento)
        setInstDeMedicaoVoltimetroCorrenteContinua(data.instDeMedicaoVoltimetroCorrenteContinua)
        setInstDeMedicaoVoltimetroCorrenteAlternada(data.instDeMedicaoVoltimetroCorrenteAlternada)
        setInstDeMedicaoAmperimetroCorrenteContinua(data.instDeMedicaoAmperimetroCorrenteContinua)
        setInstDeMedicaoAmperimetroCorrenteAlternada(data.instDeMedicaoAmperimetroCorrenteAlternada)
        setTransdutorQuatroAVinteMATensao(data.transdutorQuatroAVinteMATensao)
        setTransdutorQuatroAVinteMACorrente(data.transdutorQuatroAVinteMACorrente)
    }, [])

    useEffect(() => {
        if(canGo) {
            const fields: (keyof ProposalData)[] = ['tipoDeInstrumento', 'instDeMedicaoVoltimetroCorrenteContinua', 'instDeMedicaoVoltimetroCorrenteAlternada', 'instDeMedicaoAmperimetroCorrenteContinua', 'instDeMedicaoAmperimetroCorrenteAlternada', 'transdutorQuatroAVinteMATensao', 'transdutorQuatroAVinteMACorrente'];
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
                error={errors.tipoDeInstrumento}
            />

            <Radio
                label="Inst. de medição Voltímetro CC"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={ openInputInstDeMedicaoVoltimetroCorrenteContinua ? 'Sim' : instDeMedicaoVoltimetroCorrenteContinua}
                onChange={(e) => { if(e === "Sim") {
                    setOpenInputInstDeMedicaoVoltimetroCorrenteContinua(true);
                } else {
                    setOpenInputInstDeMedicaoVoltimetroCorrenteContinua(false);
                    setInstDeMedicaoVoltimetroCorrenteContinua(e)
                } } }
                error={ openInputInstDeMedicaoVoltimetroCorrenteContinua ? "" : errors.instDeMedicaoVoltimetroCorrenteContinua}
            />

            { openInputInstDeMedicaoVoltimetroCorrenteContinua ?          
                <Select error={errors.instDeMedicaoVoltimetroCorrenteContinua} onChange={(e) => setInstDeMedicaoVoltimetroCorrenteContinua(e.target.value)} value={instDeMedicaoVoltimetroCorrenteContinua}>
                    <option value="">Selecione...</option>
                    <option value="P/ BATERIA (Vcc)" selected={instDeMedicaoVoltimetroCorrenteContinua === "P/ BATERIA (Vcc)"}>P/ BATERIA (Vcc)</option>
                    <option value="P/ CONSUMIDOR (Vcc)" selected={instDeMedicaoVoltimetroCorrenteContinua === "P/ CONSUMIDOR (Vcc)"}>P/ CONSUMIDOR (Vcc)</option>
                    <option value="CONSUMIDOR + BATERIA (Vcc)" selected={instDeMedicaoVoltimetroCorrenteContinua === "CONSUMIDOR + BATERIA (Vcc)"}>CONSUMIDOR + BATERIA (Vcc)</option>
                </Select>   
            : null }

            <Radio
                label="Inst. de medição Voltímetro CA"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={ openInputInstDeMedicaoVoltimetroCorrenteAlternada ? 'Sim' : instDeMedicaoVoltimetroCorrenteAlternada}
                onChange={(e) => { if(e === "Sim") {
                    setOpenInputInstDeMedicaoVoltimetroCorrenteAlternada(true);
                } else {
                    setOpenInputInstDeMedicaoVoltimetroCorrenteAlternada(false);
                    setInstDeMedicaoVoltimetroCorrenteAlternada(e)
                } } }
                error={ openInputInstDeMedicaoVoltimetroCorrenteAlternada ? "" : errors.instDeMedicaoVoltimetroCorrenteAlternada}
            />

            { openInputInstDeMedicaoVoltimetroCorrenteAlternada ?          
                <Select error={errors.instDeMedicaoVoltimetroCorrenteAlternada} onChange={(e) => setInstDeMedicaoVoltimetroCorrenteAlternada(e.target.value)} value={instDeMedicaoVoltimetroCorrenteAlternada}>
                    <option value="">Selecione...</option>
                    <option value="KIT VCA s/TP c/CH ROTATIVA" selected={instDeMedicaoVoltimetroCorrenteAlternada === "KIT VCA s/TP c/CH ROTATIVA"}>KIT VCA s/TP c/CH ROTATIVA</option>
                    <option value="KIT VCA c/TP E CH ROTATIVA" selected={instDeMedicaoVoltimetroCorrenteAlternada === "KIT VCA c/TP E CH ROTATIVA"}>KIT VCA c/TP E CH ROTATIVA</option>
                </Select>   
            : null }

            <Radio
                label="Inst. de medição Amperim. CC"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={ openInputInstDeMedicaoAmperimetroCorrenteContinua ? 'Sim' : instDeMedicaoAmperimetroCorrenteContinua}
                onChange={(e) => { if(e === "Sim") {
                    setOpenInputInstDeMedicaoAmperimetroCorrenteContinua(true);
                } else {
                    setOpenInputInstDeMedicaoAmperimetroCorrenteContinua(false);
                    setInstDeMedicaoAmperimetroCorrenteContinua(e)
                } } }
                error={openInputInstDeMedicaoAmperimetroCorrenteContinua ? "" : errors.instDeMedicaoAmperimetroCorrenteContinua}
            />

            { openInputInstDeMedicaoAmperimetroCorrenteContinua ?          
                <Select error={errors.instDeMedicaoAmperimetroCorrenteContinua} onChange={(e) => setInstDeMedicaoAmperimetroCorrenteContinua(e.target.value)} value={instDeMedicaoAmperimetroCorrenteContinua}>
                    <option value="">Selecione...</option>
                    <option value="P/ BATERIA (Acc)" selected={instDeMedicaoAmperimetroCorrenteContinua === "P/ BATERIA (Acc)"}>P/ BATERIA (Acc)</option>
                    <option value="P/ CONSUMIDOR (Acc)" selected={instDeMedicaoAmperimetroCorrenteContinua === "P/ CONSUMIDOR (Acc)"}>P/ CONSUMIDOR (Acc)</option>
                    <option value="CONSUMIDOR + BATERIA (Acc)" selected={instDeMedicaoAmperimetroCorrenteContinua === "CONSUMIDOR + BATERIA (Acc)"}>CONSUMIDOR + BATERIA (Acc)</option>
                </Select>   
            : null }

            <Radio
                label="Inst. de medição Amperim. CA"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={ openInputInstDeMedicaoAmperimetroCorrenteAlternada ? 'Sim' : instDeMedicaoAmperimetroCorrenteAlternada}
                onChange={(e) => { if(e === "Sim") {
                    setOpenInputInstDeMedicaoAmperimetroCorrenteAlternada(true);
                } else {
                    setOpenInputInstDeMedicaoAmperimetroCorrenteAlternada(false);
                    setInstDeMedicaoAmperimetroCorrenteAlternada(e)
                } } }
                error={openInputInstDeMedicaoAmperimetroCorrenteAlternada ? "" : errors.instDeMedicaoAmperimetroCorrenteAlternada}
            />

            { openInputInstDeMedicaoAmperimetroCorrenteAlternada ?          
                <Select error={errors.instDeMedicaoAmperimetroCorrenteAlternada} onChange={(e) => setInstDeMedicaoAmperimetroCorrenteAlternada(e.target.value)} value={instDeMedicaoAmperimetroCorrenteAlternada}>
                    <option value="">Selecione...</option>
                    <option value="KIT VCA c/TC c/CH ROTATIVA (Aca)" selected={instDeMedicaoAmperimetroCorrenteAlternada === "KIT VCA c/TC c/CH ROTATIVA (Aca)"}>KIT VCA c/TC c/CH ROTATIVA (Aca)</option>
                </Select>   
            : null }

            <Radio
                label="Transdutor 4-20ma tensão"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={ openInputTransdutorQuatroAVinteMATensao ? 'Sim' : transdutorQuatroAVinteMATensao}
                onChange={(e) => { if(e === "Sim") {
                    setOpenInputTransdutorQuatroAVinteMATensao(true);
                } else {
                    setOpenInputTransdutorQuatroAVinteMATensao(false);
                    setTransdutorQuatroAVinteMATensao(e)
                } } }
                error={openInputTransdutorQuatroAVinteMATensao ? "" : errors.transdutorQuatroAVinteMATensao}
            />

            { openInputTransdutorQuatroAVinteMATensao ?          
                <Select  error={errors.transdutorQuatroAVinteMATensao} onChange={(e) => setTransdutorQuatroAVinteMATensao(e.target.value)} value={transdutorQuatroAVinteMATensao}>
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
                value={ openInputTransdutorQuatroAVinteMACorrente ? 'Sim' : transdutorQuatroAVinteMACorrente}
                onChange={(e) => { if(e === "Sim") {
                    setOpenInputTransdutorQuatroAVinteMACorrente(true);
                } else {
                    setOpenInputTransdutorQuatroAVinteMACorrente(false);
                    setTransdutorQuatroAVinteMACorrente(e)
                } } }
                error={openInputTransdutorQuatroAVinteMACorrente ? "" :  errors.transdutorQuatroAVinteMACorrente}
            />

            { openInputTransdutorQuatroAVinteMACorrente ?          
                <Select error={errors.transdutorQuatroAVinteMACorrente} onChange={(e) => setTransdutorQuatroAVinteMACorrente(e.target.value)} value={transdutorQuatroAVinteMACorrente}>
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