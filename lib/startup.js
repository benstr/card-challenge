Meteor.startup(function(){
  if(Meteor.isServer){
    if(Decks.find().count() < 100){
      lodash.forEach(lodash.range(100),function(){
        var shuffledDeck = lodash.shuffle(lodash.range(52));
        Decks.insert({array:shuffledDeck}, function(error,result){
          if(error){
            console.log(error);
          } else {
            lodash.forEach(shuffledDeck,function(val,key){
              CardPositions.insert({"position":key, "cardNum":val, "deck": result})
            });
          }
        });
      })
    }
  }
});