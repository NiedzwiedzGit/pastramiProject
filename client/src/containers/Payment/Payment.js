import React, { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import ButtonBootstrap from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import classes from './Payment.css'


const Payment = React.memo(props => {
    const [showKey, setShowKey] = useState(false);
    const [payActive, setPayActive] = useState(true);

    useEffect(() => {
        props.onPay(payActive);
    });

    let clickListener = () => {
        setShowKey(!showKey);
        setPayActive(!payActive);

    }
    let key = new Date().getTime();
    let pay = (
        <div className={classes.PayWraper}>
            <div>
                <ButtonBootstrap
                    variant="secondary"
                    onClick={() => clickListener()}
                >Przelew tradycyjny</ButtonBootstrap>
            </div>
            <div className={[classes.PayOrderNumberWraper, classes[showKey ? 'ShowPayOrderNumberWraper' : null]].join(' ')}>
                <span>Należy umieścić w tytule przelewu numer zamówienia:</span>
                <span>{key}</span>
            </div>
            <div className={showKey ? classes.PayBtnWraperShow : classes.PayBtnWraper}>
                <div>
                    <PayPalScriptProvider options={{ "client-id": "sb" }}>
                        <PayPalButtons style={{ layout: "horizontal" }} />
                    </PayPalScriptProvider>
                </div>
                {/* <div>
                    <GooglePayButton
                        environment="TEST"
                        paymentRequest={{
                            apiVersion: 2,
                            apiVersionMinor: 0,
                            allowedPaymentMethods: [
                                {
                                    type: 'CARD',
                                    parameters: {
                                        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                                        allowedCardNetworks: ['MASTERCARD', 'VISA'],
                                        billingAddressRequired: true,
                                        billingAddressParameters: {
                                            format: "FULL",
                                            phoneNumberRequired: true
                                        }
                                    },
                                    tokenizationSpecification: {
                                        type: "PAYMENT_GATEWAY",
                                        parameters: {
                                            gateway: "stripe",
                                            "stripe:version": "v3",
                                            "stripe:publishableKey": "pk_test_51Hq6DcE938nb3fCN0fUcN4zkmAiSfZyPlEUy0Qh7ZCCNuhKKCg0jZPaSif0JMNJCnpHGRlrBc8Vw1FtUimbJil6K00zQ4BwIE3"
                                        },
                                    },
                                },
                            ],
                            merchantInfo: {
                                // merchantId: 'BCR2DN6TWPJ2L4CP',
                                merchantName: 'igor shkliarskbbiy',
                            },
                            transactionInfo: {
                                totalPriceStatus: 'FINAL',
                                totalPriceLabel: 'Total',
                                totalPrice: '1.00',
                                currencyCode: 'UAH',
                                countryCode: 'UA'
                            },
                        }}
                        onLoadPaymentData={paymentRequest => {
                            console.log('Success', paymentRequest);
                        }}
                    />
                </div> */}
            </div>
        </div >);

    let success = (<div className={classes.PayWraper}>
        <span>success</span>
    </div>

    )

    return !props.payEnd ? pay : success;
});

const mapDispatchToProps = dispatch => {
    return {
        onPay: (payActive) => dispatch(actions.checkPay(payActive))
    };
};

export default connect(null, mapDispatchToProps)(Payment);