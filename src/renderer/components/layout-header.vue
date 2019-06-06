<template>
    <div class="layout-header">
        <div class="tools">
            <a class="close" @click="winHandle('close')"></a>
            <a class="min" @click="winHandle('min')"></a>
        </div>
        <div class="title">
            PX2REM
        </div>
    </div>
</template>
<script>
    const {
        ipcRenderer: ipc
    } = require('electron');
    export default {
        name: "layout-header",
        methods: {
            winHandle(type) {
                ipc.send(type);
            }
        }
    }
</script>