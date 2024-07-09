import { useEffect, useState } from "react";
import { ProposalData, fieldLabels, useProposal } from "../../contexts/proposal";
import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/button";
import { Select } from "../../shared/select";

export function CostTenth() {    
    const navigate = useNavigate()

    const [idiomaDaDocumentacao, setIdiomaDaDocumentacao] = useState('')
    const [tipoDeDocumentacao, setTipoDeDocumentacao] = useState('')
    const [ensaiosETestes, setEnsaiosETestes] = useState('')

    const [errors, setErrors] = useState<Partial<Record<keyof ProposalData, string>>>({})
    const [canGo, setCanGo] = useState(false)

    const { data, handleData } = useProposal()

    const onSubmit = async () => {
        handleData({ 
            idioma_da_documentacao: idiomaDaDocumentacao, 
            tipo_de_documentacao: tipoDeDocumentacao, 
            ensaios_e_testes: ensaiosETestes 
        })
        setCanGo(true)
    }

    useEffect(() => {
        setIdiomaDaDocumentacao(data.idioma_da_documentacao)
        setTipoDeDocumentacao(data.tipo_de_documentacao)
        setEnsaiosETestes(data.ensaios_e_testes)
    }, [])

    useEffect(() => {
        if(canGo) {
            const fields: (keyof ProposalData)[] = ['idioma_da_documentacao', 'tipo_de_documentacao', 'ensaios_e_testes'];
            const errorsResponse: Partial<Record<keyof ProposalData, string>> = {};
        
            const allFieldsFilled = fields.every(field => {
                const isFilled = data[field] && data[field] !== '';
    
                if (!isFilled) {
                    errorsResponse[field] = `Preencha o Campo ${fieldLabels[field]}`;
                }
    
                return isFilled;
            });
        
            if (allFieldsFilled) {
                navigate('/cost/eleventh');
                setCanGo(false)
            } else {
                setErrors(errorsResponse);
                setCanGo(false);
            }
        }
    }, [data, canGo]);

    return (
        <div className="flex flex-col space-y-2">
            <p className="font-semibold text-slate-800 text-sm mb-4">16 - Documentação e Testes</p>

            <Select label="Idioma da Documentação" error={errors.idioma_da_documentacao} onChange={(e) => setIdiomaDaDocumentacao(e.target.value)} value={idiomaDaDocumentacao}>
                <option value="">Selecione...</option>
                <option value="PORTUGUÊS" selected={idiomaDaDocumentacao === "PORTUGUÊS"}>PORTUGUÊS (PADRÃO)</option>
                <option value="INGLÊS" selected={idiomaDaDocumentacao === "INGLÊS"}>INGLÊS</option>
                <option value="ESPANHOL" selected={idiomaDaDocumentacao === "ESPANHOL"}>ESPANHOL</option>
            </Select>

            <Select label="Tipo de Documentação" error={errors.tipo_de_documentacao} onChange={(e) => setTipoDeDocumentacao(e.target.value)} value={tipoDeDocumentacao}>
                <option value="">Selecione...</option>
                <option value="MANUAL" selected={tipoDeDocumentacao === "MANUAL"}>MANUAL (PADRÃO)</option>
                <option value="MANUAL COM PROTOCOLO" selected={tipoDeDocumentacao === "MANUAL COM PROTOCOLO"}>MANUAL COM PROTOCOLO</option>
                <option value="DATA BOOK SEMPRE" selected={tipoDeDocumentacao === "DATA BOOK SEMPRE"}>DATA BOOK SEMPRE</option>
                <option value="DATABOOK (PETROBRAS)" selected={tipoDeDocumentacao === "DATABOOK (PETROBRAS)"}>DATABOOK (PETROBRAS)</option>
                <option value="DATA BOOK FOLHA CLIENTE" selected={tipoDeDocumentacao === "DATA BOOK FOLHA CLIENTE"}>DATA BOOK FOLHA CLIENTE</option>
                <option value="OUTROS" selected={tipoDeDocumentacao === "OUTROS"}>OUTROS</option>
            </Select>

            <Select label="Ensaios e teste" error={errors.ensaios_e_testes} onChange={(e) => setEnsaiosETestes(e.target.value)} value={ensaiosETestes}>
                <option value="">Selecione...</option>
                <option value="SEMPRE" selected={ensaiosETestes === "SEMPRE"}>SEMPRE (PADRÃO)</option>
                <option value="ELEVAÇÃO DE TEMPERATURA" selected={ensaiosETestes === "ELEVAÇÃO DE TEMPERATURA"}>ELEVAÇÃO DE TEMPERATURA</option>
                <option value="FIAÇÃO PONTO A PONTO" selected={ensaiosETestes === "FIAÇÃO PONTO A PONTO"}>FIAÇÃO PONTO A PONTO</option>
                <option value="BRASKEM / VALE" selected={ensaiosETestes === "BRASKEM / VALE"}>BRASKEM / VALE</option>
                <option value="PETROBRAS (TIPO 'Q')" selected={ensaiosETestes === "BRASKEM / VALE"}>BRASKEM / VALE</option>
            </Select>

            <div className="flex flex-col">
                <Button className="mt-10" variant="default" type="button" onClick={onSubmit}>Próximo</Button>
            </div>
        </div>
    );
}