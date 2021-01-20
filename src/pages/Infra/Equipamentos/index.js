import React, {useState, useEffect} from 'react';
import {TextField, Backdrop, Fade, MenuItem} from '@material-ui/core';
import {ModalE, PaperModal} from './styles';
import Menu from '../../../components/Menu';
import api from '../../../services/api';
import Grid from '@material-ui/core/Grid';
import {TableBody, 
        Table, 
        TableContainer, 
        Paper, 
        TableCell
} from '@material-ui/core';
import {TextoTr,
        TextoTh,
        Container, 
        Row, 
        Button, 
        TabelaRow, 
        ButtonOutline, 
        ButtonAdd, 
        ButtonCancel
} from './styles'; 


export default function Equipamentos() {

    const [listaEquipamentos, setListaEquipamentos] = useState([])
    const [codigoEquipamento, setCodigoEquipamento] = useState('');
    const [categoria, setCategoria] = useState('');
    const [descricao, setDescricao] = useState('');
    const [open, setOpen] = useState(false);
    
    const listaMenu = [
        {
            nome: "Inicio",
            rota: "/"
        },
        {
            nome: "Histórico de Solicitações",
            rota: "/historico-solicitacoes"
        }
    ]

    const listaCategorias = [
        'Monitor',
        'Cadeira',
        'Teclado',
        'Mouse',
        'Desktop',
        'Laptop',
        'Adaptador Hdmi',
        'Cabo Displayport',
        'Mesa'
    ]

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const loadEquipamentos = async () => {
        try{
            const response = await api.get(`equipamento`); 
            setListaEquipamentos(response.data);
        } catch(error) {
            console.log(error)
        }
    }   

    const handleEquipamento = async (e) => {
        e.preventDefault();
        
        const params = { 
            codigoEquipamento: codigoEquipamento,
            categoria: formataParaEnum(categoria),
            descricao: descricao,
            disponivel: true
        }

        try {
            await api.post('equipamento', params);
        } catch (error) {
            alert("Não foi possível cadastrar o equipamento");
        } finally{
            setCategoria('');
            setCodigoEquipamento('');
            setDescricao('');
            loadEquipamentos();
            handleClose();
        }
    }

    const setDisponibilidade = async (equipamento) => {

        const params = {
            disponivel: !equipamento.disponivel
        }
        try{
            await api.put(`equipamento/${equipamento.idEquipamento}`, params);
        } catch(error){
            console.log(error);
        } finally {
            loadEquipamentos();
        }
        
    }

    const formataDeEnum = (string) => {
        return string.replace(/\S*/g,  (word) => {
            return word.charAt(0) + word.slice(1).toLowerCase();
        });
    }

    const formataParaEnum = (item) => {
        const semEspacos = item.replace(" ","_");
        return semEspacos.toUpperCase();
    }
    
    useEffect(
        () => {
            loadEquipamentos();
        }, []
    )

    return (
        <Container>
            <Menu listaMenu={listaMenu} pagina={"Equipamentos"}/>
            <Row
                container
                direction="row"
            >
            <Button 
                onClick={() => 
                    handleOpen()
                }
            >
                Adicionar
            </Button>
            <TableContainer component={Paper} >
                <Table  aria-label="Tabela Equipamentos">
                <thead>
                    <tr>
                    <TableCell align="center"><TextoTh>Código do Equipamento</TextoTh></TableCell>
                    <TableCell align="center"><TextoTh>Categoria</TextoTh></TableCell>
                    <TableCell align="center"><TextoTh>Descrição</TextoTh></TableCell>
                    <TableCell align="center"><TextoTh>Disponível</TextoTh></TableCell>
                    </tr>
                    </thead>
                <TableBody>
                    {listaEquipamentos.map((equipamento) => (
                    <TabelaRow key={equipamento.idEquipamento}>
                        <TableCell component="th" scope="equipamento" align="center"><TextoTr>{equipamento.codigoEquipamento}</TextoTr></TableCell>
                        <TableCell align="center"><TextoTr>{formataDeEnum(equipamento.categoria)}</TextoTr></TableCell>
                        <TableCell align="center" ><TextoTr>{equipamento.descricao}</TextoTr></TableCell>
                        <TableCell align="center" >
                        {equipamento.disponivel === true ?
                            <TextoTr>Sim</TextoTr>
                            :
                            <TextoTr>Não</TextoTr>
                        }
                            </TableCell>
                        <TableCell align="center" ><ButtonOutline onClick={() => {setDisponibilidade(equipamento)}} >Mudar disponibilidade</ButtonOutline></TableCell>

                    </TabelaRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            </Row>

            <ModalE
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <PaperModal>
                        <TextField
                            id="outlined-textarea"
                            label="Código do Equipamento"
                            placeholder="Código"
                            multiline
                            variant="outlined"
                            value={codigoEquipamento}
                            onChange={e => 
                                {setCodigoEquipamento(e.target.value)
                            }}
                         >
                        </TextField>

                        <TextField
                            id="outlined-textarea"
                            label="Descrição"
                            placeholder="Descrição"
                            style={{ marginLeft: 10}}
                            multiline
                            variant="outlined"
                            value={descricao}
                            onChange={e => 
                                {setDescricao(e.target.value)
                            }}
                         >
                        </TextField>

                        <TextField
                            select
                            variant="outlined"
                            id="standard-select-currency-native"
                            label="Categoria"
                            style={{width: '10vw', marginLeft: 10}}
                            value={categoria}
                            onChange={e => 
                                {setCategoria(e.target.value)
                            }}
                        >  
                            {
                                listaCategorias.map(categoria => (
                                    <MenuItem key={categoria} value={categoria}>{categoria}</MenuItem>
                                ))
                            }
                        </TextField>
                        <Grid
                            container
                            direction="row"
                            style={{marginTop: 20, justifyContent: "center"}}
                        >
                            <ButtonAdd
                                onClick={e => handleEquipamento(e)}
                            >
                                Adicionar
                            </ButtonAdd>
                            <ButtonCancel
                                onClick={handleClose}
                            >
                                Cancelar
                            </ButtonCancel>
                        </Grid>
                    </PaperModal>
                </Fade>
            </ModalE>
        </Container>
      )

}