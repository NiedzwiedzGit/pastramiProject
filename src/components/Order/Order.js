import React from 'react';
import classes from './Order.css';
import ButtonBootstrap from 'react-bootstrap/Button';
import TextareaAutosize from 'react-textarea-autosize';


const order = (props) => {

    return (
        <div className={classes.Order}>
            <span>{props.name}</span><span>{props.price}</span><span>{props.count}</span>
            {!props.disable ? <ButtonBootstrap variant="outline-danger" onClick={props.clickedMinus} disabled={props.disable}>-</ButtonBootstrap> : null}
            <ButtonBootstrap variant="outline-primary" onClick={props.clickedPlus}>+</ButtonBootstrap>
        </div >
    );

};

export default order;