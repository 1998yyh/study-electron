<script setup lang="ts">
import Versions from './components/Versions.vue'
import Header from './components/Header.vue'
import SideBar from './components/SideBar.vue'
import Footer from './components/Footer.vue'
import { ref } from 'vue'
// import drag from './utils/dragWindow'

// const { onMouseDown } = drag()

const text = ref('')

const handleSearch = () => {
  // console.log(1)
  window.electron.ipcRenderer
    .invoke('getApp', {
      text: text.value
    })
    .then((result) => {
      console.log('object', result)
    })
}
</script>

<template>
  <div class="page">
    <Header style="-webkit-app-region: drag"></Header>

    <div class="main">
      <SideBar></SideBar>
      <div class="content">
        <div class="search">
          <input v-model="text" type="text" />
          <button @click="handleSearch">搜索</button>
        </div>
      </div>
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
