import React, { useState, useContext } from 'react';
import { Container, Input, Button } from './styles'
import { UsuarioContext } from '../../contexts/user';

export default function LogIn() {

  const { signIn } = useContext(UsuarioContext);
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async () => {
    try {
      await signIn(login, senha)
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <Container>
        <Input
            value={login}
            placeholder="Login"
            onChange={e => setLogin(e.target.value)}
        />
        <Input
            value={senha}
            placeholder="Senha"
            onChange={e => setSenha(e.target.value)}
        />
        <Button 
            onClick={
                () => handleSubmit()
            } 
            disabled={!senha || !login}
        >
          Logar
        </Button>
    </Container>
  )
}