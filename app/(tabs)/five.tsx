import React, { useEffect, useState } from 'react';
import { StyleSheet, ActivityIndicator } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { View } from '../../components/Themed';
import { fetchMe, accessCilentForm, respLogin } from "../../store/login-internal";

import { Me } from '../me/profile';
import { PreProfile } from '../preprofile';

export default function TabFiveScreen() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cookieCacheKey, setCookieCacheKey] = useState('');
    const [isrespLogin, setrespLogin] = useState<respLogin | any>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // Check if user is logged in and set isLoggedIn and cookieCacheKey state accordingly
        const checkLoginStatus = async () => {
            const client_ip = await AsyncStorage.getItem('client_ip');
            const cookie = await AsyncStorage.getItem('cookie_cache_key');
            if (cookie) {
                const accessForm: accessCilentForm = {
                    email: '',
                    mobile: '',
                    cookie_cache_key: cookie,
                    password: '',
                    otp_key: '',
                    ip_address: client_ip || ''
                }
                
                const fetchLogin = async () => {
                    const respLogin = await fetchMe(accessForm, "cookie");
                        if (respLogin?.status == 200) { // Check if respLogin is defined
                            setrespLogin(respLogin.data);
                            setCookieCacheKey(respLogin.data.cookie_cache_key);
                            setIsLoggedIn(true);
                            if (cookieCacheKey) { 
                                await AsyncStorage.setItem('cookie_cache_key', cookieCacheKey);
                            }
                        }

                        setLoading(false); // Set loading to false after fetch completes
                    }

                await fetchLogin();
            } else {
                setLoading(false); // Set loading to false if no cookie is found
            }
        };

        checkLoginStatus();
    }, [fetchMe]);
    
    return (
        <View style={styles.container}>
            {loading ? (
                // Show loading indicator while fetch is executing
                <ActivityIndicator size="large" color="#3498db" />
            ) : (
                // If user is logged in, show the profile screen
                isLoggedIn ? <Me respLogin={isrespLogin} /> : <PreProfile />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo:{
        width: 80,
        height: 80,
    },
    signupText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    subtitleText: {
        fontSize: 14,
        textAlign: 'center',
        paddingHorizontal: 50,
    },
    subtitleTextPolicy: {
        fontSize: 14,
        textAlign: 'center',
        paddingHorizontal: 50,
        marginTop: 15,
        marginBottom: 10,
    },
    buttomSignup: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#95a5a6',
        borderRadius: 5,
        paddingHorizontal: 50,
        paddingVertical: 10, 
        width: 300, 
        marginTop: 10,
    },
    textButtomSignup: {
        fontSize: 14,
        textAlign: 'center',
        marginLeft: 20,
    },
    phoneOrEmailContainerLogin: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#95a5a6',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    phoneOrEmailIconLogin: {
        marginRight: 10
    },
    phoneOrEmailTextLogin: {
        fontSize: 14,
    }
});
