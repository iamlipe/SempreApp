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

    const [errors, setErrors] = useState<Partial<Record<keyof ProposalData, string>>>({})
    const [canGo, setCanGo] = useState(false)

    const { data, handleData } = useProposal()

    const onSubmit = async () => {
        handleData({ 
            diodo_de_bloqueio: diodoDeBloqueio, 
            disconexao_de_bateria: disconexaoDeBateria, 
            alarme_sonoro: alarmeSonoro, 
            sinalizacao_visual_led: sinalizacaoVisualLed, 
            sinalizacao_remota_sete_reles: sinalizacaoRemotaSeteReles, 
            protecao_contra_surtos_adicional: protecaoContraSurtosAdicional, 
            plaqueta_de_identificacao: plaquetaDeIdentificacao, 
            sensores_corrente_alternada: sensoresCorrenteAlternada 
        })
        setCanGo(true)
    }

    useEffect(() => {
        setDiodoDeBloqueio(data.diodo_de_bloqueio)
        setDisconexaoDeBateria(data.disconexao_de_bateria)
        setAlarmeSonoro(data.alarme_sonoro)
        setSinalizacaoVisualLed(data.sinalizacao_visual_led)
        setSinalizacaoRemotaSeteReles(data.sinalizacao_remota_sete_reles)
        setProtecaoContraSurtosAdicional(data.protecao_contra_surtos_adicional)
        setPlaquetaDeIdentificacao(data.plaqueta_de_identificacao)
        setSensoresCorrenteAlternada(data.sensores_corrente_alternada)
    }, [])

    useEffect(() => {
        if(canGo) {
            const fields: (keyof ProposalData)[] = [
                'diodo_de_bloqueio', 
                'disconexao_de_bateria', 
                'alarme_sonoro', 
                'sinalizacao_visual_led', 
                'sinalizacao_remota_sete_reles', 
                'protecao_contra_surtos_adicional', 
                'plaqueta_de_identificacao', 
                'sensores_corrente_alternada'
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
                error={errors.diodo_de_bloqueio}
            />

            <Radio
                label="Disconexão de Bateria"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={disconexaoDeBateria}
                onChange={(e) => setDisconexaoDeBateria(e)}
                error={errors.disconexao_de_bateria}
            />

            <Radio
                label="Alarme Sonoro"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={alarmeSonoro}
                onChange={(e) => setAlarmeSonoro(e)}
                error={errors.alarme_sonoro}
            />

            <Radio
                label="Sinalização Visual Led"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={ sinalizacaoVisualLed === "Não" ? 'Não' : sinalizacaoVisualLed !== "" ? "Sim" : ""}
                onChange={(e) => {     if (e === "Não") {
                    setSinalizacaoVisualLed(e)
                } else {
                    setSinalizacaoVisualLed("")
                } } }
                error={ sinalizacaoVisualLed === "Não" ? "" : errors.sinalizacao_visual_led}
            />

            { sinalizacaoVisualLed !== "Não" ?          
                <Select error={errors.sinalizacao_visual_led} onChange={(e) => setSinalizacaoVisualLed(e.target.value)} value={sinalizacaoVisualLed}>
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
                error={errors.sinalizacao_remota_sete_reles}
            />

            <Radio
                label="Proteção Contra Surtos Adicional"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={protecaoContraSurtosAdicional}
                onChange={(e) => setProtecaoContraSurtosAdicional(e)}
                error={errors.protecao_contra_surtos_adicional}
            />

            <Select label="Plaqueta de Identificação" error={errors.plaqueta_de_identificacao} onChange={(e) => setPlaquetaDeIdentificacao(e.target.value)} value={plaquetaDeIdentificacao}>
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
                value={ sensoresCorrenteAlternada === "Não" ? 'Não' : sensoresCorrenteAlternada !== "" ? "Sim" : ""}
                onChange={(e) => { if (e === "Não") {
                    setSensoresCorrenteAlternada(e)
                } else {
                    setSensoresCorrenteAlternada("")
                } } }
                error={sensoresCorrenteAlternada === "Não" ? "" : errors.sensores_corrente_alternada}
            />

            { sensoresCorrenteAlternada !== "Não" ?          
                <Select error={errors.sensores_corrente_alternada} onChange={(e) => setSensoresCorrenteAlternada(e.target.value)} value={sensoresCorrenteAlternada}>
                    <option value="">Selecione...</option>
                    <option value="KIT RELE FALTA DE FASE (WEG/COEL)" selected={sensoresCorrenteAlternada === "KIT RELE FALTA DE FASE (WEG/COEL)"}>KIT RELE FALTA DE FASE (WEG/COEL)</option>
                    <option value="KIT RELE SEQUENCIA DE FASE" selected={sensoresCorrenteAlternada === "KIT RELE SEQUENCIA DE FASE"}>KIT RELE SEQUENCIA DE FASE</option>
                </Select>   
            : null }

            <div className="flex flex-col">
                <Button className="mt-10" variant="default" type="button" onClick={onSubmit}>Próximo</Button>
            </div>
        </div>
    );
}