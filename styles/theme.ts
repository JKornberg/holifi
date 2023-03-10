import { InputProps, TextField, TextFieldProps } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'
import { Mattone } from 'Mattone.otf'
import { createTheme, InputBase } from '@mui/material'
import {
  purple,
  orange,
  pink,
  grey,
  green,
  red,
  blue,
} from '@mui/material/colors'

export const lyricImageColors = [red['400'],'#004952','#730037',red['400'],'#21314a' ]
export const lyricLogoColors = [green['A400'], red['400'],red['400'],green['A400'], red['400']]

export const InputTextField = styled(TextField)<TextFieldProps>(
  ({ theme }) => ({
    '& .MuiFilledInput-input': {
      boxShadow: '0 0 0 100px #333 inset',
    },
    '& .MuiOutlinedInput-input': {
      boxShadow: '0 0 0 100px #222 inset',
    },
    '& .MuiOutlinedInput-input:invalid': {
      boxShadow: '0 0 0 100px #222 inset',
    },
  })
)

const app_theme = createTheme({
  status: {
    danger: orange[500],
  },

  palette: {
    mode: 'dark',
    primary: {
      main: '#999999',
      contrastText: '#fff',
    },
    secondary: {
      main: green[400],
    },
    text: {
      primary: '#fff',
      secondary: red[400],
    },
    background: {
      default: '#090c24',
    },
    info: {
      main: orange[500],
    },
    success: {
      main: pink[500],
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1.2rem',
          fontWeight: 700,
          color: '#000',
          backgroundColor: red['400'],
          margin: '1rem',
          '&:hover': {
            backgroundColor: grey['A100'],
          },
        },
        //make white when hover
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#fff',
          '&.Mui-focused': {
            color: red['500'],
          },
        },
      },
    },

    // MuiTextField: {
    //   styleOverrides: {
    //     root: {
    //       '& .MuiFilledInput-input': {
    //         boxShadow: '0 0 0 100px #333 inset'

    //       },
    //       '& .MuiOutlinedInput-input': {
    //         boxShadow: '0 0 0 100px #222 inset'
    //       },
    //       '& .MuiOutlinedInput-input:invalid': {
    //         boxShadow: '0 0 0 100px #222 inset'
    //       },
    //       '&.Mui-focused fieldset': {
    //         border: '1px solid red'
    //       },
    //     },

    //   }
    // },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(	9, 12, 36)'
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: red[400],
          '&.Mui-checked': {
            color: green['A400'],
          },
        },
      },
    },

    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: green[200],
        },
        checked: {},
      },
    },
  },
  typography: {
    fontFamily: ['Open Sans'].join(','),
    body1: {
      fontSize: '1.1rem',
      fontWeight: 500,
    },
    h1: {
      fontFamily: 'Bad Script, cursive',
      fontSize: '4rem',
      fontWeight: 100,
      lineHeight: 1.2,
      letterSpacing: '5px',
    },
    h2: {
      fontFamily: ['Open Sans'].join(','),
      fontSize: '2.5rem',
      fontWeight: 400,
      lineHeight: 1.2,
    },
  },
})

export default app_theme
