import { jwtDecode as decode } from 'jwt-decode';
import axios from 'axios';

const REST_ENDPOINT = 'http://localhost:3000/';
const AUTH_TOKEN_KEY = 'authToken';

export function loginUser(username: string, password: string): Promise<void> {
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

export function logoutUser() {
    clearAuthToken()
}

export function setAuthToken(token: string) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function clearAuthToken() {
    axios.defaults.headers.common['Authorization'] = '';
    localStorage.removeItem(AUTH_TOKEN_KEY);
}

export function isLoggedIn() {
    const authToken = getAuthToken();
    return !!authToken && !isTokenExpired(authToken);
}

export function getUserInfo() {
    if (isLoggedIn()) {
        return decode(getAuthToken() as string);
    }
}

function getTokenExpirationDate(encodedToken: string) {
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

function isTokenExpired(token: string) {
    const expirationDate = getTokenExpirationDate(token) as Date;
    return expirationDate < new Date();
}

export const Axios = axios;