var sampleLimit = 1000;

Template.auditor.helpers({
  poolSize: function(){
    return numeral(sampleLimit).format('0,0');
  },
  auditNum: function(){
    var deckId = currentDeckId.get();
    if(!deckId){
      return "Pending Shuffle";
    } else {
      var deck = Decks.findOne(deckId,{fields:{array:1}});
      var test = deck.array.length === 52;
      return test ? "Passed" : "Failed";
    }
  },
  auditDup: function(){
    var deckId = currentDeckId.get();
    if(!deckId){
      return "Pending Shuffle";
    } else {
      var sample = Decks.find({},{limit:sampleLimit, fields:{array:1}}).fetch();
      var deck = Decks.findOne(deckId,{fields:{array:1}});
      if(sample.length <= sampleLimit){
        var test = _.some(sample.pop(),{'array':deck.array});
      } else {
        var test = _.some(sample,{'array':deck.array});
      }
      return test ? "Failed" : "Passed";
    }
  },
  auditDupRev: function(){
    var deckId = currentDeckId.get();
    if(!deckId){
      return "Pending Shuffle";
    } else {
      var sample = Decks.find({},{limit:sampleLimit, fields:{array:1}}).fetch();
      var deck = Decks.findOne(deckId,{fields:{array:1}});
      if(sample.length <= sampleLimit){
        var test = _.some(sample.pop(),{'array':deck.array.reverse()});
      } else {
        var test = _.some(sample,{'array':deck.array.reverse()});
      }
      return test ? "Failed" : "Passed";
    }
  },
  auditOrder: function(){
    return "Code Not Complete"
  },
  auditOrderRev: function(){
    return "Code Not Complete"
  },
  auditSuitesSbS: function(){
    return "Code Not Complete"
  }
});