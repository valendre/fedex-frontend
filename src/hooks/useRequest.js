import axios from 'axios';
import {useSelector} from 'react-redux';
import config from '../config';

export default function useRequest() {
    const authFromRedux = useSelector(state => state.auth);

    async function axiosRequest(method, endPoint, data) {
        let url = `${config.backendUrl + endPoint}`;
        let body = method !== 'GET';
        const response = await fetch(url, {
            method: method,
            mode: 'no-cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Authorization': `Bearer ${authFromRedux.accessToken}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
                'Access-Control-Allow-Origin': 'http://localhost:8080',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        });
        return response;
    }

    async function requestWithToken(method, endPoint, data) {
        if (authFromRedux.isLoggedIn) {
            try {
                const response = await axiosRequest(method, endPoint, data);
                return response.data;
            } catch (error) {
                throw error;
            }
        }
        return undefined;
    }

    return [requestWithToken];
}