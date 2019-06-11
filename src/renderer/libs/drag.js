import {
    ipcRenderer
} from 'electron'

window.onload = function () {
    let logo = $('.logo')
    vm.$logo = logo;
    $('#dropBox').on({
        'drop': function (e) {
            e.stopPropagation();
            e.preventDefault();
            let fileList = [];
            let errorFlag = false;
            let files = e.originalEvent.dataTransfer.files;
            for (let file of files) {
                if (file.type.includes('/css')) {
                    fileList.push({
                        fileName: file.name,
                        filePath: file.path,
                        fileType: file.type,
                        fileSize: file.size
                    })
                } else {
                    errorFlag = true;
                }
            }
            // if (errorFlag) {
            //     new Notification('PX⇔REM', {
            //         body: '⚠️已过滤掉非css文件'
            //     })
            // }
            ipcRenderer.send('files-message', JSON.stringify(fileList));
            setTimeout(() => {
                logo.css('animation-play-state', 'paused')
            }, 500);
        },
        'dragover': function (e) {
            e.stopPropagation();
            e.preventDefault();
            logo.css('animation-play-state', 'running')
        },
        'dragleave': function (e) {
            e.stopPropagation();
            e.preventDefault();
            setTimeout(() => {
                logo.css('animation-play-state', 'paused')
            }, 500);

        }
    })
}