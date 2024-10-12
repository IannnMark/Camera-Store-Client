import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
import react from '@vitejs/plugin-react';


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
  plugins: [react()],
})




//deployed proxy
// https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     proxy: {
//       '/api': {
//         target: "https://camera-store-api.vercel.app",
//         changeOrigin: true,
//         secure: true,
//       },
//     },
//   },
//   plugins: [react()],
// })

