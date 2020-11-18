import React from 'react';
import classes from './SuccessButton.css';

const buttonSuccess = (props) => (
    <button
        type="button"
        //disabled={props.disabled}
        className={[classes[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}</button>
);

export default buttonSuccess;