import axios from 'axios'

import {API_ENDPOINT} from '@environments';
import {LOCAL_STORAGE, HEADER} from '@constants';

export const makeRequest = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

makeRequest.interceptors.response.use(function (response) {
    const {headers} = response;

    //hard coding
    if (headers[HEADER.X_AUTH]) {
        localStorage.setItem(LOCAL_STORAGE.X_AUTH, headers[HEADER.X_AUTH])
    }

    return response;
}, function (error) {
    return Promise.reject(error);
});

makeRequest.interceptors.request.use(function (config) {
    // Do something before request is sent
    const xAuth = localStorage.getItem(LOCAL_STORAGE.X_AUTH);
    if (xAuth) {
        config.headers[HEADER.X_AUTH] = xAuth;
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});