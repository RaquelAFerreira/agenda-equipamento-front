import React, { useState, useContext } from 'react';
import { Container, Input, Button } from './styles'
import { UsuarioContext } from '../../contexts/user';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../../assets/logo_branca.svg';

export default function LogIn() {

  const alert = (mensagem, tipo) => {
    toast(
        mensagem,
        {type: tipo}
    );
  }

  const { signIn } = useContext(UsuarioContext);
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = async () => {
    try {
      if (!senha || !login) {
        alert('Preencha com seus dados', 'warning')
      } else {
        await signIn(login, senha)
      }
    } catch {
      alert('Erro ao enviar os dados', 'warning');
    }
  }

  return (
    <Container>
      <div>
       <img alt="Logo da Alterdata" style={{height: "10vh", marginTop: "30vh" }} src={Logo}/>
       </div>
        <Input
            value={login}
            placeholder="Login"
            onChange={e => setLogin(e.target.value)}
        />
        <Input
            value={senha}
            placeholder="Senha"
            onChange={e => setSenha(e.target.value)}
            type="password"
        />
        <Button 
            onClick={
                () => handleSubmit()
            }
        >
          Logar
        </Button>
      <ToastContainer/>
    </Container>
  )
}