import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5D5CDE',
      light: '#8A89E8',
      dark: '#4140B8',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#2c3e50',
      light: '#5a6c7d',
      dark: '#1a252f',
      contrastText: '#ffffff'
    },
    error: {
      main: '#e74c3c',
      light: '#ef7564',
      dark: '#c0392b',
      contrastText: '#ffffff'
    },
    warning: {
      main: '#ffc107',
      light: '#ffcd38',
      dark: '#d39e00',
      contrastText: '#000000'
    },
    info: {
      main: '#17a2b8',
      light: '#58c4d4',
      dark: '#117a8b',
      contrastText: '#ffffff'
    },
    success: {
      main: '#28a745',
      light: '#5cbf2a',
      dark: '#1e7e34',
      contrastText: '#ffffff'
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff'
    },
    text: {
      primary: '#212529',
      secondary: '#6c757d'
    },
    grey: {
      50: '#f8f9fa',
      100: '#e9ecef',
      200: '#dee2e6',
      300: '#ced4da',
      400: '#adb5bd',
      500: '#6c757d',
      600: '#495057',
      700: '#343a40',
      800: '#212529',
      900: '#000000'
    },
    divider: '#dee2e6'
  },
  typography: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.3
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.4
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5
    }
  },
  shape: {
    borderRadius: 12
  }
});

export default theme;