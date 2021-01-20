import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const Button = styled.button`
    width: 10vw;
    height: 40px;
    color: #fff;
    margin-top: 40vh;
    border: 1px solid #165091;
    border-radius: 4px;
    background-color: white;
    outline: none;
    color: #165091;
    min-width: 80px;
    cursor: pointer;
`

export const ButtonSair = styled.button`
    color: #fff;
    margin-top: 10vh;
    border: 1px solid #165091;
    border-radius: 4px;
    background-color: transparent;
    outline: none;
    color: white;
    min-width: 80px;
    font-size: 0.9rem;
    cursor: pointer;
`

export const Container = styled(Grid)`
    height: 100%;
    width: 200px; 
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #165091;
    padding-top: 60px;
    color: white;
`

export const Titulo = styled(Grid)`
    color: white;
    font-size: 25px;
`

export const Rota = styled(Grid)`
    margin-top: 5px;
    text-decoration: none;
    color: white;
`

export const RotasContainer = styled(Grid)`
    margin-top: 5vh;
    text-align: center;
`
