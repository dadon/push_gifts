const qs = require('querystring');
import axios from "axios";

import { generateId } from "../utils";

export async function registerKeyWord(phone: string) {
    const requestBody = {
        key1: process.env.BIP_TO_PHONE_KEY,
        phone: phone,
        contact: 1,
        // keyword: generateId(8),
    };

    try {
        const response = await axios.post("https://biptophone.ru/api.php", qs.stringify(requestBody));
        return response.data;
    } catch (e) {

    }

    return null;
}

export async function validatePhone(phone: string) {
    const requestBody = {
        key1: process.env.BIP_TO_PHONE_KEY,
        phone: phone,
        validation: 1,
    };

    try {
        const response = await axios.post("https://biptophone.ru/api.php", qs.stringify(requestBody));
        return response.data["isvalid"] == "1";
    } catch (e) {

    }

    return false;
}
