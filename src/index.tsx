// index.tsx
import {createRoot} from 'react-dom/client'
// import App from 'App'
import MyRouter from './router'
const container = document.getElementById('root')
const root = createRoot(container!)

root.render(<MyRouter/>)
