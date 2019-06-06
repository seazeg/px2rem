<template>
    <div class="drop-box" :class="{'dragstatus':dragstatus}" @drop="drop" @dragenter="dragenter" @dragleave="dragleave">
        <div class="px2rem">

        </div>
    </div>
</template>
<script>
    import {
        ipcRenderer
    } from 'electron'
    import '../utils/core';
    export default {
        data() {
            return {
                dragstatus: false
            }
        },
        methods: {
            drop(e) {
                e.stopPropagation();
                e.preventDefault();
                console.log(e);
                let files = e.dataTransfer.files;
                let obj = {
                    fileName: e.dataTransfer.files[0].name,
                    filePath: e.dataTransfer.files[0].path.replace(/\\/g, "/").replace(e.dataTransfer.files[0].name,
                        ""),
                    fileType: e.dataTransfer.files[0].type,
                    fileSize: e.dataTransfer.files[0].size
                }
                ipcRenderer.send('files-message', JSON.stringify(obj));
            },
            dragenter(e) {
                e.stopPropagation();
                e.preventDefault();
                // this.dragstatus = true;
            },
            dragleave(e) {
                e.stopPropagation();
                e.preventDefault();
                // this.dragstatus = false;
            }
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