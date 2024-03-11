const CryptoJS = require("crypto-js");
const crypto = require("crypto");

async function zdFetch(url) {
    let urls = `http://s.pjxhmy.com/v4/1/lists.api?keyword=${url}&form=1`;
    const res = await fetch(urls, { headers });
    const data = await res.json();
    //console.log(blob);
    //const bytes = await blob.arrayBuffer();
    return ap(data.data.content);
}


//headers
let headers = (() => {
    var ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D167 Safari/9537.53";
    var time = Math.round(new Date() / 1000);
    var sign = crypto.createHash('md5').update("com.ruffianhankin.meritreader1" + time + "vhjJVz1St6tK7!8n#B0MqRIuE2Dh7!C#").digest('hex');
    var pt = "1";
    var Content = "text/html; charset=UTF-8";
    var Connection = "close";
    var Accept = "*/*";
    var Origin = "*";
    var Headers = "X-Requested-With";
    var Vary = "Accept-Encoding";
    var package = "com.ruffianhankin.meritreader";
    var version = "3.8.6";
    var channel = "baidu_tg104";
    var Cache = "no-cache, no-store";
    var headers = {
        "Content-Type": Content,
        "Connection": Connection,
        "Accept": Accept,
        "Access-Control-Allow-Origin": Origin,
        "Access-Control-Allow-Headers": Headers,
        "Vary": Vary,
        "User-Agent": ua,
        "package": package,
        "pt": pt,
        "version": version,
        "channel": channel,
        "time": String(time),
        "sign": String(sign),
        "Cache-Control": Cache
    };
    return headers
}
)()



function ap(base64Str) {

    let dataBytes = Buffer.from(base64Str, "base64");

    let enData = Buffer.from(dataBytes.slice(16, dataBytes.length - 16));

    //key
    function k(k) {
        const bufferKey = CryptoJS.SHA256(CryptoJS.lib.WordArray.create(k));
        const hexKey = bufferKey.toString(CryptoJS.enc.Hex);
        const key = Buffer.from(hexKey, "hex");
        return key
    }
    let key = k(dataBytes.slice(0, 16))

    //iv
    function ivBytes(bytes) {
        const wordArray = CryptoJS.lib.WordArray.create(bytes);
        const hash = CryptoJS.MD5(wordArray);
        const encode = hash.toString(CryptoJS.enc.Hex);
        let bytes2 = Buffer.from(encode);
        let bArr = new Uint8Array(16);
        for (let i = 0; i < 16; i++) {
            let xorResult = bytes2[i] ^ bytes[i];
            bArr[i] = xorResult ^ -1;
        }
        return bArr;
    }
    let iv = Buffer.from(ivBytes(dataBytes.slice(-16)));


    //解密
    function aesDecrypt(enData, key, iv) {
        let wordArray = CryptoJS.enc.Base64.parse(Buffer.from(enData).toString('base64'));
        let decrypt = CryptoJS.AES.decrypt({ ciphertext: wordArray }, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })
        return decrypt.toString(CryptoJS.enc.Utf8)
    }

    function aesDecrypt(enData, key, iv) {
        let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
        let decrypted = decipher.update(enData);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString("utf8");
    };
    const deData = aesDecrypt(enData, key, iv);
    return deData
}


module.exports = zdFetch;