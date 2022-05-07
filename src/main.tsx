import React from 'react'
import ReactDOM from 'react-dom/client'
import { UserProvider } from './contexts/UserContext'
import HomeView from './contexts/views/HomeView'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<UserProvider>
			<HomeView/>
		</UserProvider>
	</React.StrictMode>
)
