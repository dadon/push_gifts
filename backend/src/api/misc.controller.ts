import { Body, Controller, Post, Route, Tags, Hidden } from "tsoa";


import { SimpleResponse } from "../types";
import { registerKeyWord, validatePhone } from "../external_api/biptophone";
import { sendSms } from "../external_api/sms";
import { ApiError } from "../utils/cutom_error";


export interface PhoneData {
    phone: string;
}

export interface SmsData {
    phone: string;
    message: string;
}

export interface BipToPhoneResponse {
    keyword: string;
    minbip: number;
}


@Tags("Misc")
@Route("misc")
export class MiscController extends Controller {

    /** Validate phone number and register phone in bipToPhone service */
    @Hidden()
    @Post("register-phone")
    public async registerPhone(@Body() data: PhoneData): Promise<BipToPhoneResponse> {
        let phone = data.phone;

        if (!phone || phone.length < 5) {
            throw new ApiError("Invalid phone number", 400);
        }

        phone = "+" + phone.replace(/\D/g, "");

        const isValid = await validatePhone(phone);
        if (!isValid) {
            throw new ApiError("Provider validation fail", 400);
        }

        const response = await registerKeyWord(phone);
        if (response && response.keyword) {
            return {
                keyword: response.keyword,
                minbip: response.minbip,
            };
        } else {
            throw new ApiError("Provider error", 400);
        }
    }

    /** Send SMS to given number for sharing purpose */
    @Hidden()
    @Post("sms")
    public async sendSms(@Body() data: SmsData): Promise<SimpleResponse> {
        if (data.phone && data.message) {
            sendSms(data.phone, data.message);
        }

        return { success: true };
    }
}
