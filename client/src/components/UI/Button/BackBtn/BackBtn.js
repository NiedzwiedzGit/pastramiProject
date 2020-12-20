import React from 'react';
import { NavLink } from 'react-router-dom';
import ButtonBootstrap from 'react-bootstrap/Button';

import classes from './BackBtn.css';

const buttonBack = (props) => (
    <NavLink
        to={"/"}
        className={classes.BackBtn}
    // link="/o_nas"
    >
        <ButtonBootstrap variant="dark"> Back</ButtonBootstrap>
    </NavLink>
);
export default buttonBack;