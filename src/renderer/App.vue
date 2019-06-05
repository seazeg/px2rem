<template>
  <div class="main-container">
    <layout-header></layout-header>
    <layout-container>
      <transition name="component-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </layout-container>
  </div>
</template>
<script>
  export default {
    name: 'px2rem'
  }
</script>
<style lang="less">
  @import './assets/less/base.less';
  @import './assets/less/theme.less';
</style>