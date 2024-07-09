import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProposalData, fieldLabels, useProposal } from "../../contexts/proposal";
import { Button } from "../../shared/button";
import { Select } from "../../shared/select";
import { Radio } from "../../shared/radio";
import { Modal } from "../../shared/modal";

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

    const [errors, setErrors] = useState<Partial<Record<keyof ProposalData, string>>>({})
    const [canGo, setCanGo] = useState(false)

    const { data, handleData } = useProposal()

    const onSubmit = async () => {
        handleData({
            chave_liga_desliga: chaveLigaDesliga,
            chave_flutuacao_e_carga: chaveFlutuacaoECarga,
            chave_carga_profunda: chaveCargaProfunda,
            chave_reposicao: chaveReposicao,
            software_ccs_tools: softwareCCSTools,
            comunicacao_supervisorio: comunicacãoSupervisorio,
            sobressalentes,
            tomada_de_servicos: tomadaDeServicoes,
            sistema_de_calefacao: sistemaDeCalefacao,
            terminal_de_aterramento: terminalDeAterramento,
            porta_documentos: portaDocumentos
        })

        setCanGo(true)
    }

    useEffect(() => {
        setChaveLigaDesliga(data.chave_liga_desliga)
        setChaveFlutuacaoECarga(data.chave_flutuacao_e_carga)
        setChaveCargaProfunda(data.chave_carga_profunda)
        setChaveReposicao(data.chave_reposicao)
        setSoftwareCCSTools(data.software_ccs_tools)
        setComunicacãoSupervisorio(data.comunicacao_supervisorio)
        setSobressalentes(data.sobressalentes)
        setTomadaDeServicoes(data.tomada_de_servicos)
        setSistemaDeCalefacao(data.sistema_de_calefacao)
        setTerminalDeAterramento(data.terminal_de_aterramento)
        setPortaDocumentos(data.porta_documentos)
    }, [])

    useEffect(() => {
        if (canGo) {
            const fields: (keyof ProposalData)[] = [
                'chave_liga_desliga',
                'chave_flutuacao_e_carga',
                'chave_carga_profunda',
                'chave_reposicao',
                'software_ccs_tools',
                'comunicacao_supervisorio',
                'sobressalentes',
                'tomada_de_servicos',
                'sistema_de_calefacao',
                'terminal_de_aterramento',
                'porta_documentos'
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
                error={errors.chave_liga_desliga}
            />

            <Radio
                label="Chave Flutuação e Carga"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={chaveFlutuacaoECarga === "Não" ? 'Não' : chaveFlutuacaoECarga !== "" ? "Sim" : ""}
                onChange={(e) => {
                    if (e === "Não") {
                        setChaveFlutuacaoECarga(e)
                    } else {
                        setChaveFlutuacaoECarga("")
                    }
                }}
                error={chaveFlutuacaoECarga === "Não" ? "" : errors.chave_flutuacao_e_carga}
            />

            {chaveFlutuacaoECarga !== "Não" ?
                <Select error={errors.chave_flutuacao_e_carga} onChange={(e) => setChaveFlutuacaoECarga(e.target.value)} value={chaveFlutuacaoECarga}>
                    <option value="">Selecione...</option>
                    <option value="CHAVE ROTATIVA" selected={chaveFlutuacaoECarga === "CHAVE ROTATIVA"}>CHAVE ROTATIVA</option>
                </Select>
            : null}

            <Radio
                label="Chave Carga Profunda"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={chaveCargaProfunda === "Não" ? 'Não' : chaveCargaProfunda !== "" ? "Sim" : ""}
                onChange={(e) => {
                    if (e === "Não") {
                        setChaveCargaProfunda(e)
                    } else {
                        setChaveCargaProfunda("")
                    }
                }}
                error={chaveCargaProfunda === "Não" ?"" : errors.chave_carga_profunda}
            />

            {chaveCargaProfunda !== "Não" ?
                <Select error={errors.chave_carga_profunda} onChange={(e) => setChaveCargaProfunda(e.target.value)} value={chaveCargaProfunda}>
                    <option value="">Selecione...</option>
                    <option value="CHAVE ROTATIVA" selected={chaveCargaProfunda === "CHAVE ROTATIVA"}>CHAVE ROTATIVA</option>
                </Select>
                : null}

            <Radio
                label="Chave Reposição"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={chaveReposicao}
                onChange={(e) => setChaveReposicao(e)}
                error={errors.chave_reposicao}
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
                error={errors.software_ccs_tools}
            />

            <Radio
                label="Comunicação Supervisório"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={comunicacãoSupervisorio === "Não" ? 'Não' : comunicacãoSupervisorio !== "" ? "Sim" : ""}
                onChange={(e) => {
                    if (e === "Não") {
                        setComunicacãoSupervisorio(e)
                    } else {
                        setComunicacãoSupervisorio("")
                    }
                }}
                error={comunicacãoSupervisorio === "Não" ? "" : errors.comunicacao_supervisorio}
            />

            {comunicacãoSupervisorio !== "Não" ?
                <Select error={errors.comunicacao_supervisorio} onChange={(e) => setComunicacãoSupervisorio(e.target.value)} value={comunicacãoSupervisorio}>
                    <option value="">Selecione...</option>
                    <option value="MOD-BUS RS232" selected={comunicacãoSupervisorio === "MOD-BUS RS232"}>MOD-BUS RS232 (PADRÃO)</option>
                    <option value="MOD-BUS RS485" selected={comunicacãoSupervisorio === "MOD-BUS RS485"}>MOD-BUS RS485</option>
                    <option value="ETHERNET TCP/IP" selected={comunicacãoSupervisorio === "ETHERNET TCP/IP"}>ETHERNET TCP/IP</option>
                    <option value="PROFIBUS" selected={comunicacãoSupervisorio === "PROFIBUS"}>PROFIBUS</option>
                    <option value="SNMP" selected={comunicacãoSupervisorio === "SNMP"}>SNMP</option>
                    <option value="DNP3" selected={comunicacãoSupervisorio === "DNP3"}>DNP3</option>
                </Select>
                : null}

            <Radio
                label="Sobressalentes"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={sobressalentes === "Não" ? 'Não' : sobressalentes !== "" ? "Sim" : ""}
                onChange={(e) => {
                    if (e === "Não") {
                        setSobressalentes(e)
                    } else {
                        setSobressalentes("")
                    }
                }}
                error={sobressalentes === "Não" ? "" : errors.sobressalentes}
            />

            {sobressalentes !== "Não" ?
                <div className="flex space-x-2">
                    <div className="flex-1">
                        <Select error={errors.sobressalentes} onChange={(e) => setSobressalentes(e.target.value)} value={sobressalentes}>
                            <option value="">Selecione...</option>
                            <option value="NÃO" selected={sobressalentes === "NÃO"}>NÃO (PADRÃO)</option>
                            <option value="SOBRESSALENTES PARA 1 ANO" selected={sobressalentes === "SOBRESSALENTES PARA 1 ANO"}>SOBRESSALENTES PARA 1 ANO</option>
                            <option value="SOBRESSALENTES PARA 2 ANOS" selected={sobressalentes === "SOBRESSALENTES PARA 2 ANOS"}>SOBRESSALENTES PARA 2 ANOS</option>
                            <option value="SOBRESSALENTES PARA 5 ANOS" selected={sobressalentes === "SOBRESSALENTES PARA 5 ANOS"}>SOBRESSALENTES PARA 5 ANOS</option>
                            <option value="SOBRESSALENTES PARRA 10 ANOS" selected={sobressalentes === "SOBRESSALENTES PARRA 10 ANOS"}>SOBRESSALENTES PARRA 10 ANOS</option>
                        </Select>
                    </div>

                    <Modal>
                        <img src="https://i.ibb.co/1qYv1Tp/attachment.png" />
                    </Modal>
                </div>
            : null}

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
                error={errors.tomada_de_servicos}
            />

            <Radio
                label="Sistema de Calefação"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={sistemaDeCalefacao}
                onChange={(e) => setSistemaDeCalefacao(e)}
                error={errors.sistema_de_calefacao}
            />

            <Radio
                label="Terminal de Aterramento"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={terminalDeAterramento}
                onChange={(e) => setTerminalDeAterramento(e)}
                error={errors.terminal_de_aterramento}
            />

            <Radio
                label="Porta Documentos"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não' },
                ]}
                value={portaDocumentos}
                onChange={(e) => setPortaDocumentos(e)}
                error={errors.porta_documentos}
            />

            <div className="flex flex-col">
                <Button className="mt-10" variant="default" type="button" onClick={onSubmit}>Próximo</Button>
            </div>
        </div>
    );
}

