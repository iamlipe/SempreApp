import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/button";
import { Input } from "../../shared/input";
import { Select } from "../../shared/select";
import { Radio } from "../../shared/radio";
import { ProposalData, fieldLabels, useProposal } from "../../contexts/proposal";

export function CostSecond() {
    const navigate = useNavigate()

    const [tensaoMaximaConsumidor, setTensaoMaximaConsumidor] = useState('')
    const [tensaoMinimaConsumidor, setTensaoMinimaConsumidor] = useState('')
    const [quedaNaUDQ, setQuedaNaUDQ] = useState('')
    const [numeroDeEstagios, setNumeroDeEstagios] = useState('')
    const [tipoRetificador, setTipoRetificador] = useState('')
    const [distorcaoHarmonica, setDistorcaoHarmonica] = useState('')

    const [errors, setErrors] = useState<Partial<Record<keyof ProposalData, string>>>({})
    const [canGo, setCanGo] = useState(false)

    const { data, handleData } = useProposal()

    const onSubmit = async () => {
        handleData({ 
            tensao_maxima_consumidor: tensaoMaximaConsumidor, 
            tensao_minima_consumidor: tensaoMinimaConsumidor, 
            queda_na_uqd: quedaNaUDQ, 
            numero_de_estagios: numeroDeEstagios, 
            tipo_de_retificador: tipoRetificador, 
            distorcao_harmonica: distorcaoHarmonica 
        })
        setCanGo(true)
    }

    useEffect(() => {
        setTensaoMaximaConsumidor(data.tensao_maxima_consumidor)
        setTensaoMinimaConsumidor(data.tensao_minima_consumidor)
        setQuedaNaUDQ('10')
        setNumeroDeEstagios('10')
        setTipoRetificador(data.tipo_de_retificador)
        setDistorcaoHarmonica(data.distorcao_harmonica)
    }, [])

    useEffect(() => {
        if(canGo) {
            const fields: (keyof ProposalData)[] = [
                'tensao_maxima_consumidor', 
                'tensao_minima_consumidor', 
                'queda_na_uqd', 
                'numero_de_estagios', 
                'tipo_de_retificador', 
                'distorcao_harmonica'
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
                navigate('/cost/third');
                setCanGo(false)
            } else {
                setErrors(errorsResponse);
                setCanGo(false);
            }
        }
    }, [data, canGo]);

    return (
        <div className="flex flex-col space-y-2">
            <p className="font-semibold text-slate-800 text-sm mb-4">4 - Características do Consumidor</p>

           <Select label="Tensão Máxima Consumidor" error={errors.tensao_maxima_consumidor} onChange={(e) => setTensaoMaximaConsumidor(e.target.value)} value={tensaoMaximaConsumidor}>
                <option value="">Selecione...</option>
                {Array.from({ length: 300 }, (_, index) => (
                    <option key={index + 1} value={index + 1} selected={tensaoMaximaConsumidor === `${index + 1}`}>
                        {index + 1}
                    </option>
                ))}     
            </Select>  

            <Select label="Tensão Mínima Consumidor" error={errors.tensao_minima_consumidor} onChange={(e) => setTensaoMinimaConsumidor(e.target.value)} value={tensaoMinimaConsumidor}>
                <option value="">Selecione...</option>
                {Array.from({ length: 300 }, (_, index) => (
                    <option key={index + 1} value={index + 1} selected={tensaoMinimaConsumidor === `${index + 1}`}>
                        {index + 1}
                    </option>
                ))}     
            </Select>    

            <Input label="Queda na UDQ" disabled placeholder="Digite aqui" type="text" defaultValue={quedaNaUDQ} />
            <Input label="Número de Estágios" disabled placeholder="Digite aqui" type="text" defaultValue={numeroDeEstagios} />
            
            <div className="flex flex-col">
                <p className="font-semibold text-slate-800 text-sm mt-6 mb-2">5 - Disparo e Distorção Harmônica</p>
            </div>

            <Radio
                label="Retificador Tipo ”TPRS” Sistema Temporizado"
                options={[
                    { value: '6 Pulsos', label: '6 Pulsos' },
                    { value: '12 Pulsos', label: '12 Pulsos' },
                ]}
                value={tipoRetificador}
                onChange={(e) => setTipoRetificador(e)}
                error={errors.tipo_de_retificador}
            />

            <Radio
                label="Distorção Harmônica "
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não (Padrão)' },
                ]}
                value={distorcaoHarmonica}
                onChange={(e) => setDistorcaoHarmonica(e)}
                error={errors.distorcao_harmonica}
            />

            <div className="flex flex-col">
                <Button className="mt-10" variant="default" type="button" onClick={onSubmit}>Próximo</Button>
            </div>
        </div>
    );
}