
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button, Titulo, Rota, ButtonSair, RotasContainer} from './styles';
import ModalSolicitacao from '../ModalSolicitacao';
import { UsuarioContext } from '../../contexts/user';

export default function Menu({listaMenu, pagina}) {

    const [open, setOpen] = useState(false);
    const { signOut } = useContext(UsuarioContext);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
        
    return (
        <Container>
            <Titulo>
                {pagina}
            </Titulo>

            <RotasContainer>
                
                {listaMenu.map(item => (
                    
                        <Link style={{textDecoration: "none"}} to={item.rota}><Rota>   
                            {item.nome} </Rota>
                        </Link>
                   
                    )
                ) } 
                
            </RotasContainer>

                <Button onClick={handleOpen}>
                            Novo agendamento
                </Button>

                <ButtonSair onClick={() => {signOut()}}>
                            Sair
                </ButtonSair>
            <ModalSolicitacao handleClose={handleClose} open={open} />
        </Container>
    )
}