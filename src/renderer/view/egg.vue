<template>
    <div class="egg">
        <span @click="init($event)" class="start">重新开始</span>
        <span @click="go(type.status)" class="pause">{{type.desc}}</span>
        <canvas id="egg" width="324" height="324">当前浏览器不支持canvas标签</canvas>
    </div>
</template>
<script>
    export default {
        name: 'egg',
        data() {
            return {
                type: {
                    status: 0,
                    desc: '暂停'
                }
            }
        },
        methods: {
            init(e) {
                egg.init(300);
            },
            go(type) {
                let _this = this;
                switch (type) {
                    case 0:
                        _this.type = {
                            status: 1,
                            desc: '继续'
                        }
                        egg.pause()
                        break;
                    case 1:
                        _this.type = {
                            status: 0,
                            desc: '暂停'
                        }
                        egg.play();
                        break;
                    default:
                        break;
                }
            }
        },
        mounted() {
            let _this = this;
            document.onkeyup = function (e) {
                if (e.keyCode == 73) { //I
                    egg.init(300);
                }
                if (e.keyCode == 80) { //P
                    _this.type = {
                        status: 1,
                        desc: '继续'
                    }
                    egg.pause()
                }
                if (e.keyCode == 71) { //G
                    _this.type = {
                        status: 0,
                        desc: '暂停'
                    }
                    egg.play();
                }
                if (e.shiftKey && e.keyCode == 69) {
                    _this.$router.push({
                        path: 'egg'
                    })

                }
                if (e.shiftKey && e.keyCode == 13) {
                    _this.$router.push({
                        path: 'view'
                    })
                }
            }
        }
    }
</script>