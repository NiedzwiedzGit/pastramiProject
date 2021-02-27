import React, { useState, useEffect, useRef } from 'react';
import Input from '../../components/UI/Input/Input';
import { updateObject, checkValidity } from '../../shared/utility';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
const ResiveForm = React.memo(props => {
    const [resiveForm, setReciveForm] = useState({
        nazwaFirmy: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Nazwa Firmy',
                describe: 'Nazwa/Firma'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            startView: true,
            hide: true
        },
        nip: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: '00-00-00-00-00',
                describe: 'NIP'
            },
            value: '',
            validation: {
                required: true,
                minLength: 10,
                maxLength: 10,
                isNumeric: true
            },
            startView: true
        },
        adres: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Ulica 1A, 00-123 Warszawa',
                describe: 'Adres'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            startView: true,
            hide: true
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'jan.kowalski@firma.pl',
                describe: 'Adres e-mail do wysyłki'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            startView: true,
            touched: false
        }
    }
    );
    const [updateForm, setUpdateForm] = useState({});
    const [formIsValid, setFormIsValid] = useState(false);

    let inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(resiveForm[inputIdentifier], {
            value: (!props.loading && props.animate) || (event.target.value === 'on') ? '' : event.target.value,
            valid: !props.loading && props.animate ? false : checkValidity(event.target.value, resiveForm[inputIdentifier].validation),
            touched: !props.loading && props.animate ? false : true,
        });
        let updateList = updateForm;
        const updatedOrderForm = updateObject(resiveForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;

        if (!props.field) {
            for (let inputIdentifier in updatedOrderForm) {
                if (resiveForm[inputIdentifier].startView) {
                    formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
                    props.updateHandler ? updateList[inputIdentifier] = updatedOrderForm[inputIdentifier].value : null;

                }
            }
        } else {
            props.field.split(' ').map(res => {
                formIsValid = updatedOrderForm[res].valid && formIsValid;
                props.updateHandler ? updateList[inputIdentifier] = updatedOrderForm[inputIdentifier].value : null;
            })
        }
        setReciveForm(updatedOrderForm);
        setFormIsValid(formIsValid);
        setUpdateForm(updateList);
        props.onFormIsValid(formIsValid);
    }
    let inputChanged = (inputIdentifier) => {
        const updatedFormElement = updateObject(resiveForm[inputIdentifier], {
            hide: !resiveForm[inputIdentifier].hide,
            valid: !resiveForm[inputIdentifier].valid
        });
        const updatedOrderForm = updateObject(resiveForm, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid = true;
        let count = 0;
        if (!props.field) {
            for (let inputIdentifier in updatedOrderForm) {
                if (resiveForm[inputIdentifier].startView && resiveForm[inputIdentifier].touched) {
                    count++;
                    formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
                }
            }
        } else {
            props.field.split(' ').map(res => {
                formIsValid = updatedOrderForm[res].valid && formIsValid;
            })
        }

        return [
            setReciveForm(updatedOrderForm),
            setFormIsValid(formIsValid)]


    }
    // Hook
    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        }, [value]);
        return ref.current;
    }

    let count = 0;
    let form = (
        Object.keys(resiveForm).map((formElement, index) => {
            count++;
            return <Input
                key={formElement}
                elementType={resiveForm[formElement].elementType}
                elementConfig={resiveForm[formElement].elementConfig}
                // disabled={resiveForm.disabled}
                value={resiveForm[formElement].value}
                invalid={!resiveForm[formElement].valid}
                shouldValidate={resiveForm[formElement].validation}
                touched={resiveForm[formElement].touched}
                hide={count >= 1 ? resiveForm[formElement].hide : 'none'}
                changed={(event) => inputChangedHandler(event, formElement)}
                clicked={() => inputChanged(formElement)}
            />
        })
    );

    return form;
})

const mapStateToProps = state => {
    return {
        loading: state.newpost.loading,
        animate: state.newpost.animate,
        updateData: state.newpost.updateData,
        updateHandler: state.newpost.updateHandler
    };
}
const mapDispatchToProps = dispatch => {
    return {
        onFormIsValid: (formIsValid) => dispatch(actions.checkFormIsValid(formIsValid))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResiveForm);