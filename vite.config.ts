import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron/simple'
import {  getReplacer } from "./plugins/devPlugin";
import optimizer from "vite-plugin-optimizer";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),electron({
    main:{
      entry: 'electron/main.ts',
    }
  })],
})
