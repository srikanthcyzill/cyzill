import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

function CardPayment({ handlePaymentSuccess }) {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });
        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            // Call handlePaymentSuccess with paymentMethod ID
            handlePaymentSuccess(paymentMethod.id);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}> Pay </button>
        </form>
    );
}

export default CardPayment;
