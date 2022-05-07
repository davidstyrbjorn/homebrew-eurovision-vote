import React from 'react'
import ReactDOM from 'react-dom/client'
import { UserProvider } from './contexts/UserContext'
import HomeView from './views/HomeView'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ParticipantProvider } from './contexts/ParticipantContext';

const theme = createTheme({
	typography: {
	 "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
	 "fontSize": 14,
	 "fontWeightLight": 300,
	 "fontWeightRegular": 400,
	 "fontWeightMedium": 500
	}
 });

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<UserProvider>
				<ParticipantProvider>
					<HomeView/>
				</ParticipantProvider>
			</UserProvider>
		</ThemeProvider>
	</React.StrictMode>
)
