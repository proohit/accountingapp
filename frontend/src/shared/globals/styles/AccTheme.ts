import { createTheme } from '@material-ui/core';
import createPalette from '@material-ui/core/styles/createPalette';

export const palette = createPalette({
  type: 'light',
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
});

export const AccTheme = createTheme({
  palette: { ...palette },
  overrides: {
    MuiTableRow: {
      hover: {
        '&:hover': {
          '&&': {
            backgroundColor: palette.secondary.main,
          },
        },
      },
    },
    MuiTableCell: {
      head: {
        fontWeight: 'bold',
        borderBottom: `1px solid ${palette.secondary.dark}`,
        color: palette.primary.main,
      },
    },
    MuiTableSortLabel: {
      active: {
        '&&': {
          color: `${palette.secondary.dark} !important`,
        },
      },
      icon: {
        '&&': {
          color: `${palette.secondary.dark} !important`,
        },
      },
    },
    MuiListItem: {
      root: {
        color: palette.primary.main,
        '&$selected': {
          backgroundColor: palette.secondary.main,
        },
        '&$selected:hover': {
          backgroundColor: palette.secondary.main,
        },
      },
      button: {
        '&:hover': {
          backgroundColor: palette.secondary.main,
        },
      },
    },
  },
});
