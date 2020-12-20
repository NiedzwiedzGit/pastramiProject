import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ButtonBootstrap from 'react-bootstrap/Button';
import classes from './StartBlock.css';
import backgroundVideo from "../../assets/video/118477774_323834455626532_8651817438335709392_n.mp4"

class StartBlock extends Component {
    componentDidMount() { }
    render() {
        let startBlock = (
            < div >
                <video autoPlay="autoplay" loop="loop" muted className={classes.Video} key={backgroundVideo}>
                    <source src={backgroundVideo} type="video/mp4" />
                </video>
            </div>
        )
        return (
            <div className={classes.StartBlock}>
                {startBlock}

            </div>
        )
    }

};

export default StartBlock;