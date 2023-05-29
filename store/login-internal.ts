import axios from 'axios';
import { config, getTokenInSession, checkToken, getPublicIp } from './authen';
import { FeedData } from './feed';

// interface following {
//     profile_name_uuid: string;
//     following_profile_uuid: string;
//     create_date: Date;
// };

// interface follower {
//     profile_name_uuid: string;
//     follwer_profile_uuid: string;
//     create_date: Date;
// };

interface clipsProfile {
    clips_profile_uuid: string,
    create_date: string,
    modified_date: string,
    profile_name_uuid: string,
    file_name: string,
    file_type: string,
    file_size_kb: number,
    file_key_s3: string,
    file_url_s3: string,
    file_url_expire_date_s3: string
};

type respLogin = {
    detail: string,
    content: string,
    cookie_cache_key: string,
    profile_name_uuid: string,
    profile_name: string,
    profile_url: string,
    username: string,
    following: Array<any>,
    followers: Array<any>,
    likes: number,
    profile_contents: FeedData
};

type accessCilentForm = {
    email: string,
    mobile: string,
    cookie_cache_key: string,
    password: string,
    otp_key: string,
    ip_address: string
};


async function fetchMe(form: accessCilentForm, type_login: string) {
    let body = {};
    let pathLogin = null;

    if (type_login == "email") {
        pathLogin = "/profile/v1/login/mail";
        body = {
            email: form.email,
            password: form.password,
            otp_key: form.otp_key,
            ip_address: form.ip_address
        };
    } else if (type_login == "mobile_phone_number") {
        pathLogin = "/profile/v1/login/mobile";
        body = {
            mobile_phone_number: form.mobile,
            password: form.password,
            otp_key: form.otp_key,
            ip_address: form.ip_address
        };
    } else if (type_login == "cookie") {
        pathLogin = "/profile/v1/login/key";
        body = {
            cookie_cache_key: form.cookie_cache_key,
            ip_address: form.ip_address
        };
    }

    try {
        const tokenInSession = await getTokenInSession();
        const token = await checkToken(tokenInSession);
        const response = await axios.post<respLogin>(`${config.apiPath}${pathLogin}`, body, {
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

export { getPublicIp, fetchMe, accessCilentForm, respLogin, FeedData };