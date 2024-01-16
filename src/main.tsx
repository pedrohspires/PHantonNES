import React from 'react'
import ReactDOM from 'react-dom/client'
import Emulador from './Emulator.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Emulador />
	</React.StrictMode>,
)
