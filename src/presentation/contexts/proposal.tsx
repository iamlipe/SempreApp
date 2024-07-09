import { PropsWithChildren, createContext, useContext, useState } from "react"
import { Proposal } from "../../data/models/proposal"

export const fieldLabels: Record<keyof ProposalData, string> = {
    numero_da_proposta: 'Número da Proposta',
    referencia_do_cliente: 'Referência do Cliente',
    empresa: 'Empresa',
    cnpj: 'CNPJ',
    solicitante: 'Solicitante',
    email: 'Email',
    telefone: 'Telefone',

    faturamento: "Faturamento",
    estado_de_faturamento: "Estado de Faturamento",
    sistema: "Sistema",
    forma_de_pagamento: "Forma de Pagamento",
    condicao_de_pagamento: "Observações Condição de Pagamento",

    prazo_de_entrega_e_cronograma: "Prazo de Entrega e Cronograma",
    campo_item_1: "Texto Abreviado Campo do Item 1",
    caracteristicas_do_primeiro_banco_de_baterias: "Características do Primeiro Banco de Baterias",
    campo_item_2: "Texto Abreviado Campo do Item 2",
    caracteristicas_do_segundo_banco_de_baterias: "Características do Segundo Banco de Baterias",

    tipo_de_equipamento: "Tipo de Equipamento",
    tensao_nominal: "Tensão Nominal",
    corrente_de_saida: "Corrente de Saída",
    tensao_nominal_entrada: "Tensão Nominal Entrada",
    frequencia_nominal: "Frequência Nominal",
    fator_de_potencia: "Fator de Potência",
    tolerancia: "Tolerância",
    rendimento: "Rendimento",
    tipo_de_bateria: "Tipo de Baterias",
    numero_de_elementos: "Número de Elementos",
    capacidade: "Capacidade",
    voltagem_de_flutuacao: "Voltagem de Flutuação",
    voltagem_de_carga: "Voltagem de Carga",
    voltagem_de_carga_profunda: "Voltagem de Carga Profunda V/el",

    tensao_maxima_consumidor: "Tensão Máxima Consumidor",
    tensao_minima_consumidor: "Tensão Mínima Consumidor",
    queda_na_uqd: "Queda na UDQ",
    numero_de_estagios: "Número de Estágios",
    tipo_de_retificador: "Retificador Tipo ”TPRS” Sistema Temporizado",
    distorcao_harmonica: "Distorção Harmônica",

    corrente_de_entrada_protecao_geral: "Corrente de Entrada",
    tipo_de_disjuntor_protecao_geral: "Tipo de Disjuntor",
    corrente_de_ruptura_protecao_geral: "Corrente de Ruptura (KA)",
    contato_auxiliar_protecao_geral: "Contato Auxiliar / bobina",
    corrente_de_saida_bateria: "Corrente de Saída (A)",
    tipo_de_disjuntor_bateria: "Tipo de Disjuntor",
    corrente_de_ruptura_bateria: "Corrente de Ruptura (KA)",
    contato_auxiliar_bateria: "Contato Auxiliar / bobina",
    corrente_de_saida_consumidor: "Corrente de Saída (A)",
    tipo_de_disjuntor_consumidor: "Tipo de Disjuntor",
    corrente_de_ruptura_consumidor: "Corrente de Ruptura (KA)",
    contato_auxiliar_consumidor: "Contato Auxiliar / bobina",
    quantidade_de_disjuntores_consumidor: "Quantidade de Disjuntores",

    fusivel_de_potencia: "Fusível de Potência (F1)",
    protecao_circuitos_auxiliares: "Proteção circuitos auxiliares",
    fusivel_de_potencia_na_coluna_retificadora: "Fusível de Potência na coluna retificadora (FR1/FR2/FR3)",
    tratamento_da_barra: "Tratamento da Barra",
    tipo_de_fiacao: "Tipo de Fiação",
    identificacao_de_cabos: "Identificação de Cabos",

    material_do_gabinete: "Material do Gabinete",
    grau_de_protecao: "Grau de Proteção",
    tipo_de_pintura: "Tipo de Pintura",
    cor_externa: "Cor externa",
    soleira_na_base: "Soleira na base",
    entrada_e_saida_de_cabos: "Entrada e saída de cabos",
    exaustao_de_ar_quente: "Exaustão de ar quente",
    protecao_nr10: "Proteção NR10",

    diodo_de_bloqueio: "Diodo de Bloqueio",
    disconexao_de_bateria: "Disconexão de Bateria",
    alarme_sonoro: "Alarme Sonoro",
    sinalizacao_visual_led: "Sinalização Visual Led",
    sinalizacao_remota_sete_reles: "Sinalização Remota 7 reles",
    protecao_contra_surtos_adicional: "Proteção Contra Surtos Adicional",
    plaqueta_de_identificacao: "Plaqueta de Identificação",
    sensores_corrente_alternada: "Sensores CA",

    tipo_de_instrumento: "Tipo de Instrumento",
    instrumento_de_medicao_voltimetro_corrente_continua: "Inst. de medição Voltímetro CC",
    instrumento_de_medicao_voltimetro_corrente_alternada: "Inst. de medição Voltímetro CA",
    instrumento_de_medicao_amperimetro_corrente_continua: "Inst. de medição Amperim. CC",
    instrumento_de_medicao_amperimetro_corrente_alternada: "Inst. de medição Amperim. CA",
    transdutor_quatro_a_vinte_ma_tensao: "Transdutor 4-20ma tensão",
    transdutor_quatro_a_vinte_ma_corrente: "Transdutor 4-20ma corrente",

    chave_liga_desliga: "Chave Liga e Desliga",
    chave_flutuacao_e_carga: "Chave Flutuação e Carga",
    chave_carga_profunda: "Chave Carga Profunda",
    chave_reposicao: "Chave Reposição",
    software_ccs_tools: "Software “CCSTools”",
    comunicacao_supervisorio: "Comunicação Supervisório",
    sobressalentes: "Sobressalentes",
    tomada_de_servicos: "Tomada de Serviços",
    sistema_de_calefacao: "Sistema de Calefação",
    terminal_de_aterramento: "Terminal de Aterramento",
    porta_documentos: "Porta Documentos",

    mao_de_obra_engenharia: "M. O. -  Engenharia (média)",
    mao_de_obra_mecanica: "M. O. -  Mecânica (média)",
    mao_de_obra_eletrica: "M. O. -  Elétrica (média)",
    mao_de_obra_operacional: "M. O. -  Operacional (média)",
    mao_de_obra_administracao: "M. O. -  Administração (média)",

    idioma_da_documentacao: "Idioma da Documentação",
    tipo_de_documentacao: "Tipo de Documentação",
    ensaios_e_testes: "Ensaios e teste",

    start_up: "Start-up",
    start_up_estado: "Estado",
    start_up_valor: "Valor",
    frete: "Frete",
    frete_estado: "Estado",
    frete_valor: "Valor",
    comissao_margem_de_venda: "Margem de venda (%)",
    comissao_vendedor: "Vendedor (%)",
    treinamento: "Treinamento",
    treinamento_estado: "Estado",
    treinamento_valor: "Valor",

    outros_opcionais: "Outros opcionais ",
    outros_opcionais_valor: "Valor",
    valor_bateria_1: "Insira o Valor s/IPI (R$)",

    valor_sem_impostos: "Valor sem Impostos",
    irpj: "IRPJ (4,4%)",
    cofins: "COFINS (3%)",
    pis: "PIS (0,65%)",
    csll: "CSLL (1,08%)",
    icms: "ICMS",
    ipi: "IPI",
    valor_com_pis_cofins: "Valor com PIS/COFINS",
    valor_com_icms: "Valor com ICMS",
    valor_unitario_com_todos_os_impostos: "Valor Unitário com todos os Impostos",

    criado_em: "",
    atualizado_em: ""
}

export type ProposalData = Omit<Proposal, "id">


interface ProposalProps {
    id?: number
    data: ProposalData
    handleData: (values: Partial<ProposalData>) => void;
    handleId: (value: number) => void
}

const initialProposal = { 
    numero_da_proposta: '',
    referencia_do_cliente: '',
    empresa: '',
    cnpj: '',
    solicitante: '',
    email: '',
    telefone: '',

    faturamento: "",
    estado_de_faturamento: "",
    sistema: "",
    forma_de_pagamento: "",
    condicao_de_pagamento: "",

    prazo_de_entrega_e_cronograma: "",
    campo_item_1: "",
    caracteristicas_do_primeiro_banco_de_baterias: "",
    campo_item_2: "",
    caracteristicas_do_segundo_banco_de_baterias: "",

    tipo_de_equipamento: "",
    tensao_nominal: "",
    corrente_de_saida: "",
    tensao_nominal_entrada: "",
    frequencia_nominal: "",
    fator_de_potencia: "",
    tolerancia: "",
    rendimento: "",
    tipo_de_bateria: "",
    numero_de_elementos: "",
    capacidade: "",
    voltagem_de_flutuacao: "",
    voltagem_de_carga: "",
    voltagem_de_carga_profunda: "",

    tensao_maxima_consumidor: "",
    tensao_minima_consumidor: "",
    queda_na_uqd: "",
    numero_de_estagios: "",
    tipo_de_retificador: "",
    distorcao_harmonica: "",

    corrente_de_entrada_protecao_geral: "",
    tipo_de_disjuntor_protecao_geral: "",
    corrente_de_ruptura_protecao_geral: "",
    contato_auxiliar_protecao_geral: "",
    corrente_de_saida_bateria: "",
    tipo_de_disjuntor_bateria: "",
    corrente_de_ruptura_bateria: "",
    contato_auxiliar_bateria: "",
    corrente_de_saida_consumidor: "",
    tipo_de_disjuntor_consumidor: "",
    corrente_de_ruptura_consumidor: "",
    contato_auxiliar_consumidor: "",
    quantidade_de_disjuntores_consumidor: "",

    fusivel_de_potencia: "",
    protecao_circuitos_auxiliares: "",
    fusivel_de_potencia_na_coluna_retificadora: "",
    tratamento_da_barra: "",
    tipo_de_fiacao: "",
    identificacao_de_cabos: "",

    material_do_gabinete: "",
    grau_de_protecao: "",
    tipo_de_pintura: "",
    cor_externa: "",
    soleira_na_base: "",
    entrada_e_saida_de_cabos: "",
    exaustao_de_ar_quente: "",
    protecao_nr10: "",

    diodo_de_bloqueio: "",
    disconexao_de_bateria: "",
    alarme_sonoro: "",
    sinalizacao_visual_led: "",
    sinalizacao_remota_sete_reles: "",
    protecao_contra_surtos_adicional: "",
    plaqueta_de_identificacao: "",
    sensores_corrente_alternada: "",

    tipo_de_instrumento: "",
    instrumento_de_medicao_voltimetro_corrente_continua: "",
    instrumento_de_medicao_voltimetro_corrente_alternada: "",
    instrumento_de_medicao_amperimetro_corrente_continua: "",
    instrumento_de_medicao_amperimetro_corrente_alternada: "",
    transdutor_quatro_a_vinte_ma_tensao: "",
    transdutor_quatro_a_vinte_ma_corrente: "",

    chave_liga_desliga: "",
    chave_flutuacao_e_carga: "",
    chave_carga_profunda: "",
    chave_reposicao: "",
    software_ccs_tools: "",
    comunicacao_supervisorio: "",
    sobressalentes: "",
    tomada_de_servicos: "",
    sistema_de_calefacao: "",
    terminal_de_aterramento: "",
    porta_documentos: "",

    mao_de_obra_engenharia: "",
    mao_de_obra_mecanica: "",
    mao_de_obra_eletrica: "",
    mao_de_obra_operacional: "",
    mao_de_obra_administracao: "",

    idioma_da_documentacao: "",
    tipo_de_documentacao: "",
    ensaios_e_testes: "",

    start_up: "",
    start_up_estado: "",
    start_up_valor: "",
    frete: "",
    frete_estado: "",
    frete_valor: "",
    comissao_margem_de_venda: "",
    comissao_vendedor: "",
    treinamento: "",
    treinamento_estado: "",
    treinamento_valor: "",

    outros_opcionais: "",
    outros_opcionais_valor: "",
    valor_bateria_1: "",

    valor_sem_impostos: "",
    irpj: "",
    cofins: "",
    pis: "",
    csll: "",
    icms: "",
    ipi: "",
    valor_com_pis_cofins: "",
    valor_com_icms: "",
    valor_unitario_com_todos_os_impostos: "",
    
    criado_em: "",
    atualizado_em: ""
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