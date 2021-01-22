import React, { useState, useContext, useEffect } from 'react';
import { UsuarioContext } from '../../contexts/user';
import api from '../../services/api';
import Logo from '../../assets/logo_branca.svg';
import Banner from '../../assets/equipamentos.png';
import ModalSolicitacao from '../../components/ModalSolicitacao';
import {BannerContainer, 
        Button,
        Header, 
        SolicitacoesColumn, 
        Row, 
        SolicitacaoContainer, 
        TituloSituacao, 
        Column, 
        InformacaoRow, 
        Container, 
        ButtonOutline
} from './styles';



export default function Colaborador() {
    const [open, setOpen] = useState(false);
    const [listaSolicitacoes, setListaSolicitacoes] = useState([]);
    const { user, signOut } = useContext(UsuarioContext);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const loadSolicitacoes = async() => {
        try{
            const response = await api.get(`solicitacao/solicitante/${user.idUsuario}`); 
            setListaSolicitacoes(response.data);
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
            mes  = (data.getMonth()+1).toString(),
            mesF = (mes.length === 1) ? '0'+mes : mes,
            anoF = data.getFullYear();
        return diaF+"/"+mesF+"/"+anoF;
    }

    useEffect(
        () => {
            loadSolicitacoes();
        }, []
    )

    return(
        <Container>
            <Header
                direction="row"
                container
            >
                <img alt="Logo da Alterdata" style={{width: "22vw"}} src={Logo}/>
                <ButtonOutline onClick={()=> signOut()}>
                    SAIR
                </ButtonOutline>
            </Header>
            
            <Row
                direction="row"
                container
            >
                <BannerContainer>
                    <img alt="Banner de solicitação" style={{height: "62vh" }} src={Banner}/>
                </BannerContainer>
                <Column>
                    <TituloSituacao> Suas Solicitações </TituloSituacao>
                    <SolicitacoesColumn>
                        {listaSolicitacoes.map((solicitacao) => (
                            <SolicitacaoContainer key={solicitacao.idSolicitacao}>
                                {/* <InformacaoRow>
                                    Código da Solicitação: {solicitacao.codigoSolicitacao} 
                                </InformacaoRow> */}
                                <InformacaoRow>
                                    Situação: {solicitacao.situacao} 
                                </InformacaoRow>
                                <InformacaoRow>
                                    Data: {dataFormatada(solicitacao.data)}, {solicitacao.hora}
                                </InformacaoRow>
                                <InformacaoRow>
                                    Equipamentos: 
                                </InformacaoRow>
                                {solicitacao.equipamentos.map((equipamento) =>
                                    <InformacaoRow key={equipamento.idEquipamento}>
                                        {formataDeEnum(equipamento.categoria)}
                                    </InformacaoRow>   
                                )} 

                            </SolicitacaoContainer>
                        ))
                        }
                    </SolicitacoesColumn>
                </Column>
            </Row>
            <Button onClick={handleOpen}>
                            NOVO AGENDAMENTO
            </Button>
            <ModalSolicitacao handleClose={handleClose} open={open} />
        </Container>
    )
}