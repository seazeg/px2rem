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
  import './utils/drag'
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
          this.buttonName = 'PX←REM'
        } else {
          this.buttonName = 'PX→REM'
        }
      }
    }
  }
</script>
<style lang="less">
  @import './assets/less/base.less';
  @import './assets/less/theme.less';
</style>