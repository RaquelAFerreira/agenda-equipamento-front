import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const Button = styled.button`
    width: 6vw;
    height: 30px;
    border: none;
    border-radius: 4px;
    background-color: #165091;
    outline: none;
    &+button {
        margin-left: 10%;
    }
    color: white;
    min-width: 80px;
    font-size: 11px;
    cursor: pointer;
    
`

export const ButtonOutline = styled.button`
    width: 6vw;
    height: 30px;
    border: 1px solid #165091;
    border-radius: 4px;
    background-color: transparent;
    outline: none;
    &+button {
        margin-left: 10%;
    }
    color: #165091;
    font-size: 11px;
    min-width: 80px;
    margin-top: 10px;
    cursor: pointer;
    
`

export const ButtonSolicitacao = styled.button`
    width: 10vw;
    height: 30px;
    border: 1px solid #165091;
    border-radius: 4px;
    background-color: transparent;
    outline: none;
    margin-left: 6.5%;
    color: #165091;
    font-size: 11px;
    min-width: 80px;
    margin-top: 25px;
    cursor: pointer;
    
`

export const Container = styled(Grid)`
    width: 80vw;
    height: 90vh;
    margin-left: 200px;
    align-items: center;
`

export const Row = styled(Grid)`
    padding-left: 15%;
    align-items: center;
    width: 100%;
    height: 100%;

`
export const InformacaoRow = styled(Grid)`
    text-align: left;
    margin-bottom: 10px;
    
`
export const Column = styled(Grid)`
    align-items: center;
    // background-color: blue;
    width: 40%;
    height: 78vh;
    &+div {
        margin-left: 10%;
    }

`

export const SolicitacaoContainer = styled(Grid)`
    align-items: center;
    border: 2px solid #165091;
    padding: 25px;
    margin-bottom: 15px;
    margin-top: 15px;
    align-block: center;
`
export const TituloSituacao = styled(Grid)`
    align-items: center;
    padding: 10px;
    border-bottom: 1.8px solid #165091;
    color: #165091;
    font-size: 25px;
`

export const SolicitacoesColumn = styled(Grid)`
    align-items: center;
    width: 100%;
    height: 100%;
    // border: 1px dotted black;
    overflow-y: scroll; 
    -ms-overflow-style: none;
    scrollbar-width: none; 
    &::-webkit-scrollbar {
        display: none;
    }
`