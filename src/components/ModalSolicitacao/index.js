import React, { useState, useEffect, useContext } from 'react';
import {TextField, Backdrop, Fade, MenuItem} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import api from '../../services/api';
import {ModalS, Paper, ButtonAdd, ButtonDelete, Button, ButtonOutline} from './styles'
import { UsuarioContext } from '../../contexts/user';
import Grid from '@material-ui/core/Grid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ModalSolicitacao({handleClose, open}){
    const [campos, setCampos] = useState([{ value: null }]);
    const [todosUsuarios, setTodosUsuarios] = useState([]);
    const [codigoSolicitacao, setCodigoSolicitacao] = useState('');
    const [solicitante, setSolicitante] = useState();
    const [listaEquipamentos, setListaEquipamentos] = useState([]);
    const [listaDiasReservados, setListaDiasReservados] = useState([]);
    const [equipamentoByCategoria, setEquipamentoByCategoria] = useState();
    const [situacao, setSituacao] = useState('');
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [horaLivre, setHoraLivre] = useState(true);
    const { user } = useContext(UsuarioContext);

    const alert = (mensagem, tipo) => {
        toast(
            mensagem,
            {type: tipo}
        );
    }

    const listaHorarios = [
        "09:00",
        "10:00",
        "11:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00"
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

    const handleAdicionaInput = () => {
        const quantidade = [...campos];
        quantidade.push({ value: null });
        setCampos(quantidade);
    }
  
    const handleRemoveInput = (i, equipamento) => {
        const quantidade = [...campos];
        quantidade.splice(i, 1);
        setCampos(quantidade);
        let name = equipamento;
        setListaEquipamentos(listaEquipamentos.filter((equipamento)=>(equipamento !== name)));
    }
    
    const handleSolicitacao = async (e) => {
        e.preventDefault();

        loadSolicitacaoByDataHora(data, hora);

        if(user.admin === false) {
            setSolicitante(user.idUsuario);
            setSituacao('ANALISE');
        } else {
            setSituacao('AGENDADA');
        }
        
        const params = { 
            solicitante: parseInt(solicitante),
            situacao: situacao,
            equipamentos: listaEquipamentos,
            data: data,
            hora: hora,
            codigoSolicitacao: codigoSolicitacao
        }
        console.log(params);
        
        if (solicitante !== parseInt(solicitante)){
            alert("Adicione um solicitante", "warning")
            return console.log(user);
        }
        if (horaLivre === false){
            alert("Esse horário já está marcado", "warning")
            return
        }
        if (listaEquipamentos.length === 0){
            alert("Adicione um equipamento", "warning")
            return 
        }

        try {
            await api.post('solicitacao', params);
            mapSetEquipamentoIndisponivel(listaEquipamentos);
        } catch {
            alert("Não foi possível efetuar a solicitação", "error");
        } finally {
            setSolicitante('');
            setData('');
            setHora('');
            setListaEquipamentos([]);
            handleClose();
        }
    }

    const loadDiasReservados = async () => {
        try{
            const response = await api.get('diaReservado');
            setListaDiasReservados(response.data);
        }catch(error){
            console.log(error);
        }
    }

    const setEquipamentoIndisponivel = (equipamento) => {
        api.put(`equipamento/setIndisponivel/${equipamento.idEquipamento}`)
        return Promise.resolve('ok')
    }
      
    const asyncSetEquipamentoIndisponivel = async (equipamento) => {
        return setEquipamentoIndisponivel(equipamento)
    }
      
    const mapSetEquipamentoIndisponivel = async (lista) => {
        return Promise.all(lista.map(equipamento=> asyncSetEquipamentoIndisponivel(equipamento)))
    }

    const verificaDiaReservado = (dataEscolhida) => {
        let isReservado = false;
        loadDiasReservados();

        listaDiasReservados.map(diaReservado => {
            if (diaReservado.data === dataEscolhida) {
                isReservado = true;
            } 
        })  
        return isReservado; 
    }

    const loadSolicitacaoByDataHora = async (dataEscolhida, horaEscolhida)  => {
        try {
            const response = await api.get(`solicitacao/dataHora/${dataEscolhida}/${horaEscolhida}`);
            setHoraLivre(false);
            if(response.data === ""){
                setHoraLivre(true);
            } else {
                alert("Esse horário já está marcado", "warning");
            }
        } catch {
            alert("Não foi possível verificar a hora solicitada", "error")
        }
    }

    const verificaData = (dataEscolhida) => {
        loadDiasReservados();
        if (dataEscolhida > getDataHoje() & verificaDiaReservado(dataEscolhida) === false) {
            setData(dataEscolhida);
        } else {
            alert("Não é possível fazer um agendamento nesta data", "warning");
            setData(''); 
        }
    }
    
    const getDataHoje = () => {
        return new Date().toISOString().slice(0, 10);
    }

    const loadUsuarios = async () => {
        try{
            const response = await api.get('usuario');
            setTodosUsuarios(response.data);
        }catch {
            alert("Erro ao carregar as informações", "error");
        }
    }

    const loadEquipamentoByCategoria = async (categoria) => {
        
        try{
            const response = await api.get(`equipamento/categoria/${formataParaEnum(categoria)}`);
            setListaEquipamentos(a => [...a, (response.data)]);
            setEquipamentoByCategoria(response.data);
        }catch(error){
            console.log(error);
            alert("Equipamento do tipo "+categoria+" em falta", "warning")
        }
    }

    const formataParaEnum = (item) => {
        const semEspacos = item.replace(" ","_");
        return semEspacos.toUpperCase();
    }

    useEffect(
        () => {
            loadUsuarios();
        }, []
    )

    return (
        <div>
            <ModalS
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
                    <Paper>
                        <Grid
                            direction="row"
                            container
                        >
                        <TextField
                            id="outlined-date"
                            label="Data"
                            type="date"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="outlined"
                            required
                            style={{ marginRight: 17, marginBottom: 15}}
                            value={data}
                            onChange={e => 
                                {verificaData(e.target.value)
                            }}
                         >
                        </TextField>

                        {/* <TextField
                            id="outlined-textarea"
                            label="Código da Solicitação"
                            placeholder="Placeholder"
                            required
                            multiline
                            style={{width: "190px", marginLeft: 17, marginBottom: 15}}
                            variant="outlined"
                            value={codigoSolicitacao}
                            onChange={e => 
                                {setCodigoSolicitacao(e.target.value)
                            }}
                         >
                        </TextField> */}
                        {user.admin &&
                            <Autocomplete
                                id="combo-box-demo"
                                required
                                onChange={(event, newValue) => {
                                    newValue !== null && setSolicitante(newValue.idUsuario)
                                }}
                                options={todosUsuarios}
                                getOptionLabel={(usuario) => usuario.login}
                                style={{ width: 300 }}
                                renderInput={(params) => 
                                    <TextField 
                                        variant="outlined" 
                                        required 
                                        style={{width: "280px", marginBottom: 15}} 
                                        {...params} 
                                        label="Solicitante"
                                        />
                                }
                            />
                        }
                        
                        <TextField
                            select
                            required
                            style={{width: "100px", marginBottom: 15}}
                            variant="outlined"
                            id="standard-select-currency-native"
                            label="Hora"
                            value={hora}
                            onChange={e => 
                                {setHora(e.target.value)
                            }}
                        >  
                            {
                                listaHorarios.map(horario => (
                                    <MenuItem key={horario} value={horario}>{horario}</MenuItem>
                                ))
                            }
                        </TextField>
                        </Grid>

                        {campos.map((campo, index) => {
                            return (
                            <div key={`${campo}-${index}`}>
                                <TextField
                                    id="outlined-textarea"
                                    style={{width: "150px", marginBottom: 15}}
                                    label="Equipamento"
                                    select
                                    placeholder="Placeholder"
                                    multiline
                                    variant="outlined"
                                    required
                                    onChange={e => 
                                        {loadEquipamentoByCategoria(e.target.value)}}
                                >{
                                    listaCategorias.map(categoria => (
                                        <MenuItem  
                                            key={categoria}
                                            value={categoria}
                                        >
                                            {categoria}
                                        </MenuItem>
                                    ))                                
                                }
                                </TextField>
                                <ButtonDelete 
                                    type="button" 
                                    onClick={() => handleRemoveInput(index, equipamentoByCategoria)}>
                                x
                                </ButtonDelete>
                            </div>
                            );
                        })}

                        <ButtonAdd
                            type="button" 
                            onClick={() => handleAdicionaInput()}
                        >
                            Adicionar equipamento
                        </ButtonAdd>
                        <Grid
                            container
                            direction="row"
                            style={{ alignItems: "center", justifyContent: "center"}}
                        >
                            <Button
                                onClick={e => handleSolicitacao(e)}
                            >
                                Adicionar
                            </Button>
                            <ButtonOutline
                                onClick={handleClose}
                            >
                                Cancelar
                            </ButtonOutline>
                        </Grid>
                    </Paper>
                </Fade>
            </ModalS>
            <ToastContainer/>
        </div>
    )
}