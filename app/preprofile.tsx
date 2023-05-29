import { StyleSheet, Pressable, Image } from "react-native";
import { Link } from 'expo-router';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { Text, View } from '../components/Themed';

const PreProfile = () => {

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/images/logo.png')} 
                        style={styles.logo} />
            </View>
            <View style={{ alignItems: 'center', marginVertical: 60 }}>
                <Text style={styles.signupText}>Sign up for Dedee</Text>
                <Text style={styles.subtitleText}>Create a profile, follow other accounts, make your own videos, and more.</Text>
            </View>

            <Link href="/signup" asChild>
                <Pressable>
                {({ pressed }) => (
                    <View style={styles.buttomSignup}>
                        <FontAwesomeIcon icon={faUser} color='#2ecc71' />
                        <Text style={styles.textButtomSignup}>Use phone or email</Text>
                    </View>
                )}
                </Pressable>
            </Link>

            <Link href="" asChild>
                <Pressable>
                {({ pressed }) => (
                    <View style={styles.buttomSignup}>
                        <FontAwesome5 
                            name="google" 
                            size={24} 
                            color="#e74c3c" 
                        />
                        <Text style={styles.textButtomSignup}>Coming soon with Google</Text>
                    </View>
                )}
                </Pressable>
            </Link>

            <Link href="" asChild>
                <Pressable>
                {({ pressed }) => (
                    <View style={styles.buttomSignup}>
                        <FontAwesome5 
                            name="facebook" 
                            size={24} 
                            color="#2980b9" 
                        />
                        <Text style={styles.textButtomSignup}>Coming soon with Facebook</Text>
                    </View>
                )}
                </Pressable>
            </Link>

            <Link href="" asChild>
                <Pressable>
                {({ pressed }) => (
                    <View style={styles.buttomSignup}>
                        <FontAwesome5 
                            name="tiktok" 
                            size={24} 
                            color="#7f8c8d"
                        />
                        <Text style={styles.textButtomSignup}>Coming soon with Tiktok</Text>
                    </View>
                )}
                </Pressable>
            </Link>

            <Text style={styles.subtitleTextPolicy}>
                By continuing, you agree to our Terms of Service and acknowledge that you have read our Privacy Policy to learn how we collect, use, and share your data</Text>


            <Link href="/login" asChild>
                <Pressable>
                {({ pressed }) => (
                    <View style={styles.phoneOrEmailContainerLogin}>
                        <Text style={styles.phoneOrEmailTextLogin}>Already have an account? Log in</Text>
                    </View>
                )}
                </Pressable>
            </Link>
        </View> 
    )
};

export { PreProfile };


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
