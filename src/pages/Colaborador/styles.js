import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const Button = styled.button`
    width: 10vw;
    height: 35px;
    border: none;
    border-radius: 4px;
    background-color: #165091;
    outline: none;
    color: white;
    min-width: 80px;
    font-size: 11px;
    margin-top: 3%;
    cursor: pointer;
    
`

export const ButtonOutline = styled.button`
    width: 6vw;
    height: 30px;
    border: none;
    background-color: transparent;
    outline: none;
    color: white;
    font-size: 11px;
    cursor: pointer;
    margin-left: 27%;
    margin-right: 5%;
    
`

export const Container = styled(Grid)`


`

export const Row = styled(Grid)`
    width: 100%;
    height: 100%;
    justify-content: space-around;
    display: flex;
    margin-top: 2%;

`
export const InformacaoRow = styled(Grid)`
    text-align: left;
    margin-bottom: 10px;
    
`
export const Column = styled(Grid)`
    align-items: center;
    // background-color: blue;
    width: 20%;
    height: 58vh;
`

export const BannerContainer = styled(Grid)`
    margin-top: 1%;

`

export const Header = styled(Grid)`
    width: 100%;
    background-color: #165091;
    align-items: center;
    vertical-align: middle;
    justify-content: flex-end;

`

export const SolicitacaoContainer = styled(Grid)`
    align-items: center;
    border: 2px solid #165091;
    padding: 20px;
    margin-top: 15px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;
    align-block: center;
`
export const TituloSituacao = styled(Grid)`
    align-items: center;
    padding: 10px;
    border-bottom: 1.8px solid #165091;
    color: #165091;
    font-size: 22px;
`

export const SolicitacoesColumn = styled(Grid)`
    align-items: center;
    width: 100%;
    height: 100%;
    overflow-y: scroll; 
    -ms-overflow-style: none;
    scrollbar-width: none; 
    &::-webkit-scrollbar {
        display: none;
    }
`