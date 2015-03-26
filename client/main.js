Template.registerHelper("shuffle",function(array){
  shuffledDeck.set(lodash.shuffle(array));
  console.log(shuffledDeck.get());
  Decks.insert({array: shuffledDeck.get()}, function(error,result){
    if(error){
      console.log(error);
    } else {
      currentDeckId.set(result);
      lodash.forEach(shuffledDeck.get(),function(val,key){
        CardPositions.insert({"position":key, "cardNum":val, "deck": result})
      });
    }
  });
});