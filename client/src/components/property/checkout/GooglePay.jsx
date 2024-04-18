import { PaymentRequestButtonElement, useStripe } from '@stripe/react-stripe-js';

const GooglePay = ({ handlePaymentSuccess }) => {
    const stripe = useStripe();

    if (!stripe) {
        // Stripe library has not loaded yet
        return null;
    }

    const paymentRequest = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
            label: 'Demo total',
            amount: 1000,
        },
    });

    const handleClick = async () => {
        const result = await paymentRequest.show();

        if (result.error) {
            console.log('[error]', result.error);
        } else {
            console.log('[PaymentMethod]', result.paymentMethod);
            handlePaymentSuccess(result.paymentMethod.id);
        }
    };

    return (
        <button onClick={handleClick} disabled={!stripe}>
            Pay with Google Pay
        </button>
    );
};

export default GooglePay;