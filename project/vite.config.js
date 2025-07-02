import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server :{
    proxy :{
      '/api' :{
        changeorigin : true,
        secure : false, 
        target : `https://student-project-management-c8ne.onrender.com/api`
      }
    }
  }
})
