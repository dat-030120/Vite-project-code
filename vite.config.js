import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import dotenv from 'dotenv'

export default 
({ mode }) => {
  // xác định biến môi trường từ file .env tương ứng với mode
  const envFile = path.resolve(process.cwd(), 'config', mode ? `.env.${mode}` : '.env')
  const parsed = dotenv.config({ path: envFile }).parsed || {}

  // Chuyển đổi biến môi trường thành định dạng phù hợp cho Vite's define
  const defineEnv = Object.fromEntries(
    Object.entries(parsed).map(([k, v]) => {
      const key = k.startsWith('VITE_') ? `import.meta.env.${k}` : `import.meta.env.VITE_${k}`
      return [key, JSON.stringify(v)]
    })
  )

return  defineConfig({
  
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  // Định nghĩa biến môi trường để sử dụng trong ứng dụng
   define: {
      ...defineEnv
    }
})
}