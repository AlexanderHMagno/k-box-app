import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

export const Favorites = new Mongo.Collection("favorites");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("favorites", function userFavorites() {
    return favorite.find({});
  });
}

var userFav = ["artist", "title"];
Meteor.methods({
  //   "favorites.insert"(userFav) {
  "favorites.insert"(artist, title) {
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    Favorites.insert({
      artist,
      title,
      createdAt: new Date(),
      owner: this.userId
    });
  },

  "favorites.remove"(favoriteId) {
    check(favoriteId, String);
    const favorite = favorite.findOne(favoriteId);
    if (favorite.owner !== this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    Favorites.remove(favoriteId);
  }

  //   Favorites.update(favouriteId, { $set: { }});
});
