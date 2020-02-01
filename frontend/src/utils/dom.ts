import { parseQueryString } from "@/utils/misc";


export function getSearchParams(): object {
    return parseQueryString(window.location.search.substring(1));
}

export async function sha256(message: string) {
    const msgUint8 = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}
