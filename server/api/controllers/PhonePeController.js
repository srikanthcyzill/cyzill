import axios from 'axios';
import sha256 from 'sha256';
import uniqid from 'uniqid';
import dotenv from 'dotenv';

dotenv.config();

const MERCHANT_ID = process.env.MERCHANT_ID;
const PHONE_PE_HOST_URL = process.env.PHONE_PE_HOST_URL;
const SALT_INDEX = process.env.SALT_INDEX;
const SALT_KEY = process.env.SALT_KEY;
const APP_BE_URL = process.env.APP_BE_URL;

export const initiatePayment = async (req, res) => {
    try {
        const { amount, userId, phone, name } = req.body;
        if (isNaN(amount) || amount <= 0) {
            throw new Error('Invalid amount');
        }

        let merchantTransactionId = 'M' + Date.now();
        let normalPayLoad = {
            merchantId: MERCHANT_ID,
            merchantTransactionId: merchantTransactionId,
            merchantUserId: 'MUID' + userId,
            name: name,
            amount: amount * 100,
            redirectUrl: `${APP_BE_URL}/payment/validate/${merchantTransactionId}`,
            redirectMode: "POST",
            mobileNumber: phone,
            paymentInstrument: {
                type: "PAY_PAGE",
            },
        };
        let bufferObj = Buffer.from(JSON.stringify(normalPayLoad), "utf8");
        let base64EncodedPayload = bufferObj.toString("base64");
        let string = base64EncodedPayload + "/pg/v1/pay" + SALT_KEY;
        let sha256_val = sha256(string);
        let xVerifyChecksum = sha256_val + "###" + SALT_INDEX;
        const response = await axios.post(
            `${PHONE_PE_HOST_URL}/pg/v1/pay`,
            {
                request: base64EncodedPayload,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-VERIFY": xVerifyChecksum,
                    accept: "application/json",
                },
            }
        );
        console.log("response->", JSON.stringify(response.data));
        res.redirect(response.data.data.instrumentResponse.redirectInfo.url);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while initiating the payment.");
    }
};

export const validatePayment = async (req, res) => {
    try {
        const { merchantTransactionId } = req.params;
        if (!merchantTransactionId) {
            throw new Error('Invalid merchant transaction ID');
        }

        let statusUrl =
            `${PHONE_PE_HOST_URL}/pg/v1/status/${MERCHANT_ID}/` +
            merchantTransactionId;
        let string =
            `/pg/v1/status/${MERCHANT_ID}/` + merchantTransactionId + SALT_KEY;
        let sha256_val = sha256(string);
        let xVerifyChecksum = sha256_val + "###" + SALT_INDEX;
        const response = await axios.get(statusUrl, {
            headers: {
                "Content-Type": "application/json",
                "X-VERIFY": xVerifyChecksum,
                "X-MERCHANT-ID": MERCHANT_ID,
                accept: "application/json",
            },
        });
        const data = response.data;
        console.log("response->", data);
        if (!data || data.code !== "PAYMENT_SUCCESS") {
            throw new Error('Payment validation failed');
        }

        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while validating the payment.");
    }
};
