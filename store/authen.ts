import axios from 'axios';
import config from '../settings/configs'

import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the API endpoints
const tokenUrl = `${config.apiPath}/access/v1/token`;
const protectedUrl = `${config.apiPath}/access/v1/protected`;

// Define the token object
interface Token {
  access_token: string;
  token_type: string;
}

async function getPublicIp(): Promise<any> {
    const response = await axios.get('https://api.ipify.org');
    const publicIPAddress: string = response.data;
    return publicIPAddress
}

// Get a token using the client id and secret headers
async function getToken(): Promise<Token> {
    const response = await axios.post<Token>(tokenUrl, null, {
      headers: {
        'client-id': config.clientId,
        'client-secret': config.clientSecret,
      },
    });
    const token = response.data;
    // Store the token in AsyncStorage
    await AsyncStorage.setItem('token', JSON.stringify(token));
    return token;
}
  

// Check the token and refresh it if needed
async function checkToken(token: Token): Promise<string> {
    try {
      await axios.get(protectedUrl, {
        headers: {
          token: `${token.token_type} ${token.access_token}`,
        },
      });
      // The token is still valid, so return it as is
      return `${token.token_type} ${token.access_token}`;
    } catch (error) {
      // The token has expired, so get a new one
      const newToken = await getToken();
      return `${newToken.token_type} ${newToken.access_token}`;
    }
}
  
async function getTokenInSession() {
    let token: Token;

    try {
        // Try to load the token from AsyncStorage
        const tokenString = await AsyncStorage.getItem('token');
        if (tokenString) {
            token = JSON.parse(tokenString);
            return token;
        }
    } catch (error: any) {
        if (error?.response) {
            console.error(error.response.data);
        } else {
            console.error(error);
        }
    }   
    // If the token is not found or is invalid, get a new token
    const newToken = await getToken();
    return newToken;
}

export { getTokenInSession, checkToken, getPublicIp, config };