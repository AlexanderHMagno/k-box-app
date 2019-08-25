import { createMuiTheme, withStyles } from "@material-ui/core/styles";
export const drawerWidth = 256;

let themeGeneral = createMuiTheme({
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5
    }
  },
  palette: {
    primary: {
      //grey  #0f0302
      light: "#000000",
      //   main: "#009be5",
      main: "#000000",
      //#006db3
      dark: "#000000"
    },
    secundary: {
      //red  #e74c3c
      light: "#63ccff",
      main: "#e43725",
      dark: "#ef8b80"
    }
  },
  shape: {
    borderRadius: 8
  }
});

export const theme = {
  ...themeGeneral,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: "#000000"
      }
    },
    MuiButton: {
      label: {
        textTransform: "none"
      },
      contained: {
        boxShadow: "none",
        "&:active": {
          boxShadow: "none"
        }
      }
    },
    MuiTabs: {
      root: {
        marginLeft: themeGeneral.spacing(1)
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: themeGeneral.palette.common.white
      }
    },
    MuiTab: {
      root: {
        textTransform: "none",
        margin: "0 16px",
        minWidth: 0,
        padding: 0,
        [themeGeneral.breakpoints.up("md")]: {
          padding: 0,
          minWidth: 0
        }
      }
    },
    MuiIconButton: {
      root: {
        padding: themeGeneral.spacing(1)
      }
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: "#404854"
      }
    },
    MuiListItemText: {
      primary: {
        fontWeight: themeGeneral.typography.fontWeightMedium
      }
    },
    MuiListItemIcon: {
      root: {
        color: "inherit",
        marginRight: 0,
        "& svg": {
          fontSize: 20
        }
      }
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32
      }
    }
  },
  props: {
    MuiTab: {
      disableRipple: true
    }
  },
  mixins: {
    ...themeGeneral.mixins,
    toolbar: {
      minHeight: 48
    }
  }
};

export const userStyles = {
  root: {
    display: "flex",
    minHeight: "100vh"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column"
  },
  mainContent: {
    flex: 1,
    padding: "48px 36px 0",
    // background: "#eaeff1",
    background: "#000000"
  }
};

export const searcherStyles = theme => ({
  paper: {
    maxWidth: 936,
    margin: "auto",
    overflow: "hidden"
  },
  searchBar: {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
  },
  searchInput: {
    fontSize: theme.typography.fontSize
  },
  block: {
    display: "block"
  },
  addUser: {
    marginRight: theme.spacing(1)
  },
  contentWrapper: {
    margin: "40px 16px"
  }
});

const styles = themeGeneral => ({
  root: {
    flexGrow: 1,
    height: "100%",
    background: theme.palette.primary.main,
    padding: theme.spacing(5),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(20)
    }
  }
});

export default styles;
