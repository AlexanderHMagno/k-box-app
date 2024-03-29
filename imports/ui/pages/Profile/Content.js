import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import Api from "../../components/siteLayout/API";

// import RenderToLayer from "material-ui/internal/RenderToLayer";

const styles = theme => ({
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

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.search_value = React.createRef();
    this.state = {
      search_information: "",
      error: null,
      isLoaded: false,
      items: []
    };
  }

  search_name() {
    console.log(this.state.search_information);
  }

  set_information() {
    this.setState({
      search_information: this.search_value.current.firstElementChild
        .children[0].value
    });
  }

  get_information() {
    return this.state.search_information;
  }

  reset_state() {
    this.setState({
      search_information: ""
    });
    this.search_value.current.firstElementChild.children[0].value = "";
  }

  render() {
    const {
      classes,
      source_of_request,
      room_id,
      favorite_room,
      updating_room_state
    } = this.props;
    return (
      <Paper className={classes.paper}>
        <AppBar
          className={classes.searchBar}
          position="static"
          color="default"
          elevation={0}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon className={classes.block} color="inherit" />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Search by artist...."
                  InputProps={{
                    disableUnderline: true,
                    className: classes.searchInput
                  }}
                  ref={this.search_value}
                  // onChange={data => this.set_information(data.target.value)}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.addUser}
                  onClick={() => this.set_information()}
                >
                  Search
                </Button>
                <Tooltip title="Reset">
                  <IconButton onClick={() => this.reset_state()}>
                    <RefreshIcon className={classes.block} color="inherit" />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={classes.contentWrapper}>
          <Typography color="textSecondary" align="center">
            {!this.state.search_information && "Heya! Search for songs."}
          </Typography>

          {this.state.search_information && (
            <Api
              item_search={this.state.search_information}
              source_of_request={source_of_request}
              room_id={room_id}
              favorite_room={favorite_room}
              updating_room_state={updating_room_state}
            />
          )}
        </div>
      </Paper>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Content);
