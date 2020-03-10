import Telegraf from "telegraf";
import { createWallet, getWalletByKey, setWalletByKey } from "./db/minter_wallet";
import { parseAmount } from "./external_api/minter";
import { createCampaign } from "./db/campaign";
import { CampaignType } from "./types";


const createMessageText = data => {
    return `<strong>Click the button to spend your coins</strong>`;
};


export default function run() {
    console.log("bot run", process.env.BOT_TOKEN);

    const bot = new Telegraf(process.env.BOT_TOKEN);

    bot.start(async ctx => {
        const userId = ctx.message.from.id.toString();
        let wallet = await getWalletByKey(userId);
        if (!wallet) {
            wallet = await createWallet();
            await setWalletByKey(userId, wallet);
        }

        return ctx.reply(`<pre>${wallet.address}</pre>`, {
            parse_mode: "HTML",
        });
    });

    bot.on("inline_query", async ctx => {
        console.log("inline_query", ctx.inlineQuery);

        const userId = ctx.inlineQuery.from.id;
        const query = ctx.inlineQuery.query;
        const queryAmount: number = parseFloat(query);
        const extra = {
            cache_time: 0,
            is_personal: true
        };

        if (!queryAmount) {
            ctx.answerInlineQuery([], extra);
            return;
        }

        const wallet = await getWalletByKey(userId.toString());
        if (!wallet || !wallet.balance) {
            ctx.answerInlineQuery([], extra);
            return;
        }

        const campaigns = [];
        for (let coin in wallet.balance) {
            const amount = parseAmount(wallet.balance[coin]);
            if (amount >= queryAmount) {
                // create campaign
                const campaign = await createCampaign({
                    type: CampaignType.Single,
                    balance: queryAmount - 0.01,
                    sendFrom: {
                        address: wallet.address,
                        amount: queryAmount - 0.01,
                    },
                    coin: coin,
                });
                campaigns.push(campaign);
            }
        }

        // console.log("campaigns", JSON.stringify(campaigns));

        const results = [];

        for (let campaign of campaigns) {
            results.push({
                id: campaign.campaignId,
                type: "article",
                title: `Send ${queryAmount} ${campaign.coin} to current chat`,
                thumb_url: "https://pushgifts.avallon.im/favicon.png",
                input_message_content: {
                    message_text: createMessageText({ amount: queryAmount, coin: campaign.coin }),
                    parse_mode: "HTML"
                },
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: `Get ${queryAmount} ${campaign.coin}`,
                                url: campaign.url
                            }
                        ]
                    ]
                }
            })
        }

        // console.log("results", JSON.stringify(results));

        ctx.answerInlineQuery(results, extra);
    });

    bot.launch();
}
