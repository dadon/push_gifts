import * as db from "../db/background";
import * as minter from "../external_api/minter";
import { BlockHandler } from "../types";


export async function run(handlers: BlockHandler[]) {
    const lastSavedBlock = await db.getLastBlock();
    const lastBlock = await minter.getCurrentBlock();

    let currentBlock = lastSavedBlock;
    console.log("currentBlock ", currentBlock, lastBlock);

    let processedBlocks = 0;

    for (let handler of handlers) {
        if (handler.init) {
            await handler.init();
        }
    }

    while (currentBlock < lastBlock) {
        const block = await minter.getBlock(currentBlock);

        for (let handler of handlers) {
            await handler.onBlock(block);
        }

        currentBlock++;
        processedBlocks++;

        if (processedBlocks > 50) {
            await db.setLastBlock(currentBlock);
            processedBlocks = 0;
        }
    }

    for (let handler of handlers) {
        if (handler.dispose) {
            await handler.dispose();
        }
    }

    await db.setLastBlock(currentBlock);
}
