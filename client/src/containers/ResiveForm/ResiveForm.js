import React, { Suspense, Component, useState, useEffect } from 'react';
import classes from './ResiveForm.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
const ResiveForm = React.memo(props => {
    let form = (

        <Form>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Nazwa/Firma</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    placeholder="Nazwa firmy"
                    aria-label="Nazwa firmy"
                    aria-describedby="basic-addon1"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">NIP</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    placeholder="00-00-00-00-00"
                    aria-label="00-00-00-00-00"
                    aria-describedby="basic-addon1"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Adres</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    placeholder="Ulica 1A, 00-123 Warszawa"
                    aria-label="Adres"
                    aria-describedby="basic-addon1"
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Adres e-mail do wysyłki</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    placeholder="jan.kowalski@firma.pl"
                    aria-label="Adres e-mail do wysyłki"
                    aria-describedby="basic-addon1"
                    value={props.auth ? localStorage.getItem('email') : null}
                />
            </InputGroup>
        </Form>
    );

    return form;
})

export default ResiveForm;