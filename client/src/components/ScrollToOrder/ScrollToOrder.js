import React, { useState } from 'react';
import classes from './ScrollToOrder.css';
import { Link } from 'react-scroll'



const scrollToOrder = React.memo(props => {

    const [style, setStyle] = useState(false);

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
            onClick={() => classHandlerActive(props.index)}
        >
            <p>{props.textField}</p>
            <p className={classes.CounterSlide}>{props.count ? "x" + props.count : null}</p>
        </Link >
    );

});

export default scrollToOrder;