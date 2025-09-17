import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme/global.ts'
// import { es } from 'date-fns/locale'
import { es as esLocale } from 'date-fns/locale'
import { esES } from '@mui/x-date-pickers/locales';
import { ConfirmProvider } from "material-ui-confirm";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// HACER SIEMPRE EL BUILD CON CMD ADMINISTRADOR PARA EVITAR PROBLEMAS DE PERMISOS

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider 
        localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
        dateAdapter={AdapterDateFns}
        adapterLocale={esLocale}
      >
        <CssBaseline />
        <ConfirmProvider>
          <App />
        </ConfirmProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>,
)

