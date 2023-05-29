

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

import { getPublicIp } from "../../store/login-internal";
import { signupSending, signupVerify, signupSendingForm, signupVerifyForm, respOtp } from "../../store/signup-internal";
import { fetchMe, accessCilentForm, respLogin } from "../../store/login-internal";
import { styles } from "./styles";
import { CustomModalError, CustomModalOTP } from "../../utils/CustomModal";


const EmailRoute = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ip_address, setPublicIp] = useState('');
    const [isSending, setisSending] = useState<respOtp | any>([]);
    const [otpCode, setOtpCode] = useState('');
    const [isVerify, setisVerify] = useState(false);
    const [hidePassword, setHidePassword] = useState(true);
    const [modalVisibleError, setModalVisibleError] = useState(false);
    const [modalVisibleOTP, setModalVisibleOTP] = useState(false);
    const [isMessageError, setisMessageError] = useState<respOtp | any>([]);

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
        console.log('handleSendOTP:', email);
        const emailRegex = /\S+@\S+\.\S+/;
        if (email.length > 0 && emailRegex.test(email)) {
            const form: signupSendingForm = {
                email: email,
                mobile_phone_number: ''
            }

            const fetchSending = async () => {
                const resp = await signupSending(form, "email");
                console.log('Response: ', resp?.status);
                if (resp?.status == 200) { // Check if resp is defined
                    setisSending(resp.data.detail);
                    setModalVisibleOTP(true);
                    console.log('Response: ', resp.data.detail);
                } else {
                    setisMessageError(resp?.data.detail);
                }
            };
            
            fetchSending();
        } else {
            // handleSendOTP, show error modal
            console.log('handleSendOTP: ', modalVisibleError);
            setModalVisibleError(true);
        }
    };

    const handleVerifyOTP = async () => {
        console.log('Verifying OTP code:', otpCode);
        if (otpCode.length == 6) {
            const form: signupVerifyForm = {
                email: email,
                mobile_phone_number: '',
                password: password,
                otp_key: otpCode,
            }

            const fetchVerify = async () => {
                const resp = await signupVerify(form, "mobile_phone_number");
                if (resp?.status == 200) { // Check if resp is defined
                    setisVerify(true);
                    console.log('Response: ', resp.data.detail);
                }
            };
            
            fetchVerify();
        }
    };
    
    return (
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
            <Text style={styles.buttonContainerSendingText}>Send OTP</Text>
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
            errorMessage={isMessageError}
        />
      </View>
    );
};

export { EmailRoute };