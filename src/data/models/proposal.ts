export type Proposal = {
    id: string;

    numero_da_proposta: string;
    referencia_do_cliente: string;
    empresa: string;
    cnpj: string;
    solicitante: string;
    email: string;
    telefone: string;

    faturamento: string;
    estado_de_faturamento: string;
    sistema: string;
    forma_de_pagamento: string;
    condicao_de_pagamento: string

    prazo_de_entrega_e_cronograma: string;
    campo_item_1: string;
    caracteristicas_do_primeiro_banco_de_baterias: string;
    campo_item_2: string;
    caracteristicas_do_segundo_banco_de_baterias: string;

    tipo_de_equipamento: string;
    tensao_nominal: string;
    corrente_de_saida: string;
    tensao_nominal_entrada: string;
    frequencia_nominal: string;
    fator_de_potencia: string;
    tolerancia: string;
    rendimento: string;
    tipo_de_bateria: string;
    numero_de_elementos: string;
    capacidade: string;
    voltagem_de_flutuacao: string;
    voltagem_de_carga: string;
    voltagem_de_carga_profunda: string;

    tensao_maxima_consumidor: string;
    tensao_minima_consumidor: string;
    queda_na_uqd: string;
    numero_de_estagios: string;
    tipo_de_retificador: string;
    distorcao_harmonica: string;

    corrente_de_entrada_protecao_geral: string;
    tipo_de_disjuntor_protecao_geral: string;
    corrente_de_ruptura_protecao_geral: string;
    contato_auxiliar_protecao_geral: string;
    corrente_de_saida_bateria: string;
    tipo_de_disjuntor_bateria: string;
    corrente_de_ruptura_bateria: string;
    contato_auxiliar_bateria: string;
    corrente_de_saida_consumidor: string;
    tipo_de_disjuntor_consumidor: string;
    corrente_de_ruptura_consumidor: string;
    contato_auxiliar_consumidor: string;
    quantidade_de_disjuntores_consumidor: string;

    fusivel_de_potencia: string;
    protecao_circuitos_auxiliares: string;
    fusivel_de_potencia_na_coluna_retificadora: string;
    tratamento_da_barra: string;
    tipo_de_fiacao: string;
    identificacao_de_cabos: string;

    material_do_gabinete: string;
    grau_de_protecao: string;
    tipo_de_pintura: string;
    cor_externa: string;
    soleira_na_base: string;
    entrada_e_saida_de_cabos: string;
    exaustao_de_ar_quente: string;
    protecao_nr10: string;

    diodo_de_bloqueio: string;
    disconexao_de_bateria: string;
    alarme_sonoro: string;
    sinalizacao_visual_led: string;
    sinalizacao_remota_sete_reles: string;
    protecao_contra_surtos_adicional: string;
    plaqueta_de_identificacao: string;
    sensores_corrente_alternada: string;

    tipo_de_instrumento: string;
    instrumento_de_medicao_voltimetro_corrente_continua: string;
    instrumento_de_medicao_voltimetro_corrente_alternada: string;
    instrumento_de_medicao_amperimetro_corrente_continua: string;
    instrumento_de_medicao_amperimetro_corrente_alternada: string;
    transdutor_quatro_a_vinte_ma_tensao: string;
    transdutor_quatro_a_vinte_ma_corrente: string;

    chave_liga_desliga: string;
    chave_flutuacao_e_carga: string;
    chave_carga_profunda: string;
    chave_reposicao: string;
    software_ccs_tools: string;
    comunicacao_supervisorio: string;
    sobressalentes: string;
    tomada_de_servicos: string;
    sistema_de_calefacao: string;
    terminal_de_aterramento: string;
    porta_documentos: string;

    mao_de_obra_engenharia: string;
    mao_de_obra_mecanica: string;
    mao_de_obra_eletrica: string;
    mao_de_obra_operacional: string;
    mao_de_obra_administracao: string;

    idioma_da_documentacao: string;
    tipo_de_documentacao: string;
    ensaios_e_testes: string;

    start_up: string;
    start_up_estado: string;
    start_up_valor: string;
    frete: string;
    frete_estado: string;
    frete_valor: string;
    comissao_margem_de_venda: string;
    comissao_vendedor: string;
    treinamento: string;
    treinamento_estado: string;
    treinamento_valor: string;

    outros_opcionais: string;
    outros_opcionais_valor: string;
    valor_bateria_1: string;

    valor_sem_impostos: string;
    irpj: string;
    cofins: string;
    pis: string;
    csll: string;
    icms: string;
    ipi: string;
    valor_com_pis_cofins: string;
    valor_com_icms: string;
    valor_unitario_com_todos_os_impostos: string;

    criado_em: string;
    atualizado_em: string;
}