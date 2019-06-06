import {
    ipcRenderer
} from 'electron'

window.onload = function () {
    $('#dropBox').on({
        'drop': function (e) {
            e.stopPropagation();
            e.preventDefault();
            console.log(e);
            let files = e.originalEvent.dataTransfer.files;
            let obj = {
                fileName: files[0].name,
                filePath: files[0].path.replace(/\\/g, "/").replace(files[0].name, ""),
                fileType: files[0].type,
                fileSize: files[0].size
            }
            ipcRenderer.send('files-message', JSON.stringify(obj));
        },
        'dragover': function (e) {
            e.stopPropagation();
            e.preventDefault();
            $('.main-container').addClass('dragstatus')
        },
        'dragleave': function (e) {
            e.stopPropagation();
            e.preventDefault();
            $('.main-container').removeClass('dragstatus')
        }
    })
}
