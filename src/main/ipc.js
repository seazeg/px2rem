const fs = require('fs');
const path = require('path');
const dirpath = require('./dir').dirpath;
const {
    ipcMain,
    dialog
} = require('electron');

//打开文件
ipcMain.on('open-message', function (e, arg) {
    dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory']
    }, function (files) {
        if (files) {
            var f = files[0];
            var filePath = f.replace(f.split('/')[f.split('/').length-1],"");
            fileDisplay(filePath, function (fileList) {
                e.sender.send('files-reply', fileList);
            });
        }
    })
});

//拖入文件
ipcMain.on('files-message', function (e, arg) {
    let filePath = path.resolve(dirpath);
    filePath = (JSON.parse(arg)).filePath;
    fileDisplay(filePath, function (fileList) {
        // e.sender.send('files-reply', fileList);
        console.log('list',fileList);
        handle(fileList,'p2r')
    });
});


function fileDisplay(filePath, callback) {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.warn(err)
        } else {
            //遍历读取到的文件列表
            let list = []
            files.forEach(function (filename) {
                //获取当前文件的绝对路径
                let filedir = path.join(filePath, filename);
                let isCSS = function () {
                    let res = false;
                    let imgType = ['css','CSS'];
                    for (let i in imgType) {
                        if (filename.split(".")[1] == imgType[i]) {
                            res = true
                        }
                    }
                    return res
                }
                if (isCSS()) {
                    list.push(filedir)

                }
            });
            callback(list);
        }
    });
}


function handle(list,type){
        let _this = this;
        let source = list[0];
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
                        }else {
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
            console.log(res);
            saveContent(res,source+'_ccc')
        }

}


//读取文本文件
function readContent(file) {
    const fs = require('fs');
    return fs.readFileSync(file, 'utf8');
}
//保存文本内容到文件
function saveContent(text, file) {
    const fs = require('fs');
    fs.writeFileSync(file, text);
}