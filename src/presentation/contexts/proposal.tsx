import { PropsWithChildren, createContext, useContext, useState } from "react"

export const fieldLabels: Record<keyof ProposalData, string> = {
    proposalNumber: 'Número da Proposta',
    customerReference: 'Referência do Cliente',
    company: 'Empresa',
    cnpj: 'CNPJ',
    requester: 'Solicitante',
    email: 'Email',
    phone: 'Telefone',
    invoicing: "Faturamento",
    invoicingStatus: "Estado de Faturamento",
    system: "Sistema",
    formPayment: "Forma de Pagamento",
    notesPaymentCondition: "Observações Condição de Pagamento",
    deliveryTimeAndSchedule: "Prazo de Entrega e Cronograma",
    shortTextItemFieldOne: "Texto Abreviado Campo do Item 1",
    featuresOfTheFirstBatteryBank: "Características do Primeiro Banco de Baterias",
    shortTextItemFieldTwo: "Texto Abreviado Campo do Item 2",
    featuresOfTheSecondBatteryBank: "Características do Segundo Banco de Baterias",
    createdAt: "Criado Quando",
    equipmentType: "Tipo de Equipamento",
    nominalVoltage: "Tensão Nominal",
    outputCurrent: "Corrente de Saída",
    nominalInputVoltage: "Tensão Nominal Entrada",
    nominalFrequency: "Frequência Nominal",
    powerFactor: "Fator de Potência",
    tolerance: "Tolerância",
    efficiency: "Rendimento",
    batteryType: "Tipo de Baterias",
    numberOfElements: "Número de Elementos",
    capacity: "Capacidade",
    voltageFluctuation: "Voltagem de Flutuação",
    voltageLoad: "Voltagem de Carga",
    voltageDeepDischarge: "Voltagem de Carga Profunda V/el",

    tensaoMaximaConsumidor: "Tensão Máxima Consumidor",
    tensaoMinimaConsumidor: "Tensão Mínima Consumidor",
    quedaNaUDQ: "Queda na UDQ",
    numeroDeEstagios: "Número de Estágios",
    tipoRetificador: "Retificador Tipo ”TPRS” Sistema Temporizado",
    distorcaoHarmonica: "Distorção Harmônica",

    correnteDeEntradaProtecaoGeral: "Corrente de Entrada",
    tipoDeDisjuntorProtecaoGeral: "Tipo de Disjuntor",
    correnteDeRupturaProtecaoGeral: "Corrente de Ruptura (KA)",
    contatoAuxiliarProtecaoGeral: "Contato Auxiliar / bobina",
    correnteDeSaidaBateria: "Corrente de Saída (A)",
    tipoDisjuntorBateria: "Tipo de Disjuntor",
    correnteDeRupturaBateria: "Corrente de Ruptura (KA)",
    contatoAuxiliarBateria: "Contato Auxiliar / bobina",
    correnteDeSaidaConsumidor: "Corrente de Saída (A)",
    tipoDisjuntoConsumidor: "Tipo de Disjuntor",
    correnteDeRupturaConsumidor: "Corrente de Ruptura (KA)",
    contatoAuxiliarConsumidor: "Contato Auxiliar / bobina",
    quantidadeDeDisjuntoresConsumidor: "Quantidade de Disjuntores",

    fusivelDePotencia: "Fusível de Potência (F1)",
    protecaoCircuitosAuxiliares: "Proteção circuitos auxiliares",
    fusivelDePotenciaNaColunaRetificadora: "Fusível de Potência na coluna retificadora (FR1/FR2/FR3)",
    tratamentoDaBarra: "Tratamento da Barra",
    tipoDeFiacao: "Tipo de Fiação",
    identificacaoDeCabos: "Identificação de Cabos",

    materialDoGabinete: "Material do Gabinete",
    grauDeProtecao: "Grau de Proteção",
    tipoDePintura: "Tipo de Pintura",
    corExterna: "Cor externa",
    soleiraNaBase: "Soleira na base",
    entradaESaidaDeCabos: "Entrada e saída de cabos",
    exaustaoDeArQuente: "Exaustão de ar quente",
    protecaoNR10: "Proteção NR10",

    diodoDeBloqueio: "Diodo de Bloqueio",
    disconexaoDeBateria: "Disconexão de Bateria",
    alarmeSonoro: "Alarme Sonoro",
    sinalizacaoVisualLed: "Sinalização Visual Led",
    sinalizacaoRemotaSeteReles: "Sinalização Remota 7 reles",
    protecaoContraSurtosAdicional: "Proteção Contra Surtos Adicional",
    plaquetaDeIdentificacao: "Plaqueta de Identificação",
    sensoresCorrenteAlternada: "Sensores CA",

    tipoDeInstrumento: "Tipo de Instrumento",
    instDeMedicaoVoltimetroCorrenteContinua: "Inst. de medição Voltímetro CC",
    instDeMedicaoVoltimetroCorrenteAlternada: "Inst. de medição Voltímetro CA",
    instDeMedicaoAmperimetroCorrenteContinua: "Inst. de medição Amperim. CC",
    instDeMedicaoAmperimetroCorrenteAlternada: "Inst. de medição Amperim. CA",
    transdutorQuatroAVinteMATensao: "Transdutor 4-20ma tensão",
    transdutorQuatroAVinteMACorrente: "Transdutor 4-20ma corrente",

    chaveLigaDesliga: "Chave Liga e Desliga",
    chaveFlutuacaoECarga: "Chave Flutuação e Carga",
    chaveCargaProfunda: "Chave Carga Profunda",
    chaveReposicao: "Chave Reposição",
    softwareCCSTools: "Software “CCSTools”",
    comunicacãoSupervisorio: "Comunicação Supervisório",
    sobressalentes: "Sobressalentes",
    tomadaDeServicoes: "Tomada de Serviços",
    sistemaDeCalefacao: "Sistema de Calefação",
    terminalDeAterramento: "Terminal de Aterramento",
    portaDocumentos: "Porta Documentos",

    maoDeObraEngenharia: "M. O. -  Engenharia (média)",
    maoDeObraMecanica: "M. O. -  Mecânica (média)",
    maoDeObraEletrica: "M. O. -  Elétrica (média)",
    maoDeObraOperacional: "M. O. -  Operacional (média)",
    maoDeObraAdministracao: "M. O. -  Administração (média)",

    idiomaDaDocumentacao: "Idioma da Documentação",
    tipoDeDocumentacao: "Tipo de Documentação",
    ensaiosETestes: "Ensaios e teste",

    startUp: "Start-up",
    startUpEstado: "Estado",
    startUpValor: "Valor",
    frete: "Frete",
    freteEstado: "Estado",
    freteValor: "Valor",
    comissaoMargemDeVenda: "Margem de venda (%)",
    comissaoVendedor: "Vendedor (%)",
    treinamento: "Treinamento",
    treinamentoEstado: "Estado",
    treinamentoValor: "Valor",

    outrosOpcionais: "Outros opcionais ",
    outrosOpcionaisValor: "Valor",
    bateriaUmValor: "Insira o Valor s/IPI (R$)",

    valorSemImpostos: "Valor sem Impostos",
    irpj: "IRPJ (4,4%)",
    cofins: "COFINS (3%)",
    pis: "PIS (0,65%)",
    csll: "CSLL (1,08%)",
    icms: "ICMS",
    ipi: "IPI",
    valorComPisCofins: "Valor com PIS/COFINS",
    valorComIcms: "Valor com ICMS",
    valorUnitarioComTodosOsImpostos: "Valor Unitário com todos os Impostos",
}

export interface ProposalData {
    proposalNumber: string;
    customerReference: string;
    company: string;
    cnpj: string;
    requester: string;
    email: string;
    phone: string;
    invoicing: string;
    invoicingStatus: string;
    system: string;
    formPayment: string;
    notesPaymentCondition: string
    deliveryTimeAndSchedule: string;
    shortTextItemFieldOne: string;
    featuresOfTheFirstBatteryBank: string;
    shortTextItemFieldTwo: string;
    featuresOfTheSecondBatteryBank: string;
    equipmentType: string;
    nominalVoltage: string;
    outputCurrent: string;
    nominalInputVoltage: string;
    nominalFrequency: string;
    powerFactor: string;
    tolerance: string;
    efficiency: string;
    batteryType: string;
    numberOfElements: string;
    capacity: string;
    voltageFluctuation: string;
    voltageLoad: string;
    voltageDeepDischarge: string;

    tensaoMaximaConsumidor: string;
    tensaoMinimaConsumidor: string;
    quedaNaUDQ: string;
    numeroDeEstagios: string;
    tipoRetificador: string;
    distorcaoHarmonica: string;

    correnteDeEntradaProtecaoGeral: string;
    tipoDeDisjuntorProtecaoGeral: string;
    correnteDeRupturaProtecaoGeral: string;
    contatoAuxiliarProtecaoGeral: string;
    correnteDeSaidaBateria: string;
    tipoDisjuntorBateria: string;
    correnteDeRupturaBateria: string;
    contatoAuxiliarBateria: string;
    correnteDeSaidaConsumidor: string;
    tipoDisjuntoConsumidor: string;
    correnteDeRupturaConsumidor: string;
    contatoAuxiliarConsumidor: string;
    quantidadeDeDisjuntoresConsumidor: string;

    fusivelDePotencia: string;
    protecaoCircuitosAuxiliares: string;
    fusivelDePotenciaNaColunaRetificadora: string;
    tratamentoDaBarra: string;
    tipoDeFiacao: string;
    identificacaoDeCabos: string;

    materialDoGabinete: string;
    grauDeProtecao: string;
    tipoDePintura: string;
    corExterna: string;
    soleiraNaBase: string;
    entradaESaidaDeCabos: string;
    exaustaoDeArQuente: string;
    protecaoNR10: string;

    diodoDeBloqueio: string;
    disconexaoDeBateria: string;
    alarmeSonoro: string;
    sinalizacaoVisualLed: string;
    sinalizacaoRemotaSeteReles: string;
    protecaoContraSurtosAdicional: string;
    plaquetaDeIdentificacao: string;
    sensoresCorrenteAlternada: string;

    tipoDeInstrumento: string;
    instDeMedicaoVoltimetroCorrenteContinua: string;
    instDeMedicaoVoltimetroCorrenteAlternada: string;
    instDeMedicaoAmperimetroCorrenteContinua: string;
    instDeMedicaoAmperimetroCorrenteAlternada: string;
    transdutorQuatroAVinteMATensao: string;
    transdutorQuatroAVinteMACorrente: string;

    chaveLigaDesliga: string;
    chaveFlutuacaoECarga: string;
    chaveCargaProfunda: string;
    chaveReposicao: string;
    softwareCCSTools: string;
    comunicacãoSupervisorio: string;
    sobressalentes: string;
    tomadaDeServicoes: string;
    sistemaDeCalefacao: string;
    terminalDeAterramento: string;
    portaDocumentos: string;

    maoDeObraEngenharia: string;
    maoDeObraMecanica: string;
    maoDeObraEletrica: string;
    maoDeObraOperacional: string;
    maoDeObraAdministracao: string;

    idiomaDaDocumentacao: string;
    tipoDeDocumentacao: string;
    ensaiosETestes: string;

    startUp: string;
    startUpEstado: string;
    startUpValor: string;
    frete: string;
    freteEstado: string;
    freteValor: string;
    comissaoMargemDeVenda: string;
    comissaoVendedor: string;
    treinamento: string;
    treinamentoEstado: string;
    treinamentoValor: string;

    outrosOpcionais: string;
    outrosOpcionaisValor: string;
    bateriaUmValor: string;

    valorSemImpostos: string;
    irpj: string;
    cofins: string;
    pis: string;
    csll: string;
    icms: string;
    ipi: string;
    valorComPisCofins: string;
    valorComIcms: string;
    valorUnitarioComTodosOsImpostos: string;

    createdAt: string;
}

interface ProposalProps {
    id?: number
    data: ProposalData
    handleData: (values: Partial<ProposalData>) => void;
    handleId: (value: number) => void
}

const initialProposal = { 
    proposalNumber: '',
    customerReference: '',
    company: '',
    cnpj: '',
    requester: '',
    email: '',
    phone: '',

    invoicing: "",
    invoicingStatus: "",
    system: "",
    formPayment: "",
    notesPaymentCondition: "",

    deliveryTimeAndSchedule: "",
    shortTextItemFieldOne: "",
    featuresOfTheFirstBatteryBank: "",
    shortTextItemFieldTwo: "",
    featuresOfTheSecondBatteryBank: "",

    equipmentType: "",
    nominalVoltage: "",
    outputCurrent: "",
    nominalInputVoltage: "",
    nominalFrequency: "",
    powerFactor: "",
    tolerance: "",
    efficiency: "",
    batteryType: "",
    numberOfElements: "",
    capacity: "",
    voltageFluctuation: "",
    voltageLoad: "",
    voltageDeepDischarge: "",

    tensaoMaximaConsumidor: "",
    tensaoMinimaConsumidor: "",
    quedaNaUDQ: "",
    numeroDeEstagios: "",
    tipoRetificador: "",
    distorcaoHarmonica: "",

    correnteDeEntradaProtecaoGeral: "",
    tipoDeDisjuntorProtecaoGeral: "",
    correnteDeRupturaProtecaoGeral: "",
    contatoAuxiliarProtecaoGeral: "",
    correnteDeSaidaBateria: "",
    tipoDisjuntorBateria: "",
    correnteDeRupturaBateria: "",
    contatoAuxiliarBateria: "",
    correnteDeSaidaConsumidor: "",
    tipoDisjuntoConsumidor: "",
    correnteDeRupturaConsumidor: "",
    contatoAuxiliarConsumidor: "",
    quantidadeDeDisjuntoresConsumidor: "",

    fusivelDePotencia: "",
    protecaoCircuitosAuxiliares: "",
    fusivelDePotenciaNaColunaRetificadora: "",
    tratamentoDaBarra: "",
    tipoDeFiacao: "",
    identificacaoDeCabos: "",

    materialDoGabinete: "",
    grauDeProtecao: "",
    tipoDePintura: "",
    corExterna: "",
    soleiraNaBase: "",
    entradaESaidaDeCabos: "",
    exaustaoDeArQuente: "",
    protecaoNR10: "",

    diodoDeBloqueio: "",
    disconexaoDeBateria: "",
    alarmeSonoro: "",
    sinalizacaoVisualLed: "",
    sinalizacaoRemotaSeteReles: "",
    protecaoContraSurtosAdicional: "",
    plaquetaDeIdentificacao: "",
    sensoresCorrenteAlternada: "",

    tipoDeInstrumento: "",
    instDeMedicaoVoltimetroCorrenteContinua: "",
    instDeMedicaoVoltimetroCorrenteAlternada: "",
    instDeMedicaoAmperimetroCorrenteContinua: "",
    instDeMedicaoAmperimetroCorrenteAlternada: "",
    transdutorQuatroAVinteMATensao: "",
    transdutorQuatroAVinteMACorrente: "",

    chaveLigaDesliga: "",
    chaveFlutuacaoECarga: "",
    chaveCargaProfunda: "",
    chaveReposicao: "",
    softwareCCSTools: "",
    comunicacãoSupervisorio: "",
    sobressalentes: "",
    tomadaDeServicoes: "",
    sistemaDeCalefacao: "",
    terminalDeAterramento: "",
    portaDocumentos: "",

    maoDeObraEngenharia: "",
    maoDeObraMecanica: "",
    maoDeObraEletrica: "",
    maoDeObraOperacional: "",
    maoDeObraAdministracao: "",

    idiomaDaDocumentacao: "",
    tipoDeDocumentacao: "",
    ensaiosETestes: "",

    startUp: "",
    startUpEstado: "",
    startUpValor: "",
    frete: "",
    freteEstado: "",
    freteValor: "",
    comissaoMargemDeVenda: "",
    comissaoVendedor: "",
    treinamento: "",
    treinamentoEstado: "",
    treinamentoValor: "",

    outrosOpcionais: "",
    outrosOpcionaisValor: "",
    bateriaUmValor: "",

    valorSemImpostos: "",
    irpj: "",
    cofins: "",
    pis: "",
    csll: "",
    icms: "",
    ipi: "",
    valorComPisCofins: "",
    valorComIcms: "",
    valorUnitarioComTodosOsImpostos: "",

    createdAt: ""
}

export const ProposalContext = createContext<ProposalProps>(null)

export function ProposalProvider({ children }: PropsWithChildren) {
    const [id, setId] = useState<number | null | undefined>(undefined)
    const [data, setData] = useState<ProposalData>(initialProposal)

    function handleData(values: Partial<ProposalData>) {
        setData({ ...data, ...values })
    }

    function handleId(value: number) {
        setId(value)
    }

    console.log(data)

    return (
        <ProposalContext.Provider value={{ id, data, handleData, handleId }} >
            {children}
        </ProposalContext.Provider>
    )
}

export function useProposal() {
    const context = useContext(ProposalContext)

    if (!context) {
        throw new Error('something went wrong')
    }

    return context
}