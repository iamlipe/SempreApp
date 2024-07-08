import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProposalData, fieldLabels, useProposal } from "../../contexts/proposal";
import { Button } from "../../shared/button";
import { Select } from "../../shared/select";
import { Radio } from "../../shared/radio";


export function CostEight() {
    const navigate = useNavigate()

    const [chaveLigaDesliga, setChaveLigaDesliga] = useState('')
    const [chaveFlutuacaoECarga, setChaveFlutuacaoECarga] = useState('')
    const [chaveCargaProfunda, setChaveCargaProfunda] = useState('')
    const [chaveReposicao, setChaveReposicao] = useState('')
    const [softwareCCSTools, setSoftwareCCSTools] = useState('')
    const [comunicacãoSupervisorio, setComunicacãoSupervisorio] = useState('')
    const [sobressalentes, setSobressalentes] = useState('')
    const [tomadaDeServicoes, setTomadaDeServicoes] = useState('')
    const [sistemaDeCalefacao, setSistemaDeCalefacao] = useState('')
    const [terminalDeAterramento, setTerminalDeAterramento] = useState('')
    const [portaDocumentos, setPortaDocumentos] = useState('')

    const [openInputChaveFlutuacaoECarga, setOpenInputChaveFlutuacaoECarga] = useState(false)
    const [openInputChaveCargaProfunda, setOpenInputChaveCargaProfunda] = useState(false)
    const [openInputComunicacãoSupervisorio, setOpenInputComunicacãoSupervisorio] = useState(false)
    const [openInputSobressalentes, setOpenInputSobressalentes] = useState(false)

    const [errors, setErrors] = useState<Partial<Record<keyof ProposalData, string>>>({})
    const [canGo, setCanGo] = useState(false)

    const { data, handleData } = useProposal()

    const onSubmit = async () => {
        handleData({ chaveLigaDesliga, chaveFlutuacaoECarga, chaveCargaProfunda, chaveReposicao, softwareCCSTools, comunicacãoSupervisorio, sobressalentes, tomadaDeServicoes, sistemaDeCalefacao, terminalDeAterramento, portaDocumentos })
        setCanGo(true)
    }

    useEffect(() => {
        setChaveLigaDesliga(data.chaveLigaDesliga)
        setChaveFlutuacaoECarga(data.chaveFlutuacaoECarga)
        setChaveCargaProfunda(data.chaveCargaProfunda)
        setChaveReposicao(data.chaveReposicao)
        setSoftwareCCSTools(data.softwareCCSTools)
        setComunicacãoSupervisorio(data.comunicacãoSupervisorio)
        setSobressalentes(data.sobressalentes)
        setTomadaDeServicoes(data.tomadaDeServicoes)
        setSistemaDeCalefacao(data.sistemaDeCalefacao)
        setTerminalDeAterramento(data.terminalDeAterramento)
        setPortaDocumentos(data.portaDocumentos)
    }, [])

    useEffect(() => {
        if(canGo) {
            const fields: (keyof ProposalData)[] = ['chaveLigaDesliga', 'chaveFlutuacaoECarga', 'chaveCargaProfunda', 'chaveReposicao', 'softwareCCSTools', 'comunicacãoSupervisorio', 'sobressalentes', 'tomadaDeServicoes', 'sistemaDeCalefacao', 'terminalDeAterramento', 'portaDocumentos'];
            const errorsResponse: Partial<Record<keyof ProposalData, string>> = {};
        
            const allFieldsFilled = fields.every(field => {
                const isFilled = data[field] && data[field] !== '';
    
                if (!isFilled) {
                    errorsResponse[field] = `Preencha o Campo ${fieldLabels[field]}`;
                }
    
                return isFilled;
            });
        
            if (allFieldsFilled) {
                navigate('/cost/ninth');
                setCanGo(false)
            } else {
                setErrors(errorsResponse);
                setCanGo(false);
            }
        }
    }, [data, canGo]);

    return (
        <div className="flex flex-col space-y-2">
            <p className="font-semibold text-slate-800 text-sm mb-4">12 - Comando Manual porta frontal</p>

            <Radio
                label="Chave Liga e Desliga"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={chaveLigaDesliga}
                onChange={(e) => setChaveLigaDesliga(e)}
                error={errors.chaveLigaDesliga}
            />

            <Radio
                label="Chave Flutuação e Carga"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={ openInputChaveFlutuacaoECarga ? 'Sim' : chaveFlutuacaoECarga}
                onChange={(e) => { if(e === "Sim") {
                    setOpenInputChaveFlutuacaoECarga(true);
                } else {
                    setOpenInputChaveFlutuacaoECarga(false);
                    setChaveCargaProfunda(e)
                } } }
                error={ openInputChaveFlutuacaoECarga ? "" : errors.chaveFlutuacaoECarga}
            />

            { openInputChaveFlutuacaoECarga ?          
                <Select error={errors.chaveFlutuacaoECarga} onChange={(e) => setChaveFlutuacaoECarga(e.target.value)} value={chaveFlutuacaoECarga}>
                    <option value="">Selecione...</option>
                    <option value="CHAVE ROTATIVA" selected={chaveFlutuacaoECarga === "CHAVE ROTATIVA"}>CHAVE ROTATIVA</option>
                </Select>   
            : null }

            <Radio
                label="Chave Carga Profunda"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={ openInputChaveCargaProfunda ? 'Sim' : chaveCargaProfunda}
                onChange={(e) => { if(e === "Sim") {
                    setOpenInputChaveCargaProfunda(true);
                } else {
                    setOpenInputChaveCargaProfunda(false);
                    setChaveCargaProfunda(e)
                } } }
                error={ openInputChaveCargaProfunda ? "" : errors.chaveCargaProfunda}
            />

            { openInputChaveCargaProfunda ?          
                <Select error={errors.chaveCargaProfunda} onChange={(e) => setChaveCargaProfunda(e.target.value)} value={chaveCargaProfunda}>
                    <option value="">Selecione...</option>
                    <option value="CHAVE ROTATIVA" selected={chaveCargaProfunda === "CHAVE ROTATIVA"}>CHAVE ROTATIVA</option>
                </Select>   
            : null }

            <Radio
                label="Chave Reposição"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={chaveReposicao}
                onChange={(e) => setChaveReposicao(e)}
                error={errors.chaveReposicao}
            />

            <div className="flex flex-col">
                <p className="font-semibold text-slate-800 text-sm mt-6 mb-2">13 - Comunicação e Protocolos</p>
            </div>

            <Radio
                label={`Software “CCSTools”`}
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={softwareCCSTools}
                onChange={(e) => setSoftwareCCSTools(e)}
                error={errors.softwareCCSTools}
            />

            <Radio
                label="Comunicação Supervisório"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={ openInputComunicacãoSupervisorio ? 'Sim' : comunicacãoSupervisorio}
                onChange={(e) => { if(e === "Sim") {
                    setOpenInputComunicacãoSupervisorio(true);
                } else {
                    setOpenInputComunicacãoSupervisorio(false);
                    setComunicacãoSupervisorio(e)
                } } }
                error={ openInputComunicacãoSupervisorio ? "" : errors.comunicacãoSupervisorio}
            />

            { openInputComunicacãoSupervisorio ?          
                <Select error={errors.comunicacãoSupervisorio} onChange={(e) => setComunicacãoSupervisorio(e.target.value)} value={comunicacãoSupervisorio}>
                    <option value="">Selecione...</option>
                    <option value="MOD-BUS RS232" selected={comunicacãoSupervisorio === "MOD-BUS RS232"}>MOD-BUS RS232 (PADRÃO)</option>
                    <option value="MOD-BUS RS485" selected={comunicacãoSupervisorio === "MOD-BUS RS485"}>MOD-BUS RS485</option>
                    <option value="ETHERNET TCP/IP" selected={comunicacãoSupervisorio === "ETHERNET TCP/IP"}>ETHERNET TCP/IP</option>
                    <option value="PROFIBUS" selected={comunicacãoSupervisorio === "PROFIBUS"}>PROFIBUS</option>
                    <option value="SNMP" selected={comunicacãoSupervisorio === "SNMP"}>SNMP</option>
                    <option value="DNP3" selected={comunicacãoSupervisorio === "DNP3"}>DNP3</option>
                </Select>   
            : null }

            <Radio
                label="Sobressalentes"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={ openInputSobressalentes ? 'Sim' : sobressalentes}
                onChange={(e) => { if(e === "Sim") {
                    setOpenInputSobressalentes(true);
                } else {
                    setOpenInputSobressalentes(false);
                    setSobressalentes(e)
                } } }
                error={ openInputSobressalentes ? "" : errors.sobressalentes}
            />

            { openInputSobressalentes ?          
                <Select error={errors.sobressalentes} onChange={(e) => setSobressalentes(e.target.value)} value={sobressalentes}>
                    <option value="">Selecione...</option>
                    <option value="NÃO" selected={sobressalentes === "NÃO"}>NÃO (PADRÃO)</option>
                    <option value="SOBRESSALENTES PARA 1 ANO" selected={sobressalentes === "SOBRESSALENTES PARA 1 ANO"}>SOBRESSALENTES PARA 1 ANO</option>
                    <option value="SOBRESSALENTES PARA 2 ANOS" selected={sobressalentes === "SOBRESSALENTES PARA 2 ANOS"}>SOBRESSALENTES PARA 2 ANOS</option>
                    <option value="SOBRESSALENTES PARA 5 ANOS" selected={sobressalentes === "SOBRESSALENTES PARA 5 ANOS"}>SOBRESSALENTES PARA 5 ANOS</option>
                    <option value="SOBRESSALENTES PARRA 10 ANOS" selected={sobressalentes === "SOBRESSALENTES PARRA 10 ANOS"}>SOBRESSALENTES PARRA 10 ANOS</option>
                </Select>   
            : null }

            <div className="flex flex-col">
                <p className="font-semibold text-slate-800 text-sm mt-6 mb-2">14 - Outros Opcionais</p>
            </div>


            <Radio
                label="Tomada de Serviços"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={tomadaDeServicoes}
                onChange={(e) => setTomadaDeServicoes(e)}
                error={errors.tomadaDeServicoes}
            />

            <Radio
                label="Sistema de Calefação"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={sistemaDeCalefacao}
                onChange={(e) => setSistemaDeCalefacao(e)}
                error={errors.sistemaDeCalefacao}
            />

            <Radio
                label="Terminal de Aterramento"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={terminalDeAterramento}
                onChange={(e) => setTerminalDeAterramento(e)}
                error={errors.terminalDeAterramento}
            />

            <Radio
                label="Porta Documentos"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={portaDocumentos}
                onChange={(e) => setPortaDocumentos(e)}
                error={errors.portaDocumentos}
            />

            <div className="flex flex-col">
                <Button className="mt-10" variant="default" type="button" onClick={onSubmit}>Próximo</Button>
            </div>
        </div>
    );
}

