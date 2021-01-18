import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import {TableRow} from '@material-ui/core';
import {Modal} from '@material-ui/core';

export const ModalE = styled(Modal)`
display: flex;
align-items: center;
justify-content: center;
    
`

export const PaperModal = styled.div`
background-color: white;
padding: 50px;
box-shadow: 1px 1px 5px black;
outline: none;
`

export const Container = styled(Grid)`
    width: 70vw;
    height: 90vh;
    margin-left: 200px;
    align-items: center;
    justify-content: center;
    
`

export const TabelaRow = styled(TableRow)`
    &:nth-child(even) {
        background-color: rgba(22, 80, 145, 0.1)};
        &:hover {   
            background-color: gba(22, 80, 145, 0.3)
        }
    }

    &:nth-child(odd) {
        background-color: white};
        &:hover {
            background-color: rgba(22, 80, 145, 0.2);
        }
    }
`;

export const Row = styled(Grid)`
    margin-left: 12%;
`
export const Button = styled.button`
    width: 10vw;
    height: 35px;
    border: none;
    border-radius: 4px;
    background-color: rgba(22, 80, 145, 0.8);
    outline: none;
    color: white;
    min-width: 80px;
    font-size: 11px;
    margin-top: 3%;
    margin-bottom: 3%;
    cursor: pointer;
    
`


export const ButtonOutline = styled.button`
    width: 9vw;
    height: 30px;
    border: 1px solid #165091;
    border-radius: 4px;
    background-color: transparent;
    outline: none;
    color: #165091;
    font-size: 11px;
    margin-top: 10px;
    cursor: pointer;
`

export const ButtonAdd = styled.button`
    width: 5vw;
    height: 30px;
    border: none;
    border-radius: 4px;
    background-color: rgba(22, 80, 145, 0.8);
    outline: none;
    color: white;
    min-width: 80px;
    font-size: 11px;
    cursor: pointer;
    
`


export const ButtonCancel = styled.button`
    width: 5vw;
    height: 30px;
    border: 1px solid #165091;
    border-radius: 4px;
    background-color: transparent;
    outline: none;
    color: #165091;
    font-size: 11px;
    min-width: 80px;
    cursor: pointer;
    margin-left: 1vw;
`

export const TextoTh = styled.span`
    font-size: 1rem;
    font-weight: bold;

`;

export const TextoTr = styled.span`
    font-size: 0.9rem;
`;
