import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ButtonBootstrap from 'react-bootstrap/Button';
import classes from './Coment.css';
class Coment extends Component {
    render() {
        let content = (
            <div className={classes.ComentsBlock}>
                <img
                    src={this.props.url}
                    // onClick={this.props.clickedOn}
                    alt="" />
                <div className={classes.PWraper}>
                    <p><a href="">{this.props.name}</a> {this.props.date}</p>
                    <p>{this.props.text}</p>
                </div>
            </div>);
        return (
            <div className={[classes.ComentsBlockWraper, classes[this.props.close]].join(' ')} >
                {/* <span className={classes.ImagesBlockLine}></span> */}
                <br />
                {
                    !this.props.auth ? <div className={classes.ComentsBlockBtnSwipe}>
                        <ButtonBootstrap variant="outline-danger" onClick={this.props.clicked}>Remove</ButtonBootstrap>
                        <ButtonBootstrap variant="outline-primary" onClick={this.props.clickedUpdate}>Update</ButtonBootstrap>
                    </div > : null
                }
                {content}
            </div >
        )
    }
}
export default Coment;