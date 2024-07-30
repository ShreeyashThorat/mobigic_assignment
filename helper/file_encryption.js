import crypto from 'crypto';


const algorithm = 'aes-256-cbc';
const ivLength = 16;

function generateKey(password) {
    return crypto.scryptSync(password, 'salt', 32);
}

function encryptFile(buffer, password) {
    const iv = crypto.randomBytes(ivLength);
    const key = generateKey(password);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    return Buffer.concat([iv, encrypted]);
}

function decryptFile(buffer, password) {
    const iv = buffer.slice(0, ivLength);
    const encrypted = buffer.slice(ivLength);
    const key = generateKey(password);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted;
}

export { encryptFile, decryptFile };
