import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

const confirm_room = room => {
  MySwal.fire({
    html: `<span> Access Granted to <h1>${room}</h1></span>`,
    type: "success",
    confirmButtonColor: "green"
  });
};

export default function MediaCard(props) {
  const classes = useStyles();
  const { name, image, bio, creator, f_creator, room_creator } = props;

  const show_creator_button = creator === "Create";
  const show_join_button = creator === "Join";

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {bio}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* Show Current TAB BUTTONS */}
        {!show_creator_button && !show_join_button && (
          <div>
            <Button
              size="small"
              color="primary"
              onClick={() => room_creator(props)}
            >
              Enter
            </Button>
            <Button size="small" color="primary">
              Share
            </Button>
          </div>
        )}
        {/* Show Create TAB BUTTONS */}
        {show_creator_button && (
          <Button size="small" color="primary" onClick={() => f_creator()}>
            Create
          </Button>
        )}
        {/* Show JOIN TAB BUTTONS */}
        {show_join_button && (
          <Button size="small" color="primary" onClick={() => f_creator()}>
            Join
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
