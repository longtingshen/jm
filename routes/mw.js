
const CryptoJS = require("crypto-js")

function i(e) {
  const t = e.sigBytes, r = e.words, n = new Uint8Array(t);
  for (var a = 0, s = 0; a != t;) {
    var o = r[s++];
    if (n[a++] = (4278190080 & o) >>> 24, a == t) break;
    if (n[a++] = (16711680 & o) >>> 16, a == t) break;
    if (n[a++] = (65280 & o) >>> 8, a == t) break;
    n[a++] = 255 & o
  }
  return n
}

function d(r, n, a) {
  let s = r, o = CryptoJS.enc.Utf8.parse(n), l = CryptoJS.lib.WordArray.create(s),
    f = i(CryptoJS.AES.decrypt({ ciphertext: l }, o, { iv: o, padding: CryptoJS.pad.Pkcs7 })), p = "";
  return f;
}

async function mwFetch(url) {
  const 不要梯子 = ["mwcomic3.online"]
  let s = "my2ecret782ecret";
  const res = await fetch(url.replace("manwa.me", 不要梯子[0]));
  const blob = await res.blob();
  const bytes = await blob.arrayBuffer();
  return d(bytes, s, !0);
}


module.exports = mwFetch;