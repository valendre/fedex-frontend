import {useSelector} from 'react-redux';

export default function useRequest() {
    const authFromRedux = useSelector(state => state.auth);

    async function requestWithToken(method, endPoint, data) {
        if (authFromRedux.isLoggedIn) {
            try {
                let bearer = 'Bearer ' + authFromRedux.token;
                const response = await fetch(endPoint, {
                    method: method,
                    cache: 'no-cache',
                    headers: {
                        'Authorization': bearer,
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Credentials': 'true',
                        'Access-Control-Allow-Origin': 'http://localhost:8080',
                    },
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                });
                const responseToReturn = await response.json();
                console.log(responseToReturn);
                return responseToReturn;
            } catch (error) {
                throw error;
            }
        }
        return undefined;
    }

    return [requestWithToken];
}