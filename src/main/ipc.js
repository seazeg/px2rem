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
    e.sender.send('files-reply', JSON.parse(arg));
});





