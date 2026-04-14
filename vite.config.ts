import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts';
export default defineConfig({
  plugins: [
    vue(),dts({
      outDir:'dist',
      beforeWriteFile: (filePath,content) => {
           if (filePath.includes('src/draw/MapLibreDraw')) {

            return {
              // 把 utils 下的文件移动到 lib/tools/
              filePath: filePath.replace('src/draw/MapLibreDraw', 'index'),
              content: content,
            };
          }
      }
    })],
  build:{
    lib:{
      entry: "./src/draw/MapLibreDraw.ts",
      name:'index',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      // 外部化依赖：不打包 maplibre-gl，让用户自己安装
      external: ['maplibre-gl'],
      output: {
         exports: 'named',
        // 提供全局变量
        globals: {
          'maplibre-gl': 'maplibregl',
           'vue': 'Vue',
        },
      },
    },
  },
  server:{
    port: 9000,
  }
})
