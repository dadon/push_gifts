import { Request } from "express";
import { getCurrencyCodeByCountryCode } from "./currency";


const geoip = require("geoip-country");

export function getLanguageFromRequest(req: Request): string {
    const header = req.headers["accept-language"];
    if (header) {
        return header.split(";")[0];
    }
    return null;
}

export function getIpFromRequest(req): string {
    return (req.headers["x-forwarded-for"] || req.connection.remoteAddress || "").split(",")[0].trim();
}

export function getUserLocaleRequest(req): object {
    const result = {};
    result["lang"] = getLanguageFromRequest(req);
    result["ip"] = getIpFromRequest(req);

    const country = geoip.lookup(result["ip"]);
    if (country) {
        result["country"] = country["country"];
        result["currency"] = getCurrencyCodeByCountryCode(result["country"]);
    }

    return result;
}
