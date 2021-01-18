// import React from 'react';
// import { Switch, Route, BrowserRouter } from 'react-router-dom';
// import Inicial from '../pages/Infra/Inicial';
// import HistoricoSolicitacoes from '../pages/Infra/HistoricoSolicitacoes';
// import { InformacaoRow } from '../pages/Infra/Inicial/styles';

// export default function Routes() {
//     return (
//         <BrowserRouter>
//             <Switch>
//                 <Route exact path="/infra" component={Inicial} />
//                 <Route exact path="/historico-solicitacoes" component={HistoricoSolicitacoes} />
//             </Switch>
//         </BrowserRouter>

//     )
// }

import React, { useContext } from 'react';
import InfraRoutes from './infra.routes';
import ColaboradorRoutes from './colaborador.routes';
import AuthRoutes from './auth.routes';

import { UsuarioContext } from '../contexts/user';

export default function Routes() {

  const { user } = useContext(UsuarioContext);

  return (
    <div>
      {
        user ? 
          user.admin ? 
                <InfraRoutes/> :
                <ColaboradorRoutes/>
          :
          <AuthRoutes />
      }
    </div>

  )
};
