import { BlockHandler, CoinConvertRecord } from "../types";
import { getConvertRecords, send } from "../db/coin_convert";

class CoinConvert implements BlockHandler {
    convertHashes: string[];
    records: CoinConvertRecord[];

    async init() {
        this.records = await getConvertRecords();
        this.convertHashes = this.records.map(el => el.convertHash);
    }

    async onBlock(block) {
        for (let tx of block.transactions) {
            // TODO: validate tx

            if (this.convertHashes.indexOf(tx.hash) !== -1) {
                await this.convertSuccess(tx.hash);
            }
        }
    }

    getRecordByHash(hash: String) {
        for (let rec of this.records) {
            if (rec.convertHash === hash || rec.sendHash === hash) {
                return rec;
            }
        }

        return null;
    }

    convertSuccess(hash: string) {
        const rec = this.getRecordByHash(hash);
        return send(rec);
    }
}

export default new CoinConvert();
