import React from 'react';
import classes from './Input.css';
import TextareaAutosize from 'react-textarea-autosize';


const input = (props) => {
    let inputElement = null;
    // let classAdd = classes.[props.class]
    const inputClasses = [classes.InputElement, classes[props.classAdd]];


    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    if (props.hide === false) {
        inputClasses.push(classes.Hide);
    }
    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p>Please enter a valid value!</p>;
    }
    switch (props.elementType) {
        case ('input'):
            inputElement =
                <input
                    className={inputClasses.join(' ')
                    }
                    {...props.elementConfig}
                    value={props.value}
                    step={0.01}
                    onChange={props.changed}
                    disabled={props.disabled} />;
            break;
        case ('textarea'):
            inputElement = <TextareaAutosize
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                disabled={props.disabled} />;

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
    return (
        <div className={classes.Input}>
            {inputElement}

            {validationError}
        </div >
    );

};

export default input;