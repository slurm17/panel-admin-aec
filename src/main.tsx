import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme/global.ts'
import { ConfirmProvider } from "material-ui-confirm";
// HACER SIEMPRE EL BUILD CON CMD ADMINISTRADOR PARA EVITAR PROBLEMAS DE PERMISOS

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ConfirmProvider>
        <App />
      </ConfirmProvider>
    </ThemeProvider>
  </React.StrictMode>,
)

