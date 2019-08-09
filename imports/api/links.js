import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Links = new Mongo.Collection("links");
export const Rooms = new Mongo.Collection("rooms");

// added publication for rooms and server to allow clients to use data ie. data to client

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("rooms", function roomsKbox() {
    return Rooms.find();
  });
}

// if (Meteor.isClient) {
//   Meteor.subscribe("rooms");
// }

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("links", function linksKbox() {
    return Links.find();
  });
}

Meteor.methods({
  "links.insertFirstAccount"(id, username, email) {
    Links.insert({
      _id: id,
      username: username,
      email: email,
      favorites: [],
      friends: [],
      rooms: []
    });
  },
  "links.addFavorites"(owner, title, artist) {
    console.log("add to favorites");
    Links.update(
      { _id: owner },
      { $push: { favorites: { title, artist, createdAt: new Date() } } }
    );
  },

  "links.removeFavorites"(owner, title, artist) {
    console.log("removing favorite");
    // check(taskId, String);
    Links.update({ _id: owner }, { $pull: { favorites: { title, artist } } });
  },
  "links.setChecked"(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    Links.update(taskId, { $set: { checked: setChecked } });
  },
  "rooms.insertFirstRoom"(id) {
    Rooms.insert({
      name: "Favorites",
      image:
        "https://cdn.pixabay.com/photo/2016/02/05/19/51/stained-glass-1181864_1280.jpg",
      bio: "My favorite songs",
      users: [{ user: id }],
      tracks: [],
      administrator: {
        _id: id,
        username: Meteor.user().username
      },
      password: id,
      public: "no",
      favorite_room: "yes"
    });
  },
  "rooms.createNewRoom"(data_room, image) {
    Rooms.insert({
      name: data_room[0],
      image: image,
      bio: data_room[1],
      users: [{ user: Meteor.userId() }],
      tracks: [],
      administrator: { _id: Meteor.userId(), username: Meteor.user().username },
      password: data_room[2],
      public: "yes",
      favorite_room: "no"
    });
  },

  "rooms.addFavorites"(room_id, title, artist) {
    console.log("add to favorites");
    Rooms.update(
      { _id: room_id },
      {
        $push: {
          tracks: { title, artist, singer: Meteor.user().username }
        }
      }
    );
  },
  "rooms.removeFavorites"(room_id, title, artist) {
    console.log("remove favorites");
    Rooms.update(
      { _id: room_id },
      {
        $pull: {
          tracks: { title, artist, singer: Meteor.user().username }
        }
      }
    );
  },
  "rooms.subscription"(id) {
    Rooms.update({ _id: id }, { $push: { users: { user: Meteor.userId() } } });
  },
  "friends.solicitude"(id_sender, id_receiver, username, status) {
    Links.update(
      { _id: id_sender },
      {
        $push: {
          friends: {
            _id: id_receiver,
            username: username,
            status: status
          }
        }
      }
    );
  },
  "friends.interactWithRequest"(id, friends) {
    Links.update(
      { _id: id },
      {
        $set: {
          friends: friends
        }
      }
    );
  }
});
