import {Modal} from '@material-ui/core';
import styled from 'styled-components';

export const ModalS = styled(Modal)`
display: flex;
align-items: center;
justify-content: center;
    
`

export const Paper = styled.div`
background-color: white;
padding: 50px;
box-shadow: 1px 1px 5px black;
outline: none;
    
`
export const ButtonDelete = styled.button`
    background-color: white;
    outline: none;
    border-radius: 100px;
    border: none;
    cursor: pointer;

`

export const ButtonAdd = styled.button`
    outline: none;
    width: 6vw;
    height: 30px;
    border: none;
    background-color: transparent;
    outline: none;
    color: grey;
    font-size: 11px;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid grey;
    
`
export const Button = styled.button`
    width: 6vw;
    height: 30px;
    border: none;
    border-radius: 4px;
    background-color: #165091;
    outline: none;
    color: white;
    min-width: 80px;
    font-size: 11px;
    margin-top: 5%;
    cursor: pointer;
    
`

export const ButtonOutline = styled.button`
    width: 6vw;
    height: 30px;
    border: none;
    border-radius: 4px;
    background-color: transparent;
    outline: none;
    color: #165091;
    font-size: 11px;
    cursor: pointer;
    border: 1px solid #165091;
    margin-top: 5%;
    margin-left: 5%;

    
`