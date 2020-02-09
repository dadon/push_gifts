import axios from "axios";
import { getUserId } from "@/utils/user_id";


export async function get(endpoint: string): Promise<any> {
    const url = `${process.env.VUE_APP_API}/${endpoint}`;

    const userId = getUserId();

    const response = await axios.get(url, {
        params: {
            uid: userId,
        },
    });

    if (response.status === 200) {
        return response.data;
    }

    return null;
}

export async function post(endpoint: string, data: any): Promise<any> {
    const url = `${process.env.VUE_APP_API}/${endpoint}`;

    data["uid"] = getUserId();
    data["navigator"] = [
        navigator.platform,
        navigator.userAgent,
        navigator.appVersion,
        navigator.vendor,
    ];

    const response = await axios.post(url, data);

    if (response.status === 200) {
        return response.data;
    }

    return null;
}

