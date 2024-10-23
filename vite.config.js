import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    entries: [],
  },
  build: {
    rollupOptions: {
      // 配置rullup的一些构建策略
      output: {
        // 控制输出
        // [name]：资产的文件名，不包含任何扩展名
        // [ext]：不带前导点的文件扩展名，例如css
        // [hash]：代表将你的文件名和文件内容进行计算得来的结果
        assetFileNames: "[hash].[name].[ext]",
        // dir: 'testDist', // 输出目录,
      },
    },
    assetsInlineLimit: 4096, // 默认4kb
    emptyOutDir: true, // 清空输出目录中的所有文件
  },
  plugins: [
    {
      // 在解析 Vite 配置前调用。钩子接收原始用户配置（命令行选项指定的会与配置文件合并）和一个描述配置环境的变量，包含正在使用的 mode 和 command。它可以返回一个将被深度合并到现有配置中的部分配置对象，或者直接改变配置（如果默认的合并不能达到预期的结果）。
      config(options) {
        console.log("options", options);
      },
      // 是用于配置开发服务器的钩子。最常见的用例是在内部 connect 应用程序中添加自定义中间件:
      configureServer(server) {
        // server.middlewares.use((req, res, next)=>{
        // console.log(req, res, next)
        //   next()
        // })
      },
      // 转换 index.html 的专用钩子。钩子接收当前的 HTML 字符串和转换上下文。上下文在开发期间暴露ViteDevServer实例，在构建期间暴露 Rollup 输出的包。
      transformIndexHtml(html) {
        // console.log(html)
      },
      configResolved(options) {
        // 整个配置文件的解析流程完全完毕后会走的钩子
        // vite在内部有一个默认的配置文件
        // console.log(options)
      },
      // 与 configureServer 相同但是作为预览服务器。。它提供了一个 connect 服务器实例及其底层的 http server。与 configureServer 类似，configurePreviewServer 这个钩子也是在其他中间件安装前被调用的。如果你想要在其他中间件 之后 安装一个插件，你可以从 configurePreviewServer 返回一个函数，它将会在内部中间件被安装之后再调用：
      configurePreviewServer(server) {
        // server.middlewares.use((req, res, next) => {
        //   // 自定义处理请求 ...
        //   console.log(req)
        // })
      },
      // rollupOptions 读取的是上面 build.rollupOptions
      options: (rollupOptions) => {
        // universal hooks --> vite和rollup都会关注的hook
        // console.log('rollupOptions', rollupOptions)
      },
      // 和configResolved一致的
      buildStart(fullRollupOptions) {
        console.log("fullRollupOptions", fullRollupOptions);
      },
    },
  ],
});

// import { defineConfig } from 'vite'

// export default defineConfig({
//   server:{ // 开发服务器配置
//     proxy:{ // 代理
//       '/api': { // /api 开头的请求都代理到 target的域中
//         target: 'https://www.360.com', // 代理目标地址
//         changeOrigin: true,
//         rewrite: (path) => {
//           console.log(path);
//           return path.replace(/^\/api/, '')
//         }
//       }
//     }
//   }

//   // 代理原理：（总结：我们得请求到vite server，vite server代理请求到目标服务器，并把数据返回给我们）

//   // http://localhost:5174/api  浏览器拼接完之后 -> 请求到vite

//   // vite发现这个path有配置过代理策略，然后他会根据策略的描述对象，进行再次请求

//   // 我们的请求path为 /api，地址为https://wwww.360.com, 但是我们加了rewite进行path重写，path.replace(/^\/api/, '') 得到地址为 https://wwww.360.com

//   // 然后开发服务器vite server帮我们请求地址https://wwww.360.com，得到结果再返回给我们（代理我们得请求）
//   })
