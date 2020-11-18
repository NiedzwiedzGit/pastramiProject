import React from 'react';
import classes from './Input.css';
import Form from 'react-bootstrap/Form';
import ButtonBootstrap from 'react-bootstrap/Button';


const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];


    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    if (props.hide == false) {
        inputClasses.push(classes.Hide);
    }
    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p>Please enter a valid value!</p>;
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')
                }
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                disabled={props.disabled} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed} >
                    {
                        props.elementConfig.options.map(option => (

                            < option key={option.value} value={option.value} >
                                {option.displayValue}

                            </option>
                        ))
                    }
                </select >
            );
            break;
        default:
            inputElement = <input
                className={classes.InputElement}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }
    console.log("[hide props ]", props.hide ? "work!!! " + props.hide : null);
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {/* <input type="checkbox" onClick={props.clicked} /> */}
            <ButtonBootstrap
                variant={props.hide !== false ? "outline-danger" : "outline-primary"}
                onClick={props.clicked}>
                {props.hide !== false ? "-" : "+"}
            </ButtonBootstrap>
            {validationError}
        </div >
    );

};

export default input;