var deckSize = 52;
var successMsg = "Passed";
var failMsg = "Failed";
var deckId,deck,sample;
Tracker.autorun(function(){
  sampleLimit.set(Decks.find().count());
  deckId = currentDeckId.get();
  deck = Decks.findOne(deckId,{fields:{array:1}});
  sample = Decks.find({},{fields:{array:1}}).fetch();
  positions = CardPositions.find({"deck":{$not:deckId}}).fetch();
});

Template.auditor.helpers({
  poolSize: function(){
    return numeral(sampleLimit.get()).format('0,0');
  },
  auditNum: function(){
    var deckId = currentDeckId.get();
    if(!deckId){
      return "Pending Shuffle";
    } else {
      return deck.array.length===deckSize ? successMsg : failMsg;
    }
  },
  auditDup: function(){
    var deckId = currentDeckId.get();
    if(!deckId){
      return "Pending Shuffle";
    } else {
      return lodash.some(sample.pop(),{'array':deck.array}) ? failMsg : successMsg;
    }
  },
  auditDupRev: function(){
    var deckId = currentDeckId.get();
    if(!deckId){
      return "Pending Shuffle";
    } else {
      return lodash.some(sample.pop(),{'array':deck.array.reverse()}) ? failMsg : successMsg;
    }
  },
  auditFairness: function(){
    var deckId = currentDeckId.get();
    if(!deckId){
      return "Pending Shuffle";
    } else {
      var totalPast = 0;
      var totalDups = 0;
      lodash.forEach(deck.array,function(num,key){
        var keyPositions = lodash.filter(positions,{"position":key});
        var keyDups = lodash.filter(positions,{"position":key,"cardNum":num});
        totalPast = totalPast+keyPositions.length;
        totalDups = totalDups+keyDups.length;
      });
      return numeral(1-(totalDups/totalPast)).format('0.0%')+" fair";
    }
  }
});