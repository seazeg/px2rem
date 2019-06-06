<template>
  <div class="main-container dragstatus">
    <layout-header></layout-header>
    <layout-container>
      <transition name="component-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </layout-container>
    <layout-footer>
        Drop the CSS files to PX2REM
    </layout-footer>
  </div>
</template>
<script>
  import './utils/drag'
  export default {
    name: 'px2rem'
  }
</script>
<style lang="less">
  @import './assets/less/base.less';
  @import './assets/less/theme.less';
</style>