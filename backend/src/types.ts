
export const REQUEST_GET: string = "GET";
export const REQUEST_POST: string = "POST";

export interface Wallet {
    address: string;
    credentials: string;
}

export interface Campaign {
    campaignId: string;
    campaignPublicId: string;
    name?: string;
    brandName?: string;
    address: string;
    coin?: string;
    balance: number;
    rewardPerUser: number;
    rewardPerUserUsd?: number;
    coinToBip?: number;
    created: number;
}

export interface User {
    userId: string;
    campaignId: string;
    balance: number;
    email?: string;
    phone?: string;
    userLocale?: object;
    navigator?: string[];
    created: number;
    active: boolean;
    spendRecords?: UserSpend[];
}

export interface CampaignRefill {
    campaignId: string;
    txHash?: string;
    txFrom?: string;
    amount: number;
    coin: string;
    created: number;
}

export interface UserSpend {
    addressTo: string;
    type: string;
    payload: string;
    amount: number;
    txHash: string;
}

export interface BlockHandler {
    onBlock: Function;
    init?: Function;
}

export interface CoinConvertRecord {
    convertId: string;
    addressFrom: string;
    addressTo: string;
    coinTo: string;
    coinFrom: string;
    amount: number;
    payload?: string;
    convertHash?: string;
    sendHash?: string;
}
