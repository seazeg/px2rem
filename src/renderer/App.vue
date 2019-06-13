<template>
  <div class="main-container dragstatus">
    <layout-header></layout-header>
    <layout-container>
      <transition name="component-fade" mode="out-in">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>
      <transition name="component-fade" mode="out-in">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </transition>
    </layout-container>
    <layout-footer>
      <div :class="{'hide':$route.name!=='main'}">
        <span class="change" :class="{'r2p':buttonName=='PX←REM'}" @click="change()">{{buttonName}}</span>
        Drop the CSS files to PX⇔REM
      </div>
    </layout-footer>
  </div>
</template>
<script>
  import './libs/drag'
  let timer = null
  export default {
    name: 'px2rem',
    data() {
      return {
        buttonName: 'PX→REM'
      }
    },
    methods: {
      change() {
        if (this.buttonName == 'PX→REM') {
          this.buttonName = 'PX←REM';
          this.animate();
        } else {
          this.buttonName = 'PX→REM';
          this.animate();
        }
      },
      animate() {
        clearInterval(timer);
        vm.$logo.css('animation-play-state', 'running');
        timer = setInterval(() => {
          vm.$logo.css('animation-play-state', 'paused');
        }, 500);
      }
    },
    mounted() {
      let _this = this;
      document.onkeyup = function (e) {
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
      };
    }
  }
</script>
<style lang="less">
  @import './assets/less/base.less';
  @import './assets/less/theme.less';
</style>