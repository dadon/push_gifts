export enum CampaignType {
    Single = "single",
    Mass = "mass",
}

export interface Wallet {
    address: string;
    credentials: string;
}

export interface Campaign {
    campaignId: string;
    type: CampaignType;
    address: string;
    balance: number;
    created: number;

    coin?: string;
    coinToBip?: number;
    name?: string;
    brandName?: string;

    // single only
    password?: string;
    recipientId?: string;

    // mass only
    campaignPublicId?: string;
    rewardPerUser?: number;
    rewardPerUserUsd?: number;
    giftNum?: number;
    runOutOfGifts?: boolean;
    waitForRefill?: boolean;
    stat?: CampaignStat;
}


export interface CampaignStat {
    visitorNum: number;
    usersNum: number;
}

export interface User {
    userId: string;
    campaignId: string;
    balance: number;
    created: number;
    active: boolean;

    uid?: string;
    email?: string;
    phone?: string;

    userLocale?: object;
    navigator?: string[];

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
