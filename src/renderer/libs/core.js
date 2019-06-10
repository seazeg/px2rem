import {
    ipcRenderer
} from 'electron';
import fs from 'fs';


ipcRenderer.on('files-reply', function (event, arg) {
    let list = [];
    for (let item of arg) {
        let filepath = item.filePath.replace(/\\/g, "/")
        if(vm.$children[0]._data.buttonName == 'PX→REM'){
            converter(filepath,'p2r')
        }else{
            converter(filepath,'r2p')
        }
      
    }
});

function converter(file,type) {
    let source = readContent(file);
    let ratio = 100;
    if (source) {
        source = $.format(source, {
            method: "css"
        }); // 都转换成多行来比较
        let arr = source.split("\n");
        let len = arr.length;
        let res = '';
        if (type == 'p2r') {
            for (let i = 0; i < len; i++) {
                let line = arr[i];
                res += line.replace(/([1-9]\d*.\d*|0.\d*[1-9]\d*|\d*[1-9]\d*)px/g, function (px) {
                    if (!!px) {
                        if (!/border:/ig.test(line)) {
                            return (parseFloat(px) / parseInt(ratio)) + "rem";
                        } else {
                            return px;
                        }
                    } else {
                        return px;
                    }
                }) + "\n";
            }
        } else if (type == 'r2p') {
            for (let i = 0; i < len; i++) {
                let line = arr[i];
                res += line.replace(/([1-9]\d*.\d*|0.\d*[1-9]\d*|\d*[1-9]\d*)rem/g, function (rem) {
                    if (!!rem) {
                        if (!/border:/ig.test(line)) {
                            return (parseFloat(rem) * parseInt(ratio)) + "px";
                        } else {
                            return rem;
                        }
                    } else {
                        return rem;
                    }
                }) + "\n";
            }
        }

        if (len > 1) {
            res = $.format(res, {
                method: "css"
            });
        } else {
            res = $.format(res, {
                method: "cssmin"
            });
        }
        saveContent(res,  `${file.split('.')[0]}_ie8.css`)
    }

}

//读取文本文件
function readContent(file) {
    return fs.readFileSync(file, 'utf8');
}
//保存文本内容到文件
function saveContent(text, file) {
    fs.writeFileSync(file, text);
}