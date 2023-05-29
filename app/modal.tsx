import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Button, Linking } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import React from 'react';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Policy</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Dedee uses cookies and similar technologies to provide a better, faster, and safer experience on the platform, including its website, applications,
          and email communications. These technologies are used to operate the services.  By continuing to use Dedee, you agree to our <Text style={{color: '#3498db'}}>Click, Cookie Policy</Text>.
        </Text>

        <View style={styles.container_buttom}>
            <Button title="Cookie Policy" onPress={ ()=>{ Linking.openURL('https://my.demodecent.com/policy')}} />
        </View>

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    container_buttom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
        paddingBottom: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    getStartedText: {
        fontSize: 14,
        textAlign: 'center',
        paddingHorizontal: 50,
    },
});