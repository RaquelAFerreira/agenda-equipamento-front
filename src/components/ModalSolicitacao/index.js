import React, { useState, useEffect, useContext } from 'react';
import {TextField, Backdrop, Fade, MenuItem} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import api from '../../services/api';
import {ModalS, Paper, Button, ButtonOutline} from './styles'
import { UsuarioContext } from '../../contexts/user';
import Grid from '@material-ui/core/Grid';
import { ToastContainer, toast } from 'react-toastify';

export default function ModalSolicitacao({handleClose, open}){
    const [todosUsuarios, setTodosUsuarios] = useState([]);
    const [solicitante, setSolicitante] = useState();
    const [listaEquipamentos, setListaEquipamentos] = useState([]);
    const [listaEquipamentosDisponiveis, setListaEquipamentosDisponiveis] = useState([]);
    const [listaDiasReservados, setListaDiasReservados] = useState([]);
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

    const loadSituacao = () => {
         if(user.admin === false) {
            return 'ANALISE';
        }
        return 'AGENDADA';
    }

    const loadSolicitante = () => {
        if(user.admin === false) {
           setSolicitante(user.idUsuario);
       }
   }

    const loadEquipamentos = async () => {
        const response = await api.get(`equipamento/disponiveis`)

            setListaEquipamentosDisponiveis(response.data);
    }
    
    const handleSolicitacao = async (e) => {
        e.preventDefault();

        loadSolicitacaoByDataHora(data, hora);

        loadSolicitante();
        
        const params = { 
            solicitante: solicitante,
            situacao: loadSituacao(),
            equipamentos: listaEquipamentos,
            data: data,
            hora: hora
        }
        console.log(params);
        
        if (solicitante === null || solicitante === ""){
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
            loadEquipamentos();
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

    const verificaData = (dataEscolhida) => {
        loadDiasReservados();
        if (dataEscolhida < getDataHoje()) {
            alert("Não é possível fazer um agendamento para hoje ou dias anteriores ao atual", "warning");
            setData('');
        } else if (verificaDiaReservado(dataEscolhida)) {
            alert("O dia escolhido é um feriado ou dia reservado. Por favor, escolha outro", "warning");
            setData('');
        } else {
            setData(dataEscolhida);
        }
    }
    
    const formataDeEnum = (string) => {
        return string.replace(/\S*/g,  (word) => {
            return word.charAt(0) + word.slice(1).toLowerCase();
        });
    }

    useEffect(
        () => {
            loadUsuarios();
        }, []
    )

    useEffect(
        () => {
            loadEquipamentos();
        }, []
    )

    useEffect(
        () => {
            loadSolicitante();
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

                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            options={listaEquipamentosDisponiveis}
                            getOptionLabel={(option) => formataDeEnum(option.categoria)}
                            filterSelectedOptions
                            style={{lineBreak: "auto", width: "40vw"}}
                            onChange={(event, value) => setListaEquipamentos(value)}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Equipamentos"
                            />
                            )}
                        />       

                        <Grid
                            container
                            direction="row"
                            style={{ alignItems: "center", justifyContent: "center"}}
                        >
                            <Button
                                onClick={e => handleSolicitacao(e)}
                            >
                                Solicitar
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