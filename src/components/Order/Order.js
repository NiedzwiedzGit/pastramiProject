import React from 'react';
import classes from './Order.css';
import ButtonBootstrap from 'react-bootstrap/Button';
import TextareaAutosize from 'react-textarea-autosize';


const order = (props) => {

    return (
        <div className={classes.Order}>
            <span className={classes.UnderlineStyle}>{props.name}</span>
            <span>{props.price} /500g.</span>
            <span>{props.count}</span>
            <div className={classes.OrderBlockBtn}>
                {!props.disable ? <ButtonBootstrap variant="outline-danger" onClick={props.clickedMinus} disabled={props.disable}>-</ButtonBootstrap> : null}
                <ButtonBootstrap variant="outline-primary" onClick={props.clickedPlus}>+</ButtonBootstrap>
            </div>
            {
                props.auth ? <div className={classes.ImagesBlockBtnSwipe}>
                    <ButtonBootstrap variant="outline-danger" onClick={props.clicked}>Remove</ButtonBootstrap>
                    <ButtonBootstrap variant="outline-primary" onClick={props.clickedUpdate}>Update</ButtonBootstrap>
                </div > : null
            }
        </div >
    );

};

export default order;