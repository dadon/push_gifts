export interface MinterWallet {
    address: string;
    credentials: string;
    balance?: object;
}

export enum CampaignType {
    Single = "single",
    Mass = "mass",
}

export interface Campaign {
    /**
     * Campaign ID
     */
    campaignId: string;
    /**
     * Type of the campaign<br>
     * Can be 'single' or 'mass'
     */
    type: CampaignType;
    /**
     * Minter wallet address (MxXXXXXX...)
     */
    address: string;
    /**
     * Current balance of campaign wallet in coins
     */
    balance: number;
    /**
     * Date of creation
     */
    created: number;
    /**
     * Minter coin ticker, used for gifts
     * It's determined automatically, when wallet receives coins
     */
    coin?: string;
    /**
     * Price of coin in BIPs
     */
    coinToBip?: number;
    /**
     * Name of your friend, in case of single type<br>
     * Or just internal name of this campaign in case of mass type
     */
    name?: string;

    /**
     * Link to push-wallet
     */
    url?: string;
    /**
     * Your name or name of your brand/company
     */
    brandName?: string;

    /**
     * Password for unlocking gift
     */
    password?: string;

    passwordHint?: string;

    /**
     * ID of recipient of gift
     */
    recipientId?: string;

    // mass only
    /**
     * ID of mass campaign
     */
    campaignPublicId?: string;
    /**
     * Amount of coins per gift
     */
    rewardPerUser?: number;
    /**
     * Value of gift in USD
     */
    rewardPerUserUsd?: number;
    /**
     * Amount of gifts left
     */
    giftNum?: number;
    /**
     * Flag indicating that campaign run out of gifts and needs refill of the balance to continue
     */
    runOutOfGifts?: boolean;

    waitForRefill?: boolean;
    /**
     * Campaign statistics
     */
    stat?: CampaignStat;

    sendFrom?: CampaignSendFrom;
}

export interface CampaignEditableData {
    /**
     * Name of your friend, in case of single type<br>
     * Or just internal name of this campaign in case of mass type
     */
    name?: string;

    /**
     * Your name or name of your brand/company
     */
    brandName?: string;
    /**
     * How many coins each user get in mass type of campaign
     */
    rewardPerUser?: number;
    /**
     * Amount of gifts in mass type of campaign
     */
    giftNum?: number;
    /**
     * Password needed to unlock gift
     */
    password?: string;

    passwordHint?: string;
}

export interface CampaignCreateData {
    /**
     * Type of the campaign<br>
     * Can be 'single' or 'mass'
     */
    type: CampaignType;

    /**
     * Optional user id
     */
    uid?: string;
    /**
     * Settings of this campaign
     */
    data?: CampaignEditableData;

    balance?: number;
    coin?: string;
    sendFrom?: CampaignSendFrom;
}

export interface CampaignSendFrom {
    address: string;
    amount: number;
    txHash?: string;
}

export interface SimpleResponse {
    success: boolean;
    error?: string;
    data?: any;

}


export interface CampaignStat {
    /**
     * Amount of users that visited push wallet web page
     */
    visitorNum: number;
    /**
     * Amount of users that claimed gift via SMS authorization
     */
    usersNum: number;
}

export interface Wallet {
    /**
     * ID of the wallet
     */
    walletId: string;
    /**
     * ID of the campaign
     */
    campaignId: string;
    /**
     * Current wallet balance in coins
     */
    balance: number;
    created: number;
    active: boolean;
    /**
     * User ID
     */
    uid?: string;
    email?: string;
    /**
     * Phone number of user that claimed gift
     */
    phone?: string;
    /**
     * Language, currency, country and IP of user
     */
    localeInfo?: LocaleInfo;

    /**
     * User device info (platform, browser versions etc)
     */
    navigator?: string[];
    /**
     * List of services where user spent his coins
     */
    spendRecords?: PushWalletSpend[];
}

export interface PushWalletSpend {
    /**
     * Minter address where user sent or spent the money
     */
    addressTo: string;
    /**
     * ID of service, where user sent his coins (Time Loop, Bip2Phone, Send)
     */
    type: string;
    /**
     * Payload of Minter transaction (for example - hash of secret for Time Loop)
     */
    payload: string;
    /**
     * Amount of coins spent
     */
    amount: number;
    /**
     * Minter transaction hash
     */
    txHash: string;
}

export interface BlockHandler {
    onBlock: Function;
    init?: Function;
    dispose?: Function;
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

export interface LocaleInfo {
    /**
     * Language set on user's device
     */
    lang?: string;
    /**
     * User IP address
     */
    ip?: string;
    /**
     * Country where user located at this moment
     */
    country?: string;
    /**
     * Currency that is official in country where user is located at this moment
     */
    currency?: string;
}

export interface PriceInfo {
    /**
     * Currency that is used in user's country
     */
    currency: string;
    /**
     * Price for 1 Minter coin in currency
     */
    price: number;
    priceUsd?: number;
}

export interface PublicCampaign {
    /**
     * Campaign ID
     */
    campaignPublicId: string;
    /**
     * Type of the campaign<br>
     * Can be 'single' or 'mass'
     */
    type: CampaignType;
    /**
     * Minter coin ticker
     */
    coin?: string;
    /**
     * Name of recipient, in case of single type<br>
     * Or just internal name of this campaign in case of mass type
     */
    name?: string;
    /**
     * Name of sender
     */
    brandName?: string;
    coinToBip?: number;
    /**
     * Amount of coins in one gift
     */
    rewardPerUser?: number;
    /**
     * Language, currency, country and IP of user
     */
    localeInfo?: LocaleInfo;
    /**
     * Currency and price of one coin in that currency
     */
    priceInfo?: PriceInfo;
    /**
     * Flag, that indicates if campaign run out of balance for gifts
     */
    runOutOfGifts?: boolean;
    active?: boolean;
    passwordHint?: string;
}

export interface WalletCreateData {
    /** Campaign ID */
    campaignPublicId: string;
    /** User ID */
    uid?: string;
    email?: string;
    phone?: string;
    localeInfo?: LocaleInfo;
    navigator?: string[];
}

export interface PublicWallet {
    /** Wallet ID */
    walletId: string;
    /** Wallet balance in coins  */
    balance: number;
    email?: string;
    /** Phone number of user */
    phone?: string;
    /** Campaign object */
    campaign?: PublicCampaign;
    passwordHash?: string;
}

export interface PublicWalletSpendData {
    /** Service name */
    type: string;
    /** Minter address */
    toAddress: string;
    /** Amount of coins */
    amount?: number;
    /** Payload of Minter transaction (for example secret hash for Time Loop top-up */
    payload?: string;
    /** Flag that indicate necessity to convert coins into another type of Minter coins */
    convert?: boolean;
    password?: string;
}

export interface SpendType {
    type: string;
    spendTitle?: string;
    spendAction?: string;
    needPhone?: boolean;
    needAddress?: boolean;
    imageLocalization?: boolean;
    giftCard?: boolean;
    hasLink?: boolean;
    priceUsd?: number;
    address?: string;
    group?: string;
}

export interface GiftCard {
    id?: string;
    spendType: string;
    code: string;
    priceUsd: number;
    userId?: string;
    createTime?: number;
    sellTime?: number;
    link?: string;
    group?: string;
}
