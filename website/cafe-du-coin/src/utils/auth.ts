/**
 * This module handles the authentication to access to the server.
 */

import { jwtDecode as decode } from 'jwt-decode';
import axios from 'axios';

/**
 * TODO: put all configuration in a config file or som environment variables.
 */
const REST_ENDPOINT = 'http://localhost:3000/';
const AUTH_TOKEN_KEY = 'authToken';

/**
 * Gets the token and stores it into the local storage.
 * @param username
 * @param password 
 * @returns Promise<void>
 */
export const loginUser = (username: string, password: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                url: `${REST_ENDPOINT}api/v1/auth/token`,
                method: 'POST',
                data: {
                    username: username,
                    password: password,
                    grant_type: 'password'
                }
            });

            setAuthToken(res.data.accessToken);
            resolve();
        }
        catch (err) {
            reject(err);
        }
    })
}

/**
 * Store the token into the local storage
 * @param token
 */
export const setAuthToken = (token: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
}

/**
 * Gets the current stored token 
 * @returns token
 */
export const getAuthToken = () => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
}

/**
 * Tests if the user is logged in and the token valid.
 * @returns boolean
 */
export function isLoggedIn() {
    const authToken = getAuthToken();
    return !!authToken && !isTokenExpired(authToken);
}

/**
 * Fetch the user info from the current stored token.
 * @returns User info
 */
export function getUserInfo() {
    if (isLoggedIn()) {
        return decode(getAuthToken() as string);
    }
}

/**
 * Gets the expiration date of the current stored token
 * @param encodedToken 
 * @returns 
 */
export const getTokenExpirationDate = (encodedToken: string) => {
    if (encodedToken != 'undefined') {
        const token = decode(encodedToken);
        if (!token.exp) {
            return null;
        }

        const date = new Date(0);
        date.setUTCSeconds(token.exp);

        return date;
    }
    return null;
}

/**
 * Tests if the token has expired.
 * @param token 
 * @returns 
 */
export const isTokenExpired = (token: string) => {
    const expirationDate = getTokenExpirationDate(token) as Date;
    return expirationDate < new Date();
}