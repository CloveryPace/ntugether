
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#A1D3CF', 
        light: '#E3F2F1',
        contrastText: '#2C3E4F',
      },
      secondary: {
        main: '#FFB867',
        contrastText: '#2C3E4F',
      },

      third: {
        main: '#E8ECEB',
      },

      icon: {
        main: "#2C3E4F", 
      },

      words: {
        main: '#2C3E4F',
      },

      error: {
        main: "#C1666B",
      },

      hashtag: {
        oneTime: '#FFB867',
        review: '#FFC966',
        type:  '#FFD45C',
        contrastText: '#2C3E4F',
      },

      toggle: {
        main: '#489992',
      }
    },
  
    typography: {
      allVariants: {
        color: "#2C3E4F",
      },

      h4: {
        fontWeight: 'bold',
        marginTop: "20px",
        marginBottom: "20px",
        fontSize: "28px",
      },

      h5: {
        fontWeight: 'bold',
        marginTop: "15px",
        marginBottom: "15px",
        fontSize: "20px",
      },

      h6: {
        marginTop: "20px",
        marginBottom: "20px",
        fontSize: "18px",
      },

    },

    components: {
      MuiRadio: {
        styleOverrides: {
          root: {
            color: '#E8ECEB',
            '&.Mui-checked': {
              color: '#E8ECEB',
            },
          },
        },
      },
    },
  
  });

export default theme;









/*





import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#FFEC7F',
        light: '#FFFCEB',
        contrastText: '#4F4140',
      },
      secondary: {
        main: '#EAAC4E',
        contrastText: '#4F4140',
      },

      third: {
        main: '#E1D5C9',
      },

      icon: {
        main: "#4F4140", 
      },

      words: {
        main: '#4F4140',
      }
    },
  
    typography: {
      allVariants: {
        color: "#4F4140",
      },

      h5: {
        fontWeight: 'bold',
        marginTop: "20px",
      },
    },
  
  });

export default theme;

*/