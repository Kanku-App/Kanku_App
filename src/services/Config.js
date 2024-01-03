import { isJson } from '../utils/Helper';

export const parseResponse = async response => {
    if (!response.Data) {
        return { ...response, Status: parseInt(response.Status) };
    }
    const data = await response.Data;
    if (isJson(data)) {
        return {
            ...response,
            Status: parseInt(response.Status),
            Data: JSON.parse(data),
        };
    } else {
        return { ...response, Status: parseInt(response.Status) };
    }
};

const base_url = {
    baseUrl: 'https://api.kankuapp.com:8080/api/'

};

export const DOMAIN = base_url.baseUrl;