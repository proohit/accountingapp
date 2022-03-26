import { alpha, createTheme } from '@mui/material';

export const AccTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3b4147',
      dark: '#151b20',
      light: '#656c72',
    },
    secondary: {
      main: '#dedbd2',
      light: '#ffffff',
      dark: '#aca9a1',
    },
  },
  components: {
    MuiTableRow: {
      styleOverrides: {
        hover: {
          '&:hover': {
            '&&': {
              backgroundColor: 'palette.secondary.main',
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: ({ theme }) => ({
          fontWeight: 'bold',
          borderBottom: `1px solid ${theme.palette.secondary.dark}`,
          color: theme.palette.primary.main,
        }),
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        active: ({ theme }) => ({
          '&&': {
            color: `${theme.palette.secondary.dark} !important`,
          },
        }),
        icon: ({ theme }) => ({
          '&&': {
            color: `${theme.palette.secondary.dark} !important`,
          },
        }),
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          '&$selected': {
            backgroundColor: theme.palette.secondary.main,
          },
          '&$selected:hover': {
            backgroundColor: theme.palette.secondary.main,
          },
        }),
        button: ({ theme }) => ({
          '&:hover': {
            backgroundColor: theme.palette.secondary.main,
          },
        }),
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme, ownerState }) => ({
          '&.Mui-disabled': {
            color:
              ownerState.color === 'primary'
                ? alpha(theme.palette.primary.main, 0.5)
                : alpha(theme.palette.secondary.main, 0.5),
          },
        }),
      },
    },
  },
});
