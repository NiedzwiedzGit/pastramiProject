import React from 'react';
// import classes from './Order.css';
import classes from './Order.css';
import ButtonBootstrap from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { Element } from 'react-scroll'


const order = (props) => {
    console.log('props.count ', props.count);
    return (
        <div className={classes.Order} name={`orderBlock${props.idCount}`} id={`orderBlock${props.idCount}`}>
            <div >
                <div className={classes.NameBlock}>
                    <span className={classes.UnderlineStyle} >{props.name}</span>
                    <span className={!props.disable ? classes.CountVisible : classes.CountUnVisible} >x {props.count}</span>
                </div>
                {/* < div className={classes.OrderBlockBtn} >
                    <ButtonBootstrap className={!props.disable ? classes.BlockBtnMinusVisible : classes.BlockBtnMinusUnVisible} variant="outline-danger" onClick={props.clickedMinus} disabled={props.disable}>-</ButtonBootstrap>
                    <ButtonBootstrap variant="outline-primary" onClick={props.clickedPlus}>+</ButtonBootstrap>

                </div > */}

                < div className={!props.activeClass ? classes.OrderBlockBtn : classes.OrderBlockBtnRotate} >
                    <div className={[classes.BlockBtnMinusWraper, classes[props.count == null ? 'BtnMinusHide' : null]].join(' ')} onClick={!props.disable ? props.clickedMinus : false} disabled={props.disable}>
                        <button className={!props.disable ? classes.BlockBtnMinusVisible : classes.BlockBtnMinusUnVisible}></button>{/*disabled={props.disable}*/}
                    </div>
                    <button className={classes.OrderBlockCirkle} onClick={!props.disable ? props.clickedPlus : false}></button>
                    <div className={classes.BlockBtnPlusWraper} onClick={props.clickedPlus}>
                        <button className={!props.activeClass ? classes.BlockBtnPlusHide : classes.BlockBtnPlus} ></button>
                    </div>
                </div >
                {
                    props.auth ? <div className={classes.ImagesBlockBtnSwipe}>
                        <ButtonBootstrap variant="outline-danger" onClick={props.clicked}>Remove</ButtonBootstrap>
                        <ButtonBootstrap variant="outline-primary" onClick={props.clickedUpdate}>Update</ButtonBootstrap>
                    </div > : null
                }
            </div>
            {/* <span className={[classes.OrderHelp, classes.OrderPlus].join(' ')}>+</span>
            <span className={[classes.OrderHelp, classes.OrderMinus].join(' ')}>-</span> */}

            <div className={classes.Price}>
                {/* <span className={classes.Price}>{props.price}_500g.</span> */}
            </div>
        </div >
    );

};

export default order;