import { generateWallet, walletFromMnemonic } from "minterjs-wallet";

import rdb from "./rdb";
import { Wallet } from "../types";
import { decrypt, encrypt } from "../utils";

export async function createWallet(): Promise<Wallet> {
    const newWallet = generateWallet();
    const wallet: Wallet = {
        address: newWallet.getAddressString(),
        credentials: encrypt(newWallet.getMnemonic(), process.env.ENCRYPTION_KEY),
    };

    await rdb.setData(rdb.buildKey("wallet", wallet.address), wallet);

    return wallet;
}

export async function getWalletKey(address: string): Promise<string> {
    const wallet: Wallet = await rdb.getData(rdb.buildKey("wallet", address));

    if (!wallet) return null;

    const mnemonic = decrypt(wallet.credentials, process.env.ENCRYPTION_KEY);
    const minterWallet = walletFromMnemonic(mnemonic);
    return minterWallet.getPrivateKeyString();
}
