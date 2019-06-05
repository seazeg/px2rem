<template>
    <div class="drop-box">
        <div class="px2rem">

        </div>
    </div>
</template>
<script>
    const {
        ipcRenderer: ipc
    } = require('electron');
    let dropBox;

    window.onload = function () {
        dropBox = document.getElementById("dropBox");
        dropBox.ondragenter = ignoreDrag;
        dropBox.ondragover = ignoreDrag;
        dropBox.ondrop = drop;
    }

    function ignoreDrag(e) {
        //因为我们在处理拖放，所以应该确保没有其他元素会取得这个事件
        e.stopPropagation();
        e.preventDefault();

    }

    function drop(e) {
        //取消事件传播及默认行为
        e.stopPropagation();
        e.preventDefault();
        let files = e.dataTransfer.files;
        let obj = {
            fileName: e.dataTransfer.files[0].name,
            filePath: e.dataTransfer.files[0].path.replace(/\\/g, "/").replace(e.dataTransfer.files[0].name, ""),
            fileType: e.dataTransfer.files[0].type,
            fileSize: e.dataTransfer.files[0].size
        }
        ipc.send('files-message', JSON.stringify(obj));
        console.log(obj);
    }
    export default {
        methods: {
            // open() {
            //     let _this = this;
            //     ipc.send("open-message");
            // }
        },
        mounted() {
            // let _this = this
            // ipc.on('files-reply', function (event, arg) {
            //     let tmp = [];
            //     for (let i in arg) {
            //         tmp.push('file:///' + arg[i].replace(/\\/g, "/"));
            //     }
            //     _this.data = tmp;
            // });
        }
    }
</script>

<style>
    .px2rem {
        width: 200px;
        height: 200px;
        background: url('../assets/change.png') no-repeat;
        background-position: center;
        background-size: 100%;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 30px;
        right: 0;
        margin: auto
    }
</style>