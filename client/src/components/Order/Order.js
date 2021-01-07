import React from 'react';
// import classes from './Order.css';
import classes from './Order.css';
import ButtonBootstrap from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { Element } from 'react-scroll'


const order = (props) => {

    return (
        <div className={classes.Order} name={`orderBlock${props.idCount}`} id={`orderBlock${props.idCount}`}>
            <div>
                <span className={classes.UnderlineStyle} >{props.name}</span>
                <span className={!props.disable ? classes.CountVisible : classes.CountUnVisible} >{props.count}</span>
                < div className={classes.OrderBlockBtn} >
                    <ButtonBootstrap className={!props.disable ? classes.BlockBtnMinusVisible : classes.BlockBtnMinusUnVisible} variant="outline-danger" onClick={props.clickedMinus} disabled={props.disable}>-</ButtonBootstrap>
                    <ButtonBootstrap variant="outline-primary" onClick={props.clickedPlus}>+</ButtonBootstrap>

                </div >
                {
                    props.auth ? <div className={classes.ImagesBlockBtnSwipe}>
                        <ButtonBootstrap variant="outline-danger" onClick={props.clicked}>Remove</ButtonBootstrap>
                        <ButtonBootstrap variant="outline-primary" onClick={props.clickedUpdate}>Update</ButtonBootstrap>
                    </div > : null
                }
            </div>
            <div className={classes.Price}>
                {/* <span className={classes.Price}>{props.price}_500g.</span> */}
            </div>
        </div >
    );

};

export default order;