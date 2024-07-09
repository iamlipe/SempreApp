import { useEffect, useState } from "react";
import { ProposalData, fieldLabels, useProposal } from "../../contexts/proposal";
import { useNavigate } from "react-router-dom";
import { Button } from "../../shared/button";
import { Select } from "../../shared/select";
import { Radio } from "../../shared/radio";
import { Input } from "../../shared/input";


export function CostEleventh() {
    const navigate = useNavigate()

    const [startUp, setaStartUp] = useState('')
    const [startUpEstado, setStartUpEstado] = useState('')
    const [startUpValor, setStartUpValor] = useState('')
    const [frete, setFrete] = useState('')
    const [freteEstado, setFreteEstado] = useState('')
    const [freteValor, setFreteValor] = useState('')
    const [comissaoMargemDeVenda, setComissaoMargemDeVenda] = useState('')
    const [comissaoVendedor, setComissaoVendedor] = useState('')
    const [treinamento, setTreinamento] = useState('')
    const [treinamentoEstado, setTreinamentoEstado] = useState('')
    const [treinamentoValor, setTreinamentoValor] = useState('')

    const [errors, setErrors] = useState<Partial<Record<keyof ProposalData, string>>>({})
    const [canGo, setCanGo] = useState(false)

    const { data, handleData } = useProposal()

    const onSubmit = async () => {
        handleData({ 
            start_up: startUp, 
            start_up_estado: startUpEstado, 
            start_up_valor: startUpValor, 
            frete, 
            frete_estado: freteEstado, 
            frete_valor: freteValor, 
            comissao_margem_de_venda: comissaoMargemDeVenda, 
            comissao_vendedor: comissaoVendedor, 
            treinamento, 
            treinamento_estado: treinamentoEstado, 
            treinamento_valor: treinamentoValor 
        })

        setCanGo(true)
    }

    useEffect(() => {
        setaStartUp(data.start_up)
        setStartUpEstado(data.start_up_estado)
        setStartUpValor(data.start_up_valor)
        setFrete(data.frete)
        setFreteEstado(data.frete_estado)
        setFreteValor(data.frete_valor)
        setComissaoMargemDeVenda(data.comissao_margem_de_venda)
        setComissaoVendedor(data.comissao_vendedor)
        setTreinamento(data.treinamento)
        setTreinamentoEstado(data.treinamento_estado)
        setTreinamentoValor(data.treinamento_valor)
    }, [])

    useEffect(() => {
        if (canGo) {
            const fields: (keyof ProposalData)[] = [
                'start_up', 
                'start_up_estado', 
                'start_up_valor', 
                'frete', 
                'frete_estado', 
                'frete_valor', 
                'treinamento', 
                'treinamento_estado', 
                'treinamento_valor',  
                'comissao_margem_de_venda', 
                'comissao_vendedor'
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
                navigate('/cost/twelfth');
                setCanGo(false)
            } else {
                setErrors(errorsResponse);
                setCanGo(false);
            }
        }
    }, [data, canGo]);

    return (
        <div className="flex flex-col space-y-2">
            <p className="font-semibold text-slate-800 text-sm mb-4">17 - Outros</p>

            <Radio
                label="Start-up"
                options={[
                    { value: 'Sim', label: 'Sim' },
                    { value: 'Não', label: 'Não (Padrão)' },
                ]}
                value={startUp}
                onChange={(e) => setaStartUp(e)}
                error={errors.start_up}
            />

            <div className="flex">
                <div className="flex-1 mr-1">
                    <Select label="Estado" error={errors.start_up_estado} onChange={(e) => setStartUpEstado(e.target.value)} value={startUpEstado}>
                        <option value="">Selecione...</option>
                        <option value="AC" selected={startUpEstado === "AC"}>Acre</option>
                        <option value="AL" selected={startUpEstado === "AL"}>Alagoas</option>
                        <option value="AP" selected={startUpEstado === "AP"}>Amapá</option>
                        <option value="AM" selected={startUpEstado === "AM"}>Amazonas</option>
                        <option value="BA" selected={startUpEstado === "BA"}>Bahia</option>
                        <option value="CE" selected={startUpEstado === "CE"}>Ceará</option>
                        <option value="DF" selected={startUpEstado === "DF"}>Distrito Federal</option>
                        <option value="ES" selected={startUpEstado === "ES"}>Espírito Santo</option>
                        <option value="GO" selected={startUpEstado === "GO"}>Goiás</option>
                        <option value="MA" selected={startUpEstado === "MA"}>Maranhão</option>
                        <option value="MT" selected={startUpEstado === "MT"}>Mato Grosso</option>
                        <option value="MS" selected={startUpEstado === "MS"}>Mato Grosso do Sul</option>
                        <option value="MG" selected={startUpEstado === "MG"}>Minas Gerais</option>
                        <option value="PA" selected={startUpEstado === "PA"}>Pará</option>
                        <option value="PB" selected={startUpEstado === "PB"}>Paraíba</option>
                        <option value="PR" selected={startUpEstado === "PR"}>Paraná</option>
                        <option value="PE" selected={startUpEstado === "PE"}>Pernambuco</option>
                        <option value="PI" selected={startUpEstado === "PI"}>Piauí</option>
                        <option value="RJ" selected={startUpEstado === "RJ"}>Rio de Janeiro</option>
                        <option value="RN" selected={startUpEstado === "RN"}>Rio Grande do Norte</option>
                        <option value="RS" selected={startUpEstado === "RS"}>Rio Grande do Sul</option>
                        <option value="RO" selected={startUpEstado === "RO"}>Rondônia</option>
                        <option value="RR" selected={startUpEstado === "RR"}>Roraima</option>
                        <option value="SC" selected={startUpEstado === "SC"}>Santa Catarina</option>
                        <option value="SP" selected={startUpEstado === "SP"}>São Paulo</option>
                        <option value="SE" selected={startUpEstado === "SE"}>Sergipe</option>
                        <option value="TO" selected={startUpEstado === "TO"}>Tocantins</option>
                    </Select>
                </div>
                <div className="flex-1 ml-1">
                    <Input label="Valor (R$)" error={errors.start_up_valor} placeholder="Digite..." type="text" onChange={(e) => setStartUpValor(e.target.value)} value={startUpValor} />
                </div>
            </div>

            <Radio
                label="Frete"
                options={[
                    { value: 'FOB', label: 'FOB (Padrão)' },
                    { value: 'CIF', label: 'CIF' },
                ]}
                value={frete}
                onChange={(e) => setFrete(e)}
                error={errors.frete}
            />

            <div className="flex">
                <div className="flex-1 mr-1">
                    <Select label="Estado" error={errors.frete_estado} onChange={(e) => setFreteEstado(e.target.value)} value={freteEstado}>
                        <option value="">Selecione...</option>
                        <option value="AC" selected={freteEstado === "AC"}>Acre</option>
                        <option value="AL" selected={freteEstado === "AL"}>Alagoas</option>
                        <option value="AP" selected={freteEstado === "AP"}>Amapá</option>
                        <option value="AM" selected={freteEstado === "AM"}>Amazonas</option>
                        <option value="BA" selected={freteEstado === "BA"}>Bahia</option>
                        <option value="CE" selected={freteEstado === "CE"}>Ceará</option>
                        <option value="DF" selected={freteEstado === "DF"}>Distrito Federal</option>
                        <option value="ES" selected={freteEstado === "ES"}>Espírito Santo</option>
                        <option value="GO" selected={freteEstado === "GO"}>Goiás</option>
                        <option value="MA" selected={freteEstado === "MA"}>Maranhão</option>
                        <option value="MT" selected={freteEstado === "MT"}>Mato Grosso</option>
                        <option value="MS" selected={freteEstado === "MS"}>Mato Grosso do Sul</option>
                        <option value="MG" selected={freteEstado === "MG"}>Minas Gerais</option>
                        <option value="PA" selected={freteEstado === "PA"}>Pará</option>
                        <option value="PB" selected={freteEstado === "PB"}>Paraíba</option>
                        <option value="PR" selected={freteEstado === "PR"}>Paraná</option>
                        <option value="PE" selected={freteEstado === "PE"}>Pernambuco</option>
                        <option value="PI" selected={freteEstado === "PI"}>Piauí</option>
                        <option value="RJ" selected={freteEstado === "RJ"}>Rio de Janeiro</option>
                        <option value="RN" selected={freteEstado === "RN"}>Rio Grande do Norte</option>
                        <option value="RS" selected={freteEstado === "RS"}>Rio Grande do Sul</option>
                        <option value="RO" selected={freteEstado === "RO"}>Rondônia</option>
                        <option value="RR" selected={freteEstado === "RR"}>Roraima</option>
                        <option value="SC" selected={freteEstado === "SC"}>Santa Catarina</option>
                        <option value="SP" selected={freteEstado === "SP"}>São Paulo</option>
                        <option value="SE" selected={freteEstado === "SE"}>Sergipe</option>
                        <option value="TO" selected={freteEstado === "TO"}>Tocantins</option>
                    </Select>
                </div>
                <div className="flex-1 ml-1">
                    <Input label="Valor (R$)" error={errors.frete_valor} placeholder="Digite..." type="text" onChange={(e) => setFreteValor(e.target.value)} value={freteValor} />
                </div>
            </div>

            <Radio
                label="Treinamento"
                options={[
                    { value: 'Não (Padrão)', label: 'Não (Padrão)' },
                    { value: 'Na SEMPRE', label: 'Na SEMPRE' },
                    { value: 'No Cliente', label: 'No Cliente' },
                ]}
                value={treinamento}
                onChange={(e) => setTreinamento(e)}
                error={errors.treinamento}
            />

            <div className="flex">
                <div className="flex-1 mr-1">
                    <Select label="Estado" error={errors.treinamento_estado} onChange={(e) => setTreinamentoEstado(e.target.value)} value={treinamentoEstado}>
                        <option value="">Selecione...</option>
                        <option value="AC" selected={treinamentoEstado === "AC"}>Acre</option>
                        <option value="AL" selected={treinamentoEstado === "AL"}>Alagoas</option>
                        <option value="AP" selected={treinamentoEstado === "AP"}>Amapá</option>
                        <option value="AM" selected={treinamentoEstado === "AM"}>Amazonas</option>
                        <option value="BA" selected={treinamentoEstado === "BA"}>Bahia</option>
                        <option value="CE" selected={treinamentoEstado === "CE"}>Ceará</option>
                        <option value="DF" selected={treinamentoEstado === "DF"}>Distrito Federal</option>
                        <option value="ES" selected={treinamentoEstado === "ES"}>Espírito Santo</option>
                        <option value="GO" selected={treinamentoEstado === "GO"}>Goiás</option>
                        <option value="MA" selected={treinamentoEstado === "MA"}>Maranhão</option>
                        <option value="MT" selected={treinamentoEstado === "MT"}>Mato Grosso</option>
                        <option value="MS" selected={treinamentoEstado === "MS"}>Mato Grosso do Sul</option>
                        <option value="MG" selected={treinamentoEstado === "MG"}>Minas Gerais</option>
                        <option value="PA" selected={treinamentoEstado === "PA"}>Pará</option>
                        <option value="PB" selected={treinamentoEstado === "PB"}>Paraíba</option>
                        <option value="PR" selected={treinamentoEstado === "PR"}>Paraná</option>
                        <option value="PE" selected={treinamentoEstado === "PE"}>Pernambuco</option>
                        <option value="PI" selected={treinamentoEstado === "PI"}>Piauí</option>
                        <option value="RJ" selected={treinamentoEstado === "RJ"}>Rio de Janeiro</option>
                        <option value="RN" selected={treinamentoEstado === "RN"}>Rio Grande do Norte</option>
                        <option value="RS" selected={treinamentoEstado === "RS"}>Rio Grande do Sul</option>
                        <option value="RO" selected={treinamentoEstado === "RO"}>Rondônia</option>
                        <option value="RR" selected={treinamentoEstado === "RR"}>Roraima</option>
                        <option value="SC" selected={treinamentoEstado === "SC"}>Santa Catarina</option>
                        <option value="SP" selected={treinamentoEstado === "SP"}>São Paulo</option>
                        <option value="SE" selected={treinamentoEstado === "SE"}>Sergipe</option>
                        <option value="TO" selected={treinamentoEstado === "TO"}>Tocantins</option>
                    </Select>
                </div>
                <div className="flex-1 ml-1">
                    <Input label="Valor (R$)" error={errors.treinamento_valor} placeholder="Digite..." type="text" onChange={(e) => setTreinamentoValor(e.target.value)} value={treinamentoValor} />
                </div>
            </div>

            <div className="flex flex-col">
                <span className="font-semibold text-slate-800">Comissão</span>
            </div>

            <div className="flex">
                <div className="flex-1 mr-1">
                    <Input label="Margem de venda (%)" error={errors.comissao_margem_de_venda} placeholder="Digite..." type="text" onChange={(e) => setComissaoMargemDeVenda(e.target.value)} value={comissaoMargemDeVenda} />
                </div>
                <div className="flex-1 ml-1">
                    <Input label="Vendedor (%)" error={errors.comissao_vendedor} placeholder="Digite..." type="text" onChange={(e) => setComissaoVendedor(e.target.value)} value={comissaoVendedor} />
                </div>
            </div>

            <div className="flex flex-col">
                <Button className="mt-10" variant="default" type="button" onClick={onSubmit}>Próximo</Button>
            </div>
        </div>
    );
}
