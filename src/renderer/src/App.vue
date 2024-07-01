<script setup lang="ts">
import Versions from './components/Versions.vue'
import Header from './components/Header.vue'
import SideBar from './components/SideBar.vue'
import Footer from './components/Footer.vue'
// import drag from './utils/dragWindow'

// const { onMouseDown } = drag()
</script>

<template>
  <div class="page">
    <Header></Header>

    <div class="main">
      <SideBar></SideBar>
      <div class="content"></div>
    </div>

    <Footer>
      <Versions></Versions>
    </Footer>
  </div>
</template>

<style lang="scss">
.page {
  width: 100vw;
  height: 100vh;

  .main {
    display: flex;
  }
  // display: grid;
}
</style>
