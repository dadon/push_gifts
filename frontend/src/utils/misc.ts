

export function parseQueryString(queryString: string): object {
    let params = {};

    try {
        params = JSON.parse(
            '{"' +
            decodeURI(queryString)
                .replace(/"/g, '\\"')
                .replace(/&/g, '","')
                .replace(/=/g, '":"') +
            '"}'
        );
    } catch (e) {
        console.error(e);
    }

    return params;
}

export function sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms));
}
