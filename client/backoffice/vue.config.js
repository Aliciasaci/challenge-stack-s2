import { defineConfig } from 'vite'
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  define: {
    'process.env': {}
  }
})


