Template.shuffler.events({
  'click [data-action=shuffleCards]': function(){
    Blaze._globalHelpers.shuffle(deck);
  }
});
Template.shuffler.helpers({
  cardName: function(){
    templateDeck = [];
    _.forEach(shuffledDeck.get(),function(n,key){
      templateDeck[key] = "card"+n;
    });
    return templateDeck;
  }
});