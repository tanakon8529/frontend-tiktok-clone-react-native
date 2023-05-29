import axios from 'axios';
import { config, getTokenInSession, checkToken, getPublicIp } from './authen';

type signupSendingForm = {
    email: string,
    mobile_phone_number: string
};

type signupVerifyForm = {
    email: string,
    mobile_phone_number: string,
    password: string,
    otp_key: string
};

type respOtp = {
    detail: string,
};

async function signupSending(form: signupSendingForm, type_signup: string) {
    let body = {};
    let pathSend = null;

    if (type_signup == "email") {
        pathSend = "/clients/v1/mail/send";
        body = {
            email: form.email
        };
    } else if (type_signup == "mobile_phone_number") {
        pathSend = "/clients/v1/sms/send";
        body = {
            mobile_phone_number: form.mobile_phone_number
        };
    }

    try {
        const tokenInSession = await getTokenInSession();
        const token = await checkToken(tokenInSession);
        const response = await axios.post<respOtp>(`${config.apiPath}${pathSend}`, body, {
            headers: {
                'Content-Type': 'application/json',
                'token': String(token),
            },
        });
        return response;
    } catch (error: any) {
        if (error?.response) {
            console.error(error.response.data);
        } else {
            console.error(error);
        }
    }     
};

async function signupVerify(form: signupVerifyForm, type_signup: string) {
    let body = {};
    let pathVerify = null;
  
    if (type_signup == "email") {
        pathVerify = "/clients/v1/mail/verify";
        body = {
            email: form.email,
            password: form.password,
            otp_key: form.otp_key
        };
    } else if (type_signup == "mobile_phone_number") {
        pathVerify = "/clients/v1/sms/verify";
        body = {
            mobile_phone_number: form.mobile_phone_number,
            password: form.password,
            otp_key: form.otp_key
        };
    }

    try {
        const tokenInSession = await getTokenInSession();
        const token = await checkToken(tokenInSession);
        const response = await axios.post(`${config.apiPath}${pathVerify}`, body, {
            headers: {
                'Content-Type': 'application/json',
                'token': String(token),
            },
        });
        return response;
    } catch (error: any) {
        if (error?.response) {
            console.error(error.response.data);
        } else {
            console.error(error);
        }
    }       
};

export { getPublicIp, signupSending, signupVerify, signupSendingForm, signupVerifyForm, respOtp };