const CryptoJS = require("crypto-js")

const toByteArray = (wordArray) => {
  let words = wordArray.words;
  let sigBytes = wordArray.sigBytes;
  let byteArray = new Uint8Array(sigBytes);
  for (let i = 0; i < sigBytes; i++) {
    byteArray[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
  }
  return byteArray;
};

//解密函数
const decrypt3DES = (data) => {
  let key = CryptoJS.enc.Utf8.parse("OW84U8Eerdb99rtsTXWSILDO");
  let iv = CryptoJS.enc.Utf8.parse("SK8bncVu");
  let wordArray = CryptoJS.lib.WordArray.create(data);
  let dataBase64 = wordArray.toString(CryptoJS.enc.Base64);
  let decBytes = CryptoJS.TripleDES.decrypt(dataBase64, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  let decrypted = toByteArray(decBytes);
  return decrypted;
};

//异步请求
async function bqgFetch(url) {
    const res = await fetch(url);
    const blob = await res.blob();
    const bytes = await blob.arrayBuffer();
    return decrypt3DES(bytes);
}
let aaa = "123"
module.exports = bqgFetch;