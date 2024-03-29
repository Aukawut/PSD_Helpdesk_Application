import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { green } from "@mui/material/colors"

const defaultTheme = createTheme({
  components: {
 
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;",
        },
      },
    },
    
    MuiTableCell: {
      styleOverrides: {
        
        head: {
          backgroundColor: "#F5F9FC",
          borderBottom: "2px solid black",
          textAlign: "center",
        },
        body: {
          padding: "0.4em",
          textAlign: "center",
          fontSize:'13px'
        },
      },
    },
  },
  typography: {
    fontFamily: "Prompt",
  },
  palette: {
    primary: {
      light: "#757ce8",
      main: "#787fff",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    success:{
      main:green[700]
    }
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={defaultTheme}>
    <App />
  </ThemeProvider>
)
