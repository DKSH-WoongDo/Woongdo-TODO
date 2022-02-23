import CryptoJS from 'crypto-js';
import { ENCRYPT_KEY } from '../config';

const cryptoHandle = {
    SHA256: (item) => {
        if (typeof item === 'string')
            return CryptoJS.SHA256(item).toString(CryptoJS.enc.Hex);
        return null;
    },
    AES_ENC: (item) => {
        if (typeof item === 'string')
            return CryptoJS.AES.encrypt(item, ENCRYPT_KEY).toString();
        return null;
    }
}

export default cryptoHandle;