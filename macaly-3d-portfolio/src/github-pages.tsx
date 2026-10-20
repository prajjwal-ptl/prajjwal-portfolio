import { createRoot } from 'react-dom/client'
import { Portfolio } from './routes/index'
import './styles.css'

const container = document.getElementById('root')
if (!container) {
  throw new Error('Portfolio mount point #root was not found')
}

createRoot(container).render(<Portfolio />)
