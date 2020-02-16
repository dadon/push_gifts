import crypto from "crypto";


const IV_LENGTH = 16; // For AES, this is always 16

export function encrypt(text: string, encryptionKey: string): string {
    checkEncryptionKeyLength(encryptionKey);

    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(encryptionKey), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function decrypt(text: string, encryptionKey: string): string {
    checkEncryptionKeyLength(encryptionKey);

    let textParts = text.split(":");
    let iv = Buffer.from(textParts.shift(), "hex");
    let encryptedText = Buffer.from(textParts.join(":"), "hex");
    let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(encryptionKey), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}

export function sign(payload: string, privateKey: string): string {
    const signerObject = crypto.createSign("RSA-SHA512");
    signerObject.update(payload);
    return signerObject.sign(privateKey, "base64");
}

export function checkSign(payload: string, signature: string, publicKey: string): boolean {
    const verifierObject = crypto.createVerify("RSA-SHA512");
    verifierObject.update(payload);
    return verifierObject.verify(publicKey, signature, "base64");
}

export function sha256(message: string) {
    return crypto.createHash('sha256').update(message).digest('hex');
}

function checkEncryptionKeyLength(encryptionKey: string) {
    if (encryptionKey.length !== 32) {
        throw "encryption key must be 256 bits (32 characters)";
    }
}
