import React, { useState, useEffect, useCallback } from 'react';
import { Button, SolicitacoesColumn, Row, SolicitacaoContainer, TituloSituacao, Column, InformacaoRow, Container, ButtonOutline} from './styles';
import api from '../../../services/api';
import Menu from '../../../components/Menu'

export default function HistoricoSolicitacoes() {
    
    const [listaRecusada, setListaRecusada] = useState([]);
    const [listaInconclusa, setListaInconclusa] = useState([]);
    const [listaConcluida, setListaConcluida] = useState([]);
        
    const listaMenu = [
        {
            nome: "Inicio",
            rota: "/"
        },
        {
            nome: "Equipamentos",
            rota: "/equipamentos"
        }
    ]

    const loadSolicitacoesBySituacao = async(situacao) => {
        try{
            const response = await api.get(`solicitacao/situacao/${situacao}`); 
            if(situacao === "RECUSADA"){
                setListaRecusada(response.data)
            };

            if(situacao === "INCONCLUSA"){
                setListaInconclusa(response.data)
            };

            if(situacao === "CONCLUIDA"){
                setListaConcluida(response.data)
            };

        } catch(error) {
            console.log(error)
        }
    } 

    const formataDeEnum = (string) => {
        return string.replace(/\S*/g,  (word) => {
            return word.charAt(0) + word.slice(1).toLowerCase();
        });
    }

    const dataFormatada = (item) => {
        var data = new Date(item),
            dia  = data.getDate().toString(),
            diaF = (dia.length === 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length === 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return diaF+"/"+mesF+"/"+anoF;
    }

    const criadorPDF = (solicitacao) => {
        const doc = new jsPDF();
        doc.setFontSize(10);
        var splitTitle = doc.splitTextToSize(geraTermoResponsabilidade(solicitacao.solicitante.nome, 
                                                    solicitacao.solicitante.login, 
                                                    solicitacao.solicitante.cpf,
                                                    solicitacao.equipamentos
                                                    ), 180);
        doc.text(15, 20, splitTitle);
        doc.save(`agendamento de ${solicitacao.solicitante.login}-${solicitacao.data}.pdf`);
    }

    useEffect(
        () => {
            loadSolicitacoesBySituacao("RECUSADA"); 
            loadSolicitacoesBySituacao("INCONCLUSA");
            loadSolicitacoesBySituacao("CONCLUIDA");
        }, []
    )

    return(
        <Container>
            <Menu listaMenu={listaMenu} pagina={"Solicitações"}/>   
            <Row 
                direction="row"
                container
            >
                <Column>
                    <TituloSituacao> Concluída </TituloSituacao>
                    <SolicitacoesColumn>
                        {listaConcluida.map((solicitacao) => (
                            <SolicitacaoContainer key={solicitacao.idSolicitacao}>
                                <InformacaoRow>
                                    Código da Solicitação: {solicitacao.codigoSolicitacao} 
                                </InformacaoRow>
                                <InformacaoRow>
                                    Solicitante: {solicitacao.solicitante.login} 
                                </InformacaoRow>
                                <InformacaoRow>
                                    Data: {dataFormatada(solicitacao.data)}, {solicitacao.hora}
                                </InformacaoRow>
                                <InformacaoRow>
                                    Equipamentos: 
                                </InformacaoRow>
                                {solicitacao.equipamentos.map((equipamento) =>
                                    <InformacaoRow>
                                        {formataDeEnum(equipamento.categoria)} - {equipamento.codigoEquipamento}
                                    </InformacaoRow>   
                                )} 
                                <Button
                                    onClick={() => criadorPDF(solicitacao)}
                                >
                                    Baixar Termo
                                </Button> 
                            </SolicitacaoContainer>
                        ))
                        }
                    </SolicitacoesColumn>
                </Column>

                <Column>
                    <TituloSituacao> Recusada </TituloSituacao>
                    <SolicitacoesColumn>
                        {listaRecusada.map((solicitacao) => (
                            <SolicitacaoContainer key={solicitacao.idSolicitacao}>
                                <InformacaoRow>
                                    Código da Solicitação: {solicitacao.codigoSolicitacao} 
                                </InformacaoRow>
                                <InformacaoRow>
                                    Solicitante: {solicitacao.solicitante.login} 
                                </InformacaoRow>
                                <InformacaoRow>
                                    Data: {dataFormatada(solicitacao.data)}, {solicitacao.hora}
                                </InformacaoRow>
                                <InformacaoRow>
                                    Equipamentos: 
                                </InformacaoRow>
                                {solicitacao.equipamentos.map((equipamento) =>
                                    <InformacaoRow>
                                        {formataDeEnum(equipamento.categoria)} - {equipamento.codigoEquipamento}
                                    </InformacaoRow>   
                                )} 
                            </SolicitacaoContainer>
                        ))
                        }
                    </SolicitacoesColumn>
                </Column>
                <Column>
                    <TituloSituacao> Inconclusa </TituloSituacao>
                    <SolicitacoesColumn>
                        {listaInconclusa.map((solicitacao) => (
                            <SolicitacaoContainer key={solicitacao.idSolicitacao}>
                                <InformacaoRow>
                                    Código da Solicitação: {solicitacao.codigoSolicitacao} 
                                </InformacaoRow>
                                <InformacaoRow>
                                    Solicitante: {solicitacao.solicitante.login} 
                                </InformacaoRow>
                                <InformacaoRow>
                                    Data: {dataFormatada(solicitacao.data)}, {solicitacao.hora}
                                </InformacaoRow>
                                <InformacaoRow>
                                    Equipamentos: 
                                </InformacaoRow>
                                {solicitacao.equipamentos.map((equipamento) =>
                                    <InformacaoRow>
                                        {formataDeEnum(equipamento.categoria)} - {equipamento.codigoEquipamento}
                                    </InformacaoRow>   
                                )} 
                            </SolicitacaoContainer>
                        ))
                        }
                    </SolicitacoesColumn>
                </Column>
            </Row>
        </Container>
    )

}