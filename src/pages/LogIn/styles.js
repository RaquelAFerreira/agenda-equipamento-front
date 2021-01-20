import Styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const Container = Styled(Grid)`
  background-color: #457b9d; 
  width: 100%;
  height: 100vh;
  vertical-align: middle;

`

export const Button = Styled.button`
    margin-left: 1vw;
    width: 5vw;
    height: 35px;
    border: none;
    border-radius: 4px;
    background-color: rgba(22, 80, 145, 0.4);
    outline: none;
    color: white;
    min-width: 80px;
    font-size: 11px;
    cursor: pointer;
`



export const Input = Styled.input`
    width: 15vw;
    height: 3vh;
    &+input {
      margin-left: 1vw;
    }
    margin-top: 5vh;
    border-radius: 3px;
    outline: none;
    border: 1px solid white;
    padding: 5px;  
  `