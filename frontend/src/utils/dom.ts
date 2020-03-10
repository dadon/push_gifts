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

// @ts-ignore c
let mobile: boolean = undefined;

export function isMobile() {
    if (mobile === undefined) {
        mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Mobile/i.test(
            navigator.userAgent,
        );
    }

    return mobile;
}

export function selectAllAndCopy(el: any) {
    // Copy textarea, pre, div, etc.

    // @ts-ignore c
    if (document.body.createTextRange) {
        // IE
        // @ts-ignore c
        const textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.select();
        textRange.execCommand("Copy");
        return true;
    } else if (window.getSelection && document.createRange) {
        // non-IE
        const editable = el.contentEditable; // Record contentEditable status of element
        const readOnly = el.readOnly; // Record readOnly status of element
        el.contentEditable = true; // iOS will only select text on non-form elements if contentEditable = true;
        el.readOnly = true; // iOS will not select in a read only form element // Version 1.2c - Changed from false to true; Prevents keyboard from appearing when copying from textarea

        const range = document.createRange();
        range.selectNodeContents(el);

        const sel = window.getSelection();
        // @ts-ignore c
        sel.removeAllRanges();
        // @ts-ignore c
        sel.addRange(range); // Does not work for Firefox if a textarea or input

        if (el.nodeName == "TEXTAREA" || el.nodeName == "INPUT")
            el.select(); // Firefox will only select a form element with select()

        //if (el.setSelectionRange && navigator.userAgent.match(/ipad|ipod|iphone/i)) // Version 1.2c - iOS 12 might be defaulting to desktop mode so removed

        if (el.setSelectionRange) // Version 1.2c - iOS 12 might be defaulting to desktop mode and no longer has iphone in user agent
            el.setSelectionRange(0, 999999); // iOS only selects "form" elements with SelectionRange

        el.contentEditable = editable; // Restore previous contentEditable status
        el.readOnly = readOnly; // Restore previous readOnly status

        if (document.queryCommandSupported("copy")) {
            return document.execCommand("copy");
        } else {
            if (!navigator.userAgent.match(/ipad|ipod|iphone|android|silk/i))
                return false;
        }
    }
}

export function getWindowWidth() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
}

export function getWindowHeight() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}

export function getWindowMinHeight() {
    return Math.min(document.documentElement.clientHeight, window.innerHeight || 0);
}

export function getLocale(): string {
    let locale = "en";

    const params: any = getSearchParams();
    if (params && params["locale"]) {
        locale = params["locale"];
    } else {
        if (navigator.languages && navigator.languages.length) {
            locale = navigator.languages[0];
        }
    }

    return locale;
}
