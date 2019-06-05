import {
    ipcRenderer,
    remote
} from 'electron';
const {
    dialog
} = remote;

let isSaved = true;
let path = null;
let name = null;
let currentInfoFile = null;
let currentHtmlFile = null; //当前文档保存的路径
let currentCssFile = null; //当前文档保存的路径
let html = document.getElementById('html');
let css = document.getElementById('css');

document.title = "Html2CSS"; //设置文档标题，影响窗口标题栏名称

setTimeout(() => {
    sourceEditor.on('changes', function (cm, ins) {
        if (isSaved && !document.title.includes('*')) document.title += " *";
        isSaved = false;
    })
    resultEditor.on('changes', function (cm, ins) {
        if (isSaved && !document.title.includes('*')) document.title += " *";
        isSaved = false;
    })
}, 100);

//监听与主进程的通信
ipcRenderer.on('action', (event, arg) => {
    switch (arg) {
        case 'new': //新建文件
            askSaveIfNeed();
            document.title = "Html2CSS";
            currentInfoFile = null;
            currentHtmlFile = null;
            currentCssFile = null;
            htmlEditor.setValue(``);
            cssEditor.setValue(``);
            isSaved = true;
            break;
        case 'open': //打开文件
            askSaveIfNeed();
            const files = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
                filters: [{
                        name: "Text Files",
                        extensions: ['h2s']
                    },
                    {
                        name: 'All Files',
                        extensions: ['*']
                    }
                ],
                properties: ['openFile']
            });
            if (files) {
                currentInfoFile = files[0]
                let path = files[0].split('/').splice(0, files[0].split('/').length - 1).join('/');
                let name = (files[0].split('/').splice(files[0].split('/').length - 1, 1))[0].split('.')[0];
                console.log(name);
                htmlEditor.setValue(readContent(`${path}/${name}.html`));
                cssEditor.setValue(readContent(`${path}/${name}.css`));

                document.title = `Html2CSS - ${name} - ${path}`;
                isSaved = true;
            }
            break;
        case 'save':
            saveCurrentDoc();
            break;
        case 'importHTML':
            importFile('html');
            break;
        case 'importCSS':
            importFile('css');
            break;
        case 'exportHTML':
            exportFile('html')
            break;
        case 'exportCSS':
            exportFile('css')
            break;
    }
});

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

//导入文件
function importFile(type) {
    if (type == 'html') {
        askSaveIfNeed();
        const files = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
            filters: [{
                    name: "Text Files",
                    extensions: ['html']
                },
                {
                    name: 'All Files',
                    extensions: ['*']
                }
            ],
            properties: ['openFile']
        });
        if (files) {
            let path = files[0].split('/').splice(0, files[0].split('/').length - 1).join('/');
            let name = (files[0].split('/').splice(files[0].split('/').length - 1, 1))[0].split('.')[0];
            htmlEditor.setValue(readContent(`${path}/${name}.html`));
            isSaved = true;
        }
    } else {
        askSaveIfNeed();
        const files = remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
            filters: [{
                    name: "Text Files",
                    extensions: ['css']
                },
                {
                    name: 'All Files',
                    extensions: ['*']
                }
            ],
            properties: ['openFile']
        });
        if (files) {
            let path = files[0].split('/').splice(0, files[0].split('/').length - 1).join('/');
            let name = (files[0].split('/').splice(files[0].split('/').length - 1, 1))[0].split('.')[0];
            cssEditor.setValue(readContent(`${path}/${name}.css`));
            isSaved = true;
        }
    }
}

//导出文件
function exportFile(type) {
    if (type == 'html') {
        const file = remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
            filters: [{
                    name: 'Text Files',
                    extensions: ['html']
                },
                {
                    name: 'All Files',
                    extensions: ['*']
                }
            ]
        });
        if (file) {
            let path = file.split('/').splice(0, file.split('/').length - 1).join('/');
            let name = file.split('/').splice(file.split('/').length - 1, 1);
            currentHtmlFile = `${path}/${name}.html`
        }
        const htmlSave = htmlEditor.getValue();
        saveContent(htmlSave, currentHtmlFile);
    } else {
        const file = remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
            filters: [{
                    name: 'Text Files',
                    extensions: ['css']
                },
                {
                    name: 'All Files',
                    extensions: ['*']
                }
            ]
        });
        if (file) {
            let path = file.split('/').splice(0, file.split('/').length - 1).join('/');
            let name = file.split('/').splice(file.split('/').length - 1, 1);
            currentCssFile = `${path}/${name}.css`
        }
        const cssSave = htmlEditor.getValue();
        saveContent(cssSave, currentCssFile);
    }
}

//保存当前文档
function saveCurrentDoc() {

    if (!currentInfoFile) {
        const file = remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
            filters: [{
                    name: 'Text Files',
                    extensions: ['h2s']
                },
                {
                    name: 'All Files',
                    extensions: ['*']
                }
            ]
        });
        if (file) {
            path = file.split('/').splice(0, file.split('/').length - 1).join('/');
            name = (file.split('/').splice(file.split('/').length - 1, 1))[0].split('.')[0];
            currentHtmlFile = `${path}/${name}.html`
            currentCssFile = `${path}/${name}.css`
            currentInfoFile = file
        };
    }
    if (currentInfoFile) {
        const htmlSave = htmlEditor.getValue();
        const cssSave = cssEditor.getValue();
        saveContent(htmlSave, currentHtmlFile);
        saveContent(cssSave, currentCssFile);
        saveContent(`${currentHtmlFile}\n${currentCssFile}`, currentInfoFile);
        isSaved = true;
        document.title = `Html2CSS - ${name} - ${path}`;
    }
}

//如果需要保存，弹出保存对话框询问用户是否保存当前文档
function askSaveIfNeed() {
    if (isSaved) return;
    const response = dialog.showMessageBox(remote.getCurrentWindow(), {
        message: '是否需要保存当前内容?',
        type: 'question',
        buttons: ['Yes', 'No']
    });
    if (response == 0) saveCurrentDoc(); //点击Yes按钮后保存当前文档
}