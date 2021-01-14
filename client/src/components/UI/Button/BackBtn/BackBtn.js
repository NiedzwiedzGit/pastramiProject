import React from 'react';
import { NavLink } from 'react-router-dom';
import ButtonBootstrap from 'react-bootstrap/Button';

import classes from './BackBtn.css';

const buttonBack = (props) => (
    <div className={classes.BackBtnBlock}>
        <NavLink
            to={"/"}
            className={classes.BackBtn}
        // link="/o_nas"
        >
            <ButtonBootstrap variant="dark"> </ButtonBootstrap>
        </NavLink>
    </div>
);
export default buttonBack;