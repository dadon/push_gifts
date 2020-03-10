import { generateWallet, walletFromMnemonic } from "minterjs-wallet";

import rdb from "./rdb";
import { MinterWallet } from "../types";
import { decrypt, encrypt } from "../utils";

export async function createWallet(): Promise<MinterWallet> {
    const newWallet = generateWallet();
    const wallet: MinterWallet = {
        address: newWallet.getAddressString(),
        credentials: encrypt(newWallet.getMnemonic(), process.env.ENCRYPTION_KEY),
    };

    await rdb.setData(rdb.buildKey("wallet", wallet.address), wallet);

    return wallet;
}

export async function getWallet(address: string): Promise<MinterWallet> {
    return rdb.getData(rdb.buildKey("wallet", address));
}

export async function saveWallet(wallet: MinterWallet) {
     return rdb.setData(rdb.buildKey("wallet", wallet.address), wallet);
}

export async function getWalletKey(address: string): Promise<string> {
    const wallet: MinterWallet = await rdb.getData(rdb.buildKey("wallet", address));

    if (!wallet) return null;

    const mnemonic = decrypt(wallet.credentials, process.env.ENCRYPTION_KEY);
    const minterWallet = walletFromMnemonic(mnemonic);
    return minterWallet.getPrivateKeyString();
}

export async function getWalletMnemonic(address: string): Promise<string> {
    const wallet: MinterWallet = await rdb.getData(rdb.buildKey("wallet", address));

    if (!wallet) return null;

    return decrypt(wallet.credentials, process.env.ENCRYPTION_KEY);
}

export async function getAllWallets() {
    const keys = await rdb.keys(rdb.buildKey("wallet:*"));
    if (!keys || !keys.length) return [];
    return keys.map(key => key.split(":").pop());
}

export async function getWalletByKey(key: string): Promise<MinterWallet> {
    const address = await rdb.get(rdb.buildKey("walletkey", key));
    if (address) {
        return getWallet(address);
    }
    return null;
}

export async function setWalletByKey(key: string, wallet: MinterWallet) {
    await rdb.set(rdb.buildKey("walletkey", key), wallet.address);
}
