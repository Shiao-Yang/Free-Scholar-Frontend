import CryptoJS from 'crypto-js';

var cryptoJSObj = {

    /* 加密 */
    encryptFunc: (message) => {
        var key = '12345678900';//前后端约定好的秘钥
        var keyHex = CryptoJS.enc.Utf8.parse(key);
        var encrypted = CryptoJS.AES.encrypt(message, keyHex, {

            mode: CryptoJS.mode.ECB,

            padding: CryptoJS.pad.Pkcs7
        });

        return encrypted.toString();
    },
}
// export * from "assert/js";
// export cryptoJSOjb;


