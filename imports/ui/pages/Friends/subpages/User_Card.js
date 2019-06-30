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
import Check from "@material-ui/icons/Check";
import PropTypes from "prop-types";
import { Links } from "../../../../api/links";
import { Meteor } from "meteor/meteor";
// import RenderToLayer from "material-ui/internal/RenderToLayer";
import { withStyles } from "@material-ui/core/styles";

const MySwal = withReactContent(Swal);
// const useStyles = makeStyles({
//   card: {
//     maxWidth: 345
//   },
//   media: {
//     height: 140
//   }
// });

const useStyles = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

// const delete_friend = function(_id, username, owner) {
//   Links.update(
//     { _id: owner },
//     {
//       $pull: {
//         friends: { _id: _id, username: username }
//       }
//     }
//   );
//   // this.setState({
//   // visible: !this.state.visible,
//   // friends:
//   Links.find(
//     { _id: Meteor.userId() },
//     { friends: 1, _id: 0, status: "friend" }
//   ).fetch();
//   // });
//   MySwal.fire({
//     html: `<span>   ${username} removed from friend list </span>`,
//     type: "success",
//     confirmButtonColor: "Green"
//   });
// };

// Links.update( this is to update the person receiving the invite info status
//   { _id: owner },
//   {
//     $push: {
//       friends: { _id: _id, username: username, status: "friendrequest" }
//     }
//   }
// );
// { friends: 1, _id: 0, status: "friendinvite" }
// const sendInvite = function(_id, username) {
//   let owner;
//   Links.update(
//     { _id: owner },
//     {
//       $push: {
//         friends: {
//           _id: _id,
//           username: username,
//           status: "friendinvite"
//         }
//       }
//     }
//   );
//   this.setState({
//     visible: !this.state.visible,
//     friends: Links.find({ _id: Meteor.userId() }).fetch()
//   });

//   MySwal.fire({
//     html: `<span>  Invitation sent to ${username}  </span>`,
//     type: "success",
//     confirmButtonColor: "Green"
//   });
// };

// const AcceptFriend = function(_id, username, friend, owner) {
//   // const { username, friend, owner } = this.props;
//   // console.log("Links is here ", Links);
//   // console.log(username, "user");
//   Links.update(
//     { _id: owner },
//     {
//       $push: {
//         friends: { _id: _id, username: username, status: friend }
//       }
//     }
//   );
//   Links.update(
//     { _id: owner },
//     {
//       $push: {
//         friends: { _id: _id, username: username, status: friend }
//       }
//     }
//   );
//   // this.setState({
//   // visible: !this.state.visible,
//   // friends:
//   Links.find(
//     { _id: Meteor.userId() },
//     { friends: 1, _id: 0, status: "friend" }
//   ).fetch();
//   // });
//   MySwal.fire({
//     html: `<span>  ${username} is now on your friend list </span>`,
//     type: "success",
//     confirmButtonColor: "Green"
//   });
// };

// const RejectFriend = function(_id, username, friendrequest, owner) {
//   // const { username, friend, owner } = this.props;
//   // console.log("Links is here ", Links);
//   // console.log(username, "user");
//   Links.update(
//     { _id: owner },
//     {
//       $pull: {
//         friends: { _id: _id, username: username, status: friendrequest }
//       }
//     }
//   );
//   // this.setState({
//   // visible: !this.state.visible,
//   // friends:
//   Links.find(
//     { _id: Meteor.userId() },
//     { friends: 1, _id: 0, status: "friend" }
//   ).fetch();
//   // });
//   MySwal.fire({
//     html: ` Friend Request from  ${username} has been removed`,
//     type: "success",
//     confirmButtonColor: "green"
//   });
// };

// const DeleteInvite = function(_id, username, friendinvite, owner) {
//   // const { username, friend, owner } = this.props;
//   // console.log("Links is here ", Links);
//   // console.log(username, "user");
//   Links.update(
//     { _id: owner },
//     {
//       $pull: {
//         friends: { _id: _id, username: username, status: friendinvite }
//       }
//     }
//   );
//   // this.setState({
//   // visible: !this.state.visible,
//   // friends:
//   Links.find(
//     { _id: Meteor.userId() },
//     { friends: 1, _id: 0, status: "friend" }
//   ).fetch();
//   // });
//   MySwal.fire({
//     html: ` Invite to  ${username}  has been removed`,
//     type: "success",
//     confirmButtonColor: "green"
//   });
// };

// export default function User_Card(props) {

class User_Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      friends: Links.find({ _id: Meteor.userId() }).fetch(),
      links: Links.find({}).fetch()
    };
    {
      // console.log(this.state.friends, "made it");
      // console.log(this.state.links, "all");
    }
  }

  sendInvite(_id, username) {
    let owner = Meteor.userId();
    console.log(owner, "this is owner");
    console.log(username, "usernname");
    Links.update(
      { _id: owner },
      {
        $push: {
          friends: {
            _id: _id,
            username: username,
            status: "invitefriend"
          }
        }
      }
    );
    Links.update(
      { _id: _id },
      {
        $push: {
          friends: {
            _id: owner,
            username: Meteor.user().username,
            status: "friendrequest"
          }
        }
      }
    );
    this.setState({
      visible: !this.state.visible,
      friends: Links.find({ _id: Meteor.userId() }).fetch()
    });

    MySwal.fire({
      html: `<span>  Invitation sent to ${username}  </span>`,
      type: "success",
      confirmButtonColor: "Green"
    });
  }

  AcceptFriend(_id, username) {
    let owner = Meteor.userId();
    console.log(_id, username, owner, "id", "user", "owner");

    const ownerObject = Links.findOne({ _id: owner });
    const friendObject = Links.findOne({ _id: _id });
    console.log(friendObject, "friendobj");
    console.log(ownerObject, "ownerObj");

    ownerObject.friends = ownerObject.friends.map(friend => {
      if (friend._id == _id) {
        return {
          _id: _id,
          username: username,
          status: "friends"
        };
      }
      return friend;
    });
    Links.update(
      { _id: owner },
      {
        $set: {
          friends: ownerObject.friends
        }
      }
    );

    friendObject.friends = friendObject.friends.map(friend => {
      if (friend._id == owner) {
        return {
          _id: owner,
          username: Meteor.user().username,
          status: "friends"
        };
      }
      return friend;
    });
    Links.update(
      { _id: friendObject._id },
      {
        $set: {
          friends: friendObject.friends
        }
      }
    );

    // Links.update(
    //   { _id: owner },
    //   {
    //     $pull: {
    //       friends: {
    //         _id: _id,
    //         username: username,
    //         status: "friendrequest"
    //       }
    //     }
    //   }
    // );
    // Links.update(
    //   { _id: _id },
    //   {
    //     $pull: {
    //       friends: {
    //         _id: owner,
    //         username: Meteor.user().username,
    //         status: "invitefriend"
    //       }
    //     }
    //   }
    // );

    // Links.update(
    //   { _id: owner },
    //   {
    //     $push: {
    //       friends: {
    //         _id: _id,
    //         username: username,
    //         status: "friends"
    //       }
    //     }
    //   }
    // );

    // Links.update(
    //   { _id: _id },
    //   {
    //     $push: {
    //       friends: {
    //         _id: owner,
    //         username: Meteor.user().username,
    //         status: "friends"
    //       }
    //     }
    //   }
    // );

    this.setState({
      visible: !this.state.visible,
      friends: Links.find({ _id: Meteor.userId() }).fetch()
    });

    MySwal.fire({
      html: `<span>  ${username} is now on your friend list </span>`,
      type: "success",
      confirmButtonColor: "Green"
    });
    if (this.props.onAcceptFriend) {
      this.props.onAcceptFriend();
    }
  }

  RejectFriend(_id, username) {
    let owner = Meteor.userId();

    Links.update(
      { _id: owner },
      {
        $pull: {
          friends: {
            _id: _id,
            username: username,
            status: "friendrequest"
          }
        }
      }
    );
    Links.update(
      { _id: _id },
      {
        $pull: {
          friends: {
            _id: owner,
            username: username,
            status: "invitefriend"
          }
        }
      }
    );
    this.setState({
      visible: !this.state.visible,
      friends: Links.find({ _id: Meteor.userId() }).fetch()
    });

    MySwal.fire({
      html: ` Friend Request from  ${username} has been removed`,
      type: "success",
      confirmButtonColor: "green"
    });
  }

  render() {
    const {
      name,
      classes,
      image,
      fav,
      type,
      f_creator,
      username,
      full_information,
      id_user
    } = this.props;

    const send_friend_request = type === "Request";
    const accept_friend_request = type === "Accept";
    const delete_friend_request = type === "Delete";

    let actions = null;
    if (type == "Request") {
      actions = (
        <Button
          size="small"
          color="primary"
          onClick={() => this.sendInvite(id_user, name)}
        >
          Send Friend Request
        </Button>
      );
    } else if (type == "Accept") {
      actions = (
        <div>
          <Button
            size="small"
            color="primary"
            onClick={() => this.AcceptFriend(id_user, name)}
          >
            Accept Friend Request
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => this.RejectFriend(id_user, name)}
          >
            Reject Friend Request
          </Button>
        </div>
      );
    } else if (type == "Delete") {
      actions = (
        <Button size="small" color="primary" onClick={() => DeleteInvite()}>
          Delete Friend Request
        </Button>
      );
    } else if (type == "DeleteFriend") {
      actions = (
        <>
          <div>
            <Button
              size="small"
              color="primary"
              onClick={() => delete_friend(id_user, name)}
            >
              Delete Friend
            </Button>
            <Button size="small" color="primary">
              Friends
              <Check />
            </Button>
          </div>
        </>
      );
    }

    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia className={classes.media} image={image} title={name} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {fav ? fav : "no favorite "}
              {fav > 1 ? "  favorite songs " : "song"}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {actions}
          {/* {delete_friend_request &&
            !send_friend_request &&
            !accept_friend_request && (
              <Button
                size="small"
                color="primary"
                onClick={() => DeleteInvite()}
              >
                Delete Friend Request
              </Button>
            )}
          {!delete_friend_request &&
            !send_friend_request &&
            !accept_friend_request && (
              <div>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => delete_friend(id_user, name)}
                >
                  Delete Friend
                </Button>
                <Button size="small" color="primary">
                  Friends
                  <Check />
                </Button>
              </div>
            )}

          {!delete_friend_request &&
            !send_friend_request &&
            !accept_friend_request && (
              <Button
                size="small"
                color="primary"
                onClick={() => this.sendInvite(id_user, name)}
              >
                Send Friend Request
              </Button>
            )}

          {accept_friend_request && (
            <div>
              <Button
                size="small"
                color="primary"
                onClick={() => this.AcceptFriend(id_user, name)}
              >
                Accept Friend Request
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={() => this.RejectFriend(id_user, name)}
              >
                Reject Friend Request
              </Button>
            </div>
          )} */}
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(useStyles)(User_Card);

// User_Card.propTypes = {
//   classes: PropTypes.object.isRequired
// };
