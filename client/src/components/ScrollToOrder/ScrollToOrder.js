import React, { Suspense, useState, useEffect } from 'react';
// import classes from './Order.css';
import classes from './ScrollToOrder.css';
import ButtonBootstrap from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'



const scrollToOrder = React.memo(props => {

    const [style, setStyle] = useState(false);
    const [index, setIndex] = useState('');

    useEffect(() => {
        setIndex(props.index);
        console.log('props.count > 0 ? setStyle(!style) : null ', props.count)
    });
    let classHandlerActive = (i) => {
        setStyle(!style)
    }

    return (
        <Link /*classes.LinkWraper,*/
            activeClass="active"
            className={classes[props.count > 0 ? "Active" : "UnActive"]}
            to={`orderBlock${props.index}`}
            spy={true}
            smooth={true}
            duration={250}
            containerId="containerElement"
            style={{ display: "inline-block", margin: "20px" }}
            // let classHandler;
            onClick={() => classHandlerActive(props.index)}
        // onClick={() => this.setState({ active: index })}
        >
            <p>{props.textField}</p>
            <p className={classes.CounterSlide}>{props.count ? "x" + props.count : null}</p>
        </Link >
    );

});

export default scrollToOrder;