
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider,createTheme } from '@mui/material'

const defaultTheme  = createTheme({
    typography:{
        fontFamily:'Prompt'
    },
  palette: {
    primary: {
      light: '#757ce8',
      main: '#787fff',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
 <ThemeProvider theme={defaultTheme}>

     <App />
 </ThemeProvider>

)
