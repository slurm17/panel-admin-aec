import { createTheme } from '@mui/material/styles'
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { esES as coreEsES } from '@mui/material/locale';
import { esES } from '@mui/x-date-pickers/locales';
const bktValues = {
  xs: 0,
  sm: 600,
  md: 950,
  lg: 1280,
  xl: 1920
}
const colorPrimaryMain = '#7FA1CF'
const colorSecondaryMain = '#B913EE'
export const theme = createTheme({
  palette: {
    primary: {
      main: colorPrimaryMain,
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: colorSecondaryMain,
    },
  },
  breakpoints: {
    values: {
      xs: bktValues.xs,
      sm: bktValues.sm,
      md: bktValues.md,
      lg: bktValues.lg,
      xl: bktValues.xl
    }
  },
  components: {
    MuiDatePicker: {
      defaultProps: {
        displayWeekNumber: true,
      },
    },
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          backgroundColor: '#f0f0f0',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: 100,
          maxWidth: 200,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          // minHeight: '100dvh',
          // width: '100vw',
          backgroundColor: '#f3f3f3',
        },
        '#root': {
          margin: '0',
          padding: '0',
          width: '100%',
          maxWidth: '100%',
          display: 'flex',
        },
        '#container-main': {
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        },
        main: {
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'left',
          alignItems: 'left',
          padding: `0.75rem 1rem 0 1rem`,
          width: '100%',
          maxWidth: 'sm',
          gap: '.8rem'
        }
      },
    },
  },
},
esES, // x-date-pickers translations
coreEsES, // core translations
)