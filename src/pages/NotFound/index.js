import React from 'react';
import { FiAlertCircle } from "react-icons/fi";
import { Grid } from '@material-ui/core';
// import ButtonAppBar from '../../Components/Navbar';

export default function PageNotFound() {
    return (
        <div>
            <Grid container direction="column" justify="center" alignItems="center" style={{marginTop:"15%", position:"fixed"}} spacing={2}>
            <Grid item>
            <FiAlertCircle style={{ fontSize: 200, color: "#165091" }}/>
            </Grid>
            <h2 style={{ color: "#165091" }} >404 ERROR</h2> 
        </Grid>
        </div>
    )
}

