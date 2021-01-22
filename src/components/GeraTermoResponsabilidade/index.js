export function geraTermoResponsabilidade(nome, login, cpf, equipamentos) {

    const titulo = `                                          TERMO DE RESPONSABILIDADE PARA EQUIPAMENTOS
    
    `
    const inicio = `A ALTERDATA TECNOLOGIA EM INFORMÁTICA LTDA, estabelecida na Rua Prefeito Sebastião Teixeira, 227- Centro - Teresópolis, inscrita no CNPJ sob o n° 36.462.778./0001-60, doravante denominada EMPRESA, entrega neste ato, a titulo de empréstimo, o(s) equipamento(s)
    `
    const parteEquipamentos = equipamentos.map(equipamento => (
    `
    ${equipamento.categoria}, ${equipamento.descricao}, código: ${equipamento.codigoEquipamento}`
    ))

    const corpo = `

ao colaborador ${nome}, login ${login}, CPF ${cpf} doravante denominado simplesmente de USUÁRIO, sob as condições a seguir:
1) Os softwares acima especificados serão instalados no equipamento acima indicado pelo USUÁRIO  e deverá ser utilizado, UNICA E EXCLUSIVAMENTE, para prestação de serviços à EMPRESA, em observância a atividade exercida pelo USUÁRIO, dentro da jornada de trabalho prevista no contrato de trabalho celebrado.

2) O USUÁRIO é responsável pelo uso e conservação do equipamento e seus acessórios

3) O USUÁRIO tem apenas o direito ao uso do equipamento, nos termos deste documento, que são destinados, exclusivamente, para prestação de serviços profissionais. Por este motivo, pertencem a EMPRESA a PROPRIEDADE do equipamento e seus acessórios, estando terminantemente proibida a realização de empréstimo, aluguel ou cessão a terceiros.

4) Caso o equipamento seja danificado e/ou inutilizado por emprego inadequado, mau uso, negligência ou na ocorrência de extravio (perda), o USUÁRIO se compromete a efetuar o Reembolso em espécie ou, desde já, autoriza a EMPRESA a realizar o desconto em Folha de Pagamento do valor acima informado e seus acessórios.

`

    return titulo + inicio + parteEquipamentos + corpo
}