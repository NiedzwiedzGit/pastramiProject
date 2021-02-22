import React from 'react';
import classes from './Order.css';
import ButtonBootstrap from 'react-bootstrap/Button';

const order = (props) => {
    return (
        <div className={classes.Order} name={`orderBlock${props.idCount}`} id={`orderBlock${props.idCount}`}>
            <div >
                <div className={classes.NameBlock}>
                    <span className={classes.UnderlineStyle} >{props.name}</span>
                    <span className={!props.disable ? classes.CountVisible : classes.CountUnVisible} >x {props.count}</span>
                </div>

                < div className={!props.activeClass ? classes.OrderBlockBtn : classes.OrderBlockBtnRotate} >
                    <div className={[classes.BlockBtnMinusWraper, classes[props.count == null ? 'BtnMinusHide' : 'BlockBtnMinusWraperActive']].join(' ')} onClick={props.disable ? null : props.clickedMinus} disabled={props.disable}>
                        <button className={!props.disable ? classes.BlockBtnMinusVisible : classes.BlockBtnMinusUnVisible}></button>{/*disabled={props.disable}*/}
                    </div>
                    <button className={classes.OrderBlockCirkle} onClick={!props.disable ? props.clickedPlus : null}></button>
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
        </div >
    );

};

export default order;