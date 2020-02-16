import { sleep } from "../utils";


const redis = require("redis");
const { promisify } = require("util");

let client = redis.createClient({ host: process.env.REDIS_HOST });
client.on("error", (err) => console.error("Redis error: ", err));

const get = promisify(client.get).bind(client);
const set = promisify(client.set).bind(client);
const exists = promisify(client.exists).bind(client);
const del = promisify(client.del).bind(client);
const rpush = promisify(client.rpush).bind(client);
const lrem = promisify(client.lrem).bind(client);
const lrange = promisify(client.lrange).bind(client);
const llen = promisify(client.llen).bind(client);
const sadd = promisify(client.sadd).bind(client);
const smembers = promisify(client.smembers).bind(client);



const PREFIX = process.env.REDIS_PREFIX || "minterpush";

export default {
    get,
    set,
    del,
    exists,
    rpush,
    lrange,
    lrem,
    sadd,
    smembers,

    buildKey(...keys: string[]): string {
        return [PREFIX, ...arguments].join(":");
    },

    async getList(key: string) {
        const len = await llen((key));
        if (!len) return [];
        return lrange(key, 0, len);
    },

    async getData(key: string): Promise<any> {
        let data = null;

        try {
            data = await get(key);
        } catch (e) {

        }

        if (data) {
            data = JSON.parse(data);
        }

        return data;
    },

    async setData(key: string, data: any, expire: number = 0): Promise<void> {
        const payload = JSON.stringify(data);

        if (expire) {
            await set(key, payload, "EX", expire);
        } else {
            await set(key, payload);
        }
    },
};
