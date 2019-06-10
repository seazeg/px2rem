<template>
  <div class="main-container dragstatus">
    <layout-header></layout-header>
    <layout-container>
      <transition name="component-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </layout-container>
    <layout-footer>
      <span class="change" :class="{'r2p':buttonName=='PX←REM'}" @click="change()">{{buttonName}}</span>
      Drop the CSS files to PX⇔REM
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
    }
  }
</script>
<style lang="less">
  @import './assets/less/base.less';
  @import './assets/less/theme.less';
</style>