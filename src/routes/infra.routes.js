import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Inicial from '../pages/Infra/Inicial';
import HistoricoSolicitacoes from '../pages/Infra/HistoricoSolicitacoes';
import Equipamentos from '../pages/Infra/Equipamentos';

export default function InfraRoutes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Inicial} />
                <Route exact path="/historico-solicitacoes" component={HistoricoSolicitacoes} />
                <Route exact path="/equipamentos" component={Equipamentos} />
            </Switch>
        </BrowserRouter>

    )
}