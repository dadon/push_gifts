export class ServiceError extends Error {
    constructor(type: string, extra?: object) {
        super(`ServiceError ${type}\n ${JSON.stringify(extra, null, 2)}`);
    }
}

export class ApiError extends Error {
    constructor(
        message: string,
        public readonly status = 500,
    ) {
        super(message);
    }
}
