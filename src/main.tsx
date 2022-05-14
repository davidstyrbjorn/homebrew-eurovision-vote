import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AchievmentProvider } from './contexts/AchievmentsContext';
import { ParticipantProvider } from './contexts/ParticipantContext';
import { QuestionProvider } from './contexts/QuestionContext';
import { UserProvider } from './contexts/UserContext';
import './style.scss';
import HomeView from './views/HomeView';


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
					<QuestionProvider>
						<AchievmentProvider>
							<HomeView/>
						</AchievmentProvider>
					</QuestionProvider>
				</ParticipantProvider>
			</UserProvider>
		</ThemeProvider>
	</React.StrictMode>
)
