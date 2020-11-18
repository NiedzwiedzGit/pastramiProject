import React from 'react';
// import burgerLogo from '../../assets/images/burger-logo.png';
import cichocka from '../../assets/images/cichocka.png';
import classes from './Logo.css'
const logo = (props) => (
    <div className={classes.Logo} style={{ height: props.height }}>
        <img src={cichocka} alt="cichocka" />
    </div>
);
export default logo;
