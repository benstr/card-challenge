Decks = new Mongo.Collection("decks");
CardPositions = new Mongo.Collection("cardPositions");
if(Meteor.isServer){
  CardPositions._ensureIndex({position:1,deck:1});
}
