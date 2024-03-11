/*
async function f1(url) {
    let op = {
        // method : 'POST',
        // body : data,
        headers : {
           
            "Cookie":"__51cke__=; PHPSESSID=pcm42sain4g0slk531qneuk455; __tins__21640379=%7B%22sid%22%3A%201698643405372%2C%20%22vd%22%3A%202%2C%20%22expires%22%3A%201698645208708%7D; __51laig__=15"
        }
    }
    const res = await fetch(url,op);
    const blob = await res.blob();
    const bytes = await blob.arrayBuffer();
    return bytes;
}

async function f2(url,data) {
    let op = {
        method : 'POST',
        body : data,
        headers : {
            "Content-Type" : "text/plain" 
        }
    }
    let res = await fetch(url, op);
    res = await res.text()
    return res;
}
*/

async function f1(url) {
    let hp = {
        headers: {

            "Cookie": "__51cke__=; PHPSESSID=pcm42sain4g0slk531qneuk455; __tins__21640379=%7B%22sid%22%3A%201698643405372%2C%20%22vd%22%3A%202%2C%20%22expires%22%3A%201698645208708%7D; __51laig__=15"
        }
    }
    const res = await fetch(url, hp);
    const blob = await res.blob();
    const bytes = await blob.arrayBuffer();
    const data = Buffer.from(bytes).toString('base64')
    return data;
}

async function f2(url, data) {
    /*百度OCR
    b64 = 'data%3Aimage%2Fjpeg%3Bbase64%2C' + encodeURIComponent(b64);
    let json = await f2('https://ai.baidu.com/aidemo', b64)
    let type=[
        'general_basic',
        'accurate_basic',
        'webimage'
       ]
    let op = {
        method: 'POST',
        body: `image=${data}&image_url&type=https%3A%2F%2Faip.baidubce.com%2Frest%2F2.0%2Focr%2Fv1%2F${type[1]}&detect_direction&language_type=ENG`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Referer": "https://ai.baidu.com/aidemo"
        }
    }
    let res = await fetch(url, op);
    res = await res.json()
    return res;
    */
    let op = {
        method: 'POST',
        body: data,
        headers: {
            "Content-Type": "text/plain"
        }
    }
    let res = await fetch(url, op);
    res = await res.text()
    return res;
}
module.exports = {
    f1,
    f2
};
