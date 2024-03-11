const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const crypto = require('crypto');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');



function get_num(aid, index) {
    let normalCutNum = 10; // 默认切割数
    let aIndex = aid + index; // aid和index

    // 使用crypto模块进行MD5计算
    aIndex = crypto.createHash('md5').update(String(aIndex)).digest('hex').substr(-1).charCodeAt(); // md5编码后 取最后一位 获取所在unicode码表位置

    // 根据aid的范围修改aIndex
    if (aid >= 268850 && aid <= 421925) {
        aIndex %= 10; // 如果 aid 大于等于 268850 且小于等于 421925，则将 aIndex 更新为除以 10 的余数
    } else if (aid >= 421926) {
        aIndex %= 8; // 如果 aid 大于等于 421926，则将 aIndex 更新为除以 8 的余数
    }

    // 基于aIndex的值来更新normalCutNum
    switch (aIndex) {
        case 0:
            normalCutNum = 2;
            break;
        case 1:
            normalCutNum = 4;
            break;
        case 2:
            normalCutNum = 6;
            break;
        case 3:
            normalCutNum = 8;
            break;
        case 4:
            normalCutNum = 10;
            break;
        case 5:
            normalCutNum = 12;
            break;
        case 6:
            normalCutNum = 14;
            break;
        case 7:
            normalCutNum = 16;
            break;
        case 8:
            normalCutNum = 18;
            break;
        case 9:
            normalCutNum = 20
            break;
    }
    return normalCutNum;
}


function onImageLoaded(img, aid, index, img_path) {
    const imgNaturalWidth = img.width;
    const imgNaturalHeight = img.height;

    const canvas = createCanvas(imgNaturalWidth, imgNaturalHeight);
    const ctx = canvas.getContext('2d');
    let cutNum = get_num(aid.toString(), index);
    let _unknown = parseInt(imgNaturalHeight % cutNum);

    //重画
    for (let m = 0; m < cutNum; m++) {
        var cutHeight = Math.floor(imgNaturalHeight / cutNum);
        let yCoordinate = cutHeight * m;
        let endCoordinate = imgNaturalHeight - cutHeight * (m + 1) - _unknown;
        if (m === 0) {
            cutHeight += _unknown;
        } else {
            yCoordinate += _unknown;
        }
        ctx.drawImage(img, 0, endCoordinate, imgNaturalWidth, cutHeight, 0, yCoordinate, imgNaturalWidth, cutHeight);
    }

    const dataUrl = canvas.toDataURL();
    const img_buffer = Buffer.from(dataUrl.split(';base64,').pop(), 'base64');
    fs.unlinkSync(img_path);
    return img_buffer;
}

async function jmFetch(url, aid, index) {

    let urli = url.split(/\/media/)[1];
    url = "https://cdn-msp.18comic-palworld.vip/media" + urli;
    const res = await fetch(url);
    const arrayBuffer = await res.arrayBuffer();
    buffer = Buffer.from(arrayBuffer);
    let img_path = `./public/img/${uuidv4()}.jpg`
    try {
        await sharp(buffer).toFile(img_path);
    } catch (err) {
        console.log(err);
    }
    img = fs.readFileSync(img_path);
    img = await loadImage(img);
    let img_buffer = onImageLoaded(img, aid, index, img_path);

    return img_buffer;
}

module.exports = jmFetch;