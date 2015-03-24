deck = _.range(52);
shuffledDeck = new ReactiveVar(deck);
currentDeckId = new ReactiveVar(undefined);
Session.setDefault('counter', 0);

Template.registerHelper("shuffle",function(array){
  shuffledDeck.set(_.shuffle(array));
  console.log(shuffledDeck.get());
  Decks.insert({array: shuffledDeck.get()}, function(error,result){
    if(error){
      console.log(error);
    } else {
      currentDeckId.set(result);
    }
  });
});