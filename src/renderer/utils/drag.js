import {
    ipcRenderer
} from 'electron'

window.onload = function () {
    let logo = $('.logo')
    $('#dropBox').on({
        'drop': function (e) {
            e.stopPropagation();
            e.preventDefault();
            let fileList = [];
            let files = e.originalEvent.dataTransfer.files;
            for(let file of files){
                fileList.push({
                    fileName: file.name,
                    filePath: file.path,
                    fileType: file.type,
                    fileSize: file.size
                })
            }
            ipcRenderer.send('files-message', JSON.stringify(fileList));
            logo.css('animation-play-state','paused')
        },
        'dragover': function (e) {
            e.stopPropagation();
            e.preventDefault();
            logo.css('animation-play-state','running')
        },
        'dragleave': function (e) {
            e.stopPropagation();
            e.preventDefault();
            setTimeout(() => {
                logo.css('animation-play-state','paused')
            }, 500);
            
        }
    })
}


