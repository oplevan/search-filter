import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ['"Raleway"', "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: "#002a61",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      tablet: 768,
      md: 1024,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        custom: {
          backgroundColor: "#5db944",
          borderRadius: 50,
          border: 0,
          color: "white",
          ".MuiButton-endIcon": {
            transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          },

          "&:hover": {
            backgroundColor: "#75cee3",
          },
          "&.Mui-disabled": {
            backgroundColor: "#ccc",
            color: "white",
            ".MuiButton-endIcon": {
              backgroundColor: "#999",
            },
          },
        },
        endIcon: {
          width: 28,
          height: 32,
          clipPath: "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
          backgroundColor: "#1d2f5f",
          justifyContent: "center",
          alignItems: "center",
        },
      },
    },
    MuiIconButton: {
      variants: [
        {
          props: { variant: "hex" },
          style: {
            width: 28,
            height: 32,
            clipPath: "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
            backgroundColor: "#1d2f5f",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            borderRadius: 0,

            "&:hover": {
              backgroundColor: "#5db944",
            },
          },
        },
      ],
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          color: "#002a61",
          "&.Mui-expanded": {
            margin: 0,
            "&:before": {
              opacity: 1,
            },
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: "0 10px 0 0",

          "&.Mui-expanded": {
            minHeight: "auto",
          },
          ".MuiAccordionSummary-content": {
            fontSize: "16px",
            color: "#999",
            fontWeight: 600,
          },
          ".MuiAccordionSummary-expandIconWrapper": {
            color: "#002a61",
            transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          },
          "&:hover .MuiAccordionSummary-expandIconWrapper": {
            color: "#5db944",
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "0 10px 15px 0",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#75cee3",
          "&.Mui-checked": { color: "#75cee3" },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#999",
          fontSize: "16px",
          fontWeight: "600",
        },
      },
    },
  },
});

export default theme;
