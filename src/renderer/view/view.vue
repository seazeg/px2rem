<template>
    <div class="drop-box">
        <div class="logo"></div>
    </div>
</template>
<script>
    import '../utils/core';
    export default {
        name: 'main-view'
    }
</script>
<style>
    .logo {
        width: 1000px;
        height: 1000px;
        background: url('../assets/change.png') no-repeat;
        background-position: center;
        background-size: 25%;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        z-index:0
    }
</style>