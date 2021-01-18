import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Colaborador from '../pages/Colaborador';

export default function ColaboradorRoutes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Colaborador} />
            </Switch>
        </BrowserRouter>

    )
}