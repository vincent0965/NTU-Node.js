const util = require('util');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);
//建立資料夾
(
    async function() {
        let strjson = await fs.readFileSync('downloads/line_stickers.json', { encoding: 'utf-8' });
        //讀取資料夾內的json檔
        let arr = JSON.parse(strjson);
        if (!await fs.existsSync(`downloads/line-stickers`)) {
            await fs.mkdirSync(`downloads/line-stickers`, { recursive: true }); //遞迴建立資料夾
        }
        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i]);
            await exec(`curl -k -X GET ${arr[i]} -o "downloads/line-stickers/${i}.png" `);
        }
    }
)();