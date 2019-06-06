<template>
    <div class="drop-box">
        <div class="px2rem">

        </div>
    </div>
</template>
<script>
    import '../utils/core';
    export default {
        name: 'view'
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