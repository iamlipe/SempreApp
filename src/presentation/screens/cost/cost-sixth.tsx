import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProposalData, fieldLabels, useProposal } from "../../contexts/proposal";
import { Button } from "../../shared/button";
import { Select } from "../../shared/select";
import { Radio } from "../../shared/radio";

export function CostSixth() {
    const navigate = useNavigate()

    const [diodoDeBloqueio, setDiodoDeBloqueio] = useState('')
    const [disconexaoDeBateria, setDisconexaoDeBateria] = useState('')
    const [alarmeSonoro, setAlarmeSonoro] = useState('')
    const [sinalizacaoVisualLed, setSinalizacaoVisualLed] = useState('')
    const [sinalizacaoRemotaSeteReles, setSinalizacaoRemotaSeteReles] = useState('')
    const [protecaoContraSurtosAdicional, setProtecaoContraSurtosAdicional] = useState('')
    const [plaquetaDeIdentificacao, setPlaquetaDeIdentificacao] = useState('')
    const [sensoresCorrenteAlternada, setSensoresCorrenteAlternada] = useState('')

    const [openInputSensoresCorrenteAlternada, setOpenInputSensoresCorrentesAlternadas] = useState(false)
    const [openInputSinalizacaoVisualLed, setOpenInputSinalizacaoVisualLed] = useState(false)

    const [errors, setErrors] = useState<Partial<Record<keyof ProposalData, string>>>({})
    const [canGo, setCanGo] = useState(false)

    const { data, handleData } = useProposal()

    const onSubmit = async () => {
        handleData({ diodoDeBloqueio, disconexaoDeBateria, alarmeSonoro, sinalizacaoVisualLed, sinalizacaoRemotaSeteReles, protecaoContraSurtosAdicional, plaquetaDeIdentificacao, sensoresCorrenteAlternada })
        setCanGo(true)
    }

    useEffect(() => {
        setDiodoDeBloqueio(data.diodoDeBloqueio)
        setDisconexaoDeBateria(data.disconexaoDeBateria)
        setAlarmeSonoro(data.alarmeSonoro)
        setSinalizacaoVisualLed(data.sinalizacaoVisualLed)
        setSinalizacaoRemotaSeteReles(data.sinalizacaoRemotaSeteReles)
        setProtecaoContraSurtosAdicional(data.protecaoCircuitosAuxiliares)
        setPlaquetaDeIdentificacao(data.plaquetaDeIdentificacao)
        setSensoresCorrenteAlternada(data.sensoresCorrenteAlternada)
    }, [])

    useEffect(() => {
        if(canGo) {
            const fields: (keyof ProposalData)[] = ['diodoDeBloqueio', 'disconexaoDeBateria', 'alarmeSonoro', 'sinalizacaoVisualLed', 'sinalizacaoRemotaSeteReles', 'protecaoContraSurtosAdicional', 'plaquetaDeIdentificacao', 'sensoresCorrenteAlternada'];
            const errorsResponse: Partial<Record<keyof ProposalData, string>> = {};
        
            const allFieldsFilled = fields.every(field => {
                const isFilled = data[field] && data[field] !== '';
    
                if (!isFilled) {
                    errorsResponse[field] = `Preencha o Campo ${fieldLabels[field]}`;
                }
    
                return isFilled;
            });
        
            if (allFieldsFilled) {
                navigate('/cost/seventh');
                setCanGo(false)
            } else {
                setErrors(errorsResponse);
                setCanGo(false);
            }
        }
    }, [data, canGo]);

    return (
        <div className="flex flex-col space-y-2">

            <p className="font-semibold text-slate-800 text-sm mb-4">10 - Acessórios e Opcionais</p>

            <Radio
                label="Diodo de Bloqueio"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={diodoDeBloqueio}
                onChange={(e) => setDiodoDeBloqueio(e)}
                error={errors.diodoDeBloqueio}
            />

            <Radio
                label="Disconexão de Bateria"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={disconexaoDeBateria}
                onChange={(e) => setDisconexaoDeBateria(e)}
                error={errors.disconexaoDeBateria}
            />

            <Radio
                label="Alarme Sonoro"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={alarmeSonoro}
                onChange={(e) => setAlarmeSonoro(e)}
                error={errors.alarmeSonoro}
            />

            <Radio
                label="Sinalização Visual Led"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={ openInputSinalizacaoVisualLed ? 'Sim' : sinalizacaoVisualLed}
                onChange={(e) => { if(e === "Sim") {
                    setOpenInputSinalizacaoVisualLed(true);
                } else {
                    setOpenInputSinalizacaoVisualLed(false);
                    setSinalizacaoVisualLed(e)
                } } }
                error={errors.sinalizacaoVisualLed}
            />

            { openInputSinalizacaoVisualLed ?          
                <Select error={errors.sinalizacaoVisualLed} onChange={(e) => setSinalizacaoVisualLed(e.target.value)} value={sinalizacaoVisualLed}>
                    <option value="">Selecione...</option>
                    <option value="Kit CCI Box Led" selected={sinalizacaoVisualLed === "Kit CCI Box Led"}>Kit CCI Box Led</option>
                    <option value="Kit Led 22mm" selected={sinalizacaoVisualLed === "Kit Led 22mm"}>Kit Led 22mm</option>
                </Select>   
            : null }    

    

            <Radio
                label="Sinalização Remota 7 reles"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={sinalizacaoRemotaSeteReles}
                onChange={(e) => setSinalizacaoRemotaSeteReles(e)}
                error={errors.sinalizacaoRemotaSeteReles}
            />

            <Radio
                label="Proteção Contra Surtos Adicional"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={protecaoContraSurtosAdicional}
                onChange={(e) => setProtecaoContraSurtosAdicional(e)}
                error={errors.protecaoCircuitosAuxiliares}
            />

            <Select label="Plaqueta de Identificação" error={errors.plaquetaDeIdentificacao} onChange={(e) => setPlaquetaDeIdentificacao(e.target.value)} value={plaquetaDeIdentificacao}>
                <option value="">Selecione...</option>
                <option value="PL ALUMINIO + TAG's em ALUMINIO" selected={plaquetaDeIdentificacao === "PL ALUMINIO + TAG's em ALUMINIO"}>PL ALUMINIO + TAG's em ALUMINIO (PADRÃO)</option>
                <option value="PL INOX + TAG's EM ACRILICO" selected={plaquetaDeIdentificacao === "PL INOX + TAG's EM ACRILICO"}>PL INOX + TAG's EM ACRILICO</option>
                <option value="PL INOX + LOGO CLIENTE" selected={plaquetaDeIdentificacao === "PL INOX + LOGO CLIENTE"}>PL INOX + LOGO CLIENTE</option>
            </Select>  

            <Radio
                label="Sensores CA"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={ openInputSensoresCorrenteAlternada ? 'Sim' : sensoresCorrenteAlternada}
                onChange={(e) => { if(e === "Sim") {
                    setOpenInputSensoresCorrentesAlternadas(true);
                } else {
                    setOpenInputSensoresCorrentesAlternadas(false);
                    setSensoresCorrenteAlternada(e)
                } } }
                error={errors.sensoresCorrenteAlternada}
            />

            { openInputSensoresCorrenteAlternada ?          
                <Select error={errors.sensoresCorrenteAlternada} onChange={(e) => setSensoresCorrenteAlternada(e.target.value)} value={sensoresCorrenteAlternada}>
                    <option value="">Selecione...</option>
                    <option value="KIT RELE FALTA DE FASE (WEG/COEL);" selected={sensoresCorrenteAlternada === "KIT RELE FALTA DE FASE (WEG/COEL)"}>KIT RELE FALTA DE FASE (WEG/COEL);</option>
                    <option value="KIT RELE SEQUENCIA DE FASE" selected={sensoresCorrenteAlternada === "KIT RELE SEQUENCIA DE FASE"}>KIT RELE SEQUENCIA DE FASE</option>
                </Select>   
            : null }

            <div className="flex flex-col">
                <Button className="mt-10" variant="default" type="button" onClick={onSubmit}>Próximo</Button>
            </div>
        </div>
    );
}