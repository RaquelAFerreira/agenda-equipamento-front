import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import Menu  from '../../../components/Menu';
import { Link } from 'react-router-dom';
import { Button, 
    SolicitacoesColumn, 
    Row, 
    SolicitacaoContainer, 
    TituloSituacao, 
    Column, 
    InformacaoRow, 
    Container, 
    ButtonSolicitacao,
    ButtonOutline} from './styles';


export default function Inicial() {

    const [listaAnalise, setListaAnalise] = useState([]);
    const [listaAgendada, setListaAgendada] = useState([]);

    const loadSolicitacoesBySituacao = async(situacao) => {
        try{
            const response = await api.get(`solicitacao/situacao/${situacao}`); 
            if(situacao === "ANALISE"){
                setListaAnalise(response.data)
            };

            if(situacao === "AGENDADA"){
                setListaAgendada(response.data)
            };

        } catch(error) {
            console.log(error)
        }
    }   

    const setEquipamentoDisponivel = (equipamento) => {
        api.put(`equipamento/setDisponivel/${equipamento.idEquipamento}`)
    return Promise.resolve('ok')
    }
      
    const asyncSetEquipamentoDisponivel = async (equipamento) => {
        return setEquipamentoDisponivel(equipamento)
    }
      
    const mapSetEquipamentoDisponivel = async (lista) => {
        return Promise.all(lista.map(equipamento=> asyncSetEquipamentoDisponivel(equipamento)))
    }

    useEffect(
        () => {
            loadSolicitacoesBySituacao("ANALISE"); 
            loadSolicitacoesBySituacao("AGENDADA")
        }, []
    )

    const setSituacao = async (situacao, solicitacao) => {

            const params = {
                situacao: situacao
            }
            try{
                await api.put(`solicitacao/${solicitacao}`, params);
            } catch(error){
                console.log(error);
            } finally {
                loadSolicitacoesBySituacao("ANALISE");
                loadSolicitacoesBySituacao("AGENDADA");
            }
            
        }

    const formataDeEnum = (string) => {
        return string.replace(/\S*/g,  (word) => {
            return word.charAt(0) + word.slice(1).toLowerCase();
        });
    }

    const listaMenu = [
        {
            nome: "Equipamentos",
            rota: "/equipamentos"
        },
        {
            nome: "Histórico de Solicitações",
            rota: "/historico-solicitacoes"
        }
    ]

    const dataFormatada = (item) => {
        var data = new Date(item),
            dia  = data.getDate().toString(),
            diaF = (dia.length === 1) ? '0'+dia : dia,
            mes  = (data.getMonth()+1).toString(), 
            mesF = (mes.length === 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return diaF+"/"+mesF+"/"+anoF;
    }

    return (
        <Container>      
            <Menu listaMenu={listaMenu} pagina={"Início"}/>               
            <Row 
                direction="row"
                container
            >
            <Column>
            <TituloSituacao> Em Análise </TituloSituacao>
            <SolicitacoesColumn>
                {listaAnalise.map((solicitacao) => (
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
                        variant="contained" color="primary"
                            onClick={() => {
                            setSituacao("AGENDADA", solicitacao.idSolicitacao);
                            }}
                        >
                            AGENDAR
                        </Button>

                        <ButtonOutline
                            onClick={() => {
                            setSituacao("RECUSADA", solicitacao.idSolicitacao);
                            mapSetEquipamentoDisponivel(solicitacao.equipamentos);
                            }}
                        >
                            RECUSAR
                        </ButtonOutline>
                    </SolicitacaoContainer>
                ))
                }
            </SolicitacoesColumn>
            </Column>

            <Column>
            <TituloSituacao> Agendada </TituloSituacao>
            <SolicitacoesColumn>
                {listaAgendada.map((solicitacao) => (
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
                        variant="contained" color="primary"
                            onClick={() => {
                            setSituacao("CONCLUIDA", solicitacao.idSolicitacao);
                            }}
                        >   
                            CONCLUIR
                        </Button>

                        <ButtonOutline
                            onClick={() => {
                            setSituacao("INCONCLUSA", solicitacao.idSolicitacao);
                            mapSetEquipamentoDisponivel(solicitacao.equipamentos);
                            }}
                        >
                            DESCARTAR
                        </ButtonOutline>
                    </SolicitacaoContainer>
                ))
                }
            </SolicitacoesColumn>
            </Column>
            </Row>

            <Link to="/historico-solicitacoes">
                <ButtonSolicitacao>
                    Histórico de Solicitações
                </ButtonSolicitacao>
            </Link> 

        </Container>
    )
}