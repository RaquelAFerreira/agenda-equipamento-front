import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Inicial from '../pages/Infra/Inicial';
import HistoricoSolicitacoes from '../pages/Infra/HistoricoSolicitacoes';
import Equipamentos from '../pages/Infra/Equipamentos';
import NotFound from '../pages/NotFound';

export default function InfraRoutes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Inicial} />
                <Route exact path="/historico-solicitacoes" component={HistoricoSolicitacoes} />
                <Route exact path="/equipamentos" component={Equipamentos} />
                <Route exact path="*/" component={NotFound} />

            </Switch>
        </BrowserRouter>

    )
}