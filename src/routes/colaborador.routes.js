import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Colaborador from '../pages/Colaborador';
import NotFound from '../pages/NotFound';

export default function ColaboradorRoutes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Colaborador} />
                <Route exact path="*/" component={NotFound} />
            </Switch>
        </BrowserRouter>

    )
}