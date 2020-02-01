export class ServiceError extends Error {
    constructor(type: string, extra?: object) {
        super(`ServiceError ${type}\n ${JSON.stringify(extra, null, 2)}`);
    }
}
