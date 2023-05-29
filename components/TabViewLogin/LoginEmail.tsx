import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import { getPublicIp } from "../../store/login-internal";
import { signupSending, signupSendingForm, respOtp } from "../../store/signup-internal";
import { fetchMe, accessCilentForm } from "../../store/login-internal";
import { styles } from "./styles";
import { CustomModalError, CustomModalOTP } from "../../utils/CustomModal";

const EmailRoute = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ip_address, setPublicIp] = useState('');
    const [isSending, setisSending] = useState<respOtp | any>([]);
    const [otpCode, setOtpCode] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [modalVisibleError, setModalVisibleError] = useState(false);
    const [modalVisibleOTP, setModalVisibleOTP] = useState(false);

    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    useEffect(() => {
        const getClientPublicIp = async () => {
        const client_ip = await getPublicIp()
        if (client_ip) {
            setPublicIp(client_ip);
            }
        };
        
        getClientPublicIp();
    }, [getPublicIp]);
    
    const handleSendOTP = () => {
        const emailRegex = /\S+@\S+\.\S+/;
        if (email.length > 0 && emailRegex.test(email)) {
            const form: signupSendingForm = {
                email: email,
                mobile_phone_number: ''
            }

            if (email && password) {
                const accessForm: accessCilentForm = {
                    email: email,
                    mobile: '',
                    cookie_cache_key: '',
                    password: password,
                    otp_key: '',
                    ip_address: ip_address
                }

                const CheckLoginPassword = async () => {
                    const respLogin = await fetchMe(accessForm, "email");
                    if (respLogin?.status == 200) {
                        const fetchSending = async () => {
                            const resp = await signupSending(form, "email");
                            if (resp?.status == 200) {
                                setisSending(resp.data.detail);
                                setModalVisibleOTP(true);
                            }
                        };

                        fetchSending();
                    }
                }

                CheckLoginPassword();
            } else {
                // email or password invalid, show error modal
                console.log('email or password invalid: ', modalVisibleError);
                setModalVisibleError(true);
            }
        } else {
            // Invalid email, show error modal
            console.log('Invalid email: ', modalVisibleError);
            setModalVisibleError(true);
        }
    };

    const handleVerifyOTP = async () => {
        
        console.log('Verifying OTP code:', otpCode);
        if (otpCode.length == 6) {
            const accessForm: accessCilentForm = {
                email: email,
                mobile: '',
                cookie_cache_key: '',
                password: password,
                otp_key: otpCode,
                ip_address: ip_address
            }

            const fetchLogin = async () => {
                const respLogin = await fetchMe(accessForm, "email");
                    if (respLogin?.status == 200) { // Check if respLogin is defined
                        const cookieCacheKey = respLogin.data.cookie_cache_key;
                        if (cookieCacheKey) { 
                            await AsyncStorage.setItem('cookie_cache_key', cookieCacheKey);
                            setIsLoggedIn(true);
                        }
                    }
            }

            fetchLogin();
        };
    };
    
    return (
      <View style={styles.container}>
        {isLoggedIn ? 
            // If user is logged in, show home page
            <View style={styles.container}>
                <Text style={styles.inputs}>You are logged in!</Text>
            </View>
            :
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Email address"
                        value={email}
                        onChangeText={setEmail}
                        maxLength={255}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                            style={styles.inputs}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            maxLength={20}
                            secureTextEntry={hidePassword}
                        />
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                        <Ionicons
                            name={hidePassword ? 'eye-off' : 'eye'}
                            size={24}
                            color="black"
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.subtitleText}>
                    By continuing, you agree to Dedee's Terms of Service and confirm that you have read Dedee's Privacy Policy</Text>
                <TouchableOpacity style={styles.buttonContainerSending} onPress={handleSendOTP}>
                    <Text style={styles.buttonContainerSendingText}>Log in</Text>
                </TouchableOpacity>
                {isSending && (
                    <CustomModalOTP
                        modalVisibleOTP={modalVisibleOTP}
                        setModalVisibleOTP={setModalVisibleOTP}
                        otpCode={otpCode}
                        setOtpCode={setOtpCode}
                        handleVerifyOTP={handleVerifyOTP} 
                        otpMessage={isSending}            
                    />
                )}
                <CustomModalError
                    modalVisibleError={modalVisibleError}
                    setmodalVisibleError={setModalVisibleError}
                    errorMessage="Invalid email format."
                />
            </View>
        }
      </View>
    );
};

export { EmailRoute };