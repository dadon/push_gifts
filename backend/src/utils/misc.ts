export function isObject(obj: any): Boolean {
    return obj === Object(obj);
}

export function sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
}
