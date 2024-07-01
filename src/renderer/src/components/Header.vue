<script setup lang="ts"></script>

<template>
  <header id="page-header">
    <div class="title">这是顶部</div>
  </header>
</template>

<style lang="scss">
#page-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  // border-bottom: 0.5px solid #111;

  backdrop-filter: blur(10px);
  box-shadow: 0px 1px 0px #999;

  .title {
    width: fit-content;
    font-size: 12px;
  }
}
</style>
