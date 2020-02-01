const generate = require("nanoid/generate");

const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export default (length: number = 16) => generate(alphabet, length);
