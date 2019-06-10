const path = require('path');
const dirpath = require('./dir').dirpath;
const {
    ipcMain
} = require('electron');

//拖入文件
ipcMain.on('files-message', function (e, arg) {
    let filePath = path.resolve(dirpath);
    filePath = (JSON.parse(arg)).filePath;
    e.sender.send('files-reply', JSON.parse(arg));
});





