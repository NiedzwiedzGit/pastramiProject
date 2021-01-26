import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.css';
import knifeRL from "../../../../assets/images/knifeRL.png";


const navigationItem = (props) => (
    <li className={classes.NavigationItem} style={props.style}>

        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}
        >
            {/* <img className={classes.knifeRLimg} src={knifeRL} alt='' /> */}

            {props.children}
        </NavLink>

    </li>
);
export default navigationItem;