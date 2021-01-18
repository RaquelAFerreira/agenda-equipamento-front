import React, { createContext, useState, useEffect } from 'react';

import api from '../services/api';


const UsuarioContext = createContext({});

function UsuarioProvider ({ children }) {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const loadData = () => {
      const user = localStorage.getItem("@CONTRACHEQUE:user")

      if (user) {
        setUser(JSON.parse(user))
      }
    }

    loadData();
  }, []);


  const signIn = async (login, senha) => {
    // console.warn('cheguei aqui')
    const response = await api.get('usuario');
    const user = response.data.find((usuario) => {
      return login === usuario.login && senha === usuario.senha
  })


    if (user !== undefined) {
      setUser(user)
      localStorage.setItem("@CONTRACHEQUE:user", JSON.stringify(user));
      //tenho que persistir em um storage / banco de dados embarcado

    } else {
      console.warn("Matricula inválida.")
    }

  }

  const signOut = () => {
    localStorage.removeItem("@CONTRACHEQUE:user");
    setUser(null)
  }

  return (
    <UsuarioContext.Provider value={{ user, signIn, signOut}}>
      {children}
    </UsuarioContext.Provider>
  )
}

export { UsuarioContext, UsuarioProvider }