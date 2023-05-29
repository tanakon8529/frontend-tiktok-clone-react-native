
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Link } from 'expo-router';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

import { getPublicIp } from "../../store/login-internal";
import { signupSending, signupVerify, signupSendingForm, signupVerifyForm, respOtp } from "../../store/signup-internal";
import { fetchMe, accessCilentForm, respLogin } from "../../store/login-internal";
import { styles } from "./styles";
import { CustomModalError, CustomModalOTP } from "../../utils/CustomModal";
import { Me } from '../../app/me/profile';

const PhoneRoute = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState('TH66+');
    const [phoneNumber, setPhoneNumber] = useState('');
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
        if (phoneNumber.length == 9) {
            let phoneNumberFormat = '+66' + phoneNumber;
            const form: signupSendingForm = {
                email: '',
                mobile_phone_number: phoneNumberFormat
            }

            if (phoneNumberFormat && password) {
                const accessForm: accessCilentForm = {
                    email: '',
                    mobile: phoneNumberFormat,
                    cookie_cache_key: '',
                    password: password,
                    otp_key: '',
                    ip_address: ip_address
                }
                
                console.log('phoneNumberFormat: ', phoneNumberFormat);
                console.log('password: ', password);
                const CheckLoginPassword = async () => {
                    const respLogin = await fetchMe(accessForm, "mobile_phone_number");
                    if (respLogin?.status == 200) {
                        const fetchSending = async () => {
                            const resp = await signupSending(form, "mobile_phone_number");
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
                // phone or password invalid, show error modal
                console.log('phone or password invalid: ', modalVisibleError);
                setModalVisibleError(true);
            }
        } else {
            // Invalid phone, show error modal
            console.log('Invalid phone: ', modalVisibleError);
            setModalVisibleError(true);
        }
    };

    const handleVerifyOTP = async () => {
        console.log('Verifying OTP code:', otpCode);
        let phoneNumberFormat = '+66' + phoneNumber;
        if (otpCode.length == 6) {
            const accessForm: accessCilentForm = {
                email: '',
                mobile: phoneNumberFormat,
                cookie_cache_key: '',
                password: password,
                otp_key: otpCode,
                ip_address: ip_address
            }

            const fetchLogin = async () => {
                const respLogin = await fetchMe(accessForm, "mobile_phone_number");
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
                <Link href="" asChild>
                </Link>
                :
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <Picker
                            style={styles.inputIcon}
                            selectedValue={selectedDevice}
                            onValueChange={setSelectedDevice}
                        >
                            <Picker.Item label="TH66+" value="TH66+" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>
                        <Text>{selectedDevice} </Text>
                            <TextInput
                                style={styles.inputs}
                                placeholder="Phone number"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                maxLength={9}
                                keyboardType={'numeric'}
                            />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                                style={styles.inputs}
                                placeholder="Password"
                                value={password}
                                onChangeText={setPassword}
                                maxLength={20}
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

export { PhoneRoute };