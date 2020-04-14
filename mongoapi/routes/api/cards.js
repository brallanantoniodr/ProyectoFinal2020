var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
function initCards(db){
  var cardCollection = db.collection('cards');

  router.get('/all', function(req, res, next) {
    cardCollection.find({}).toArray( function (err, cards) {
      if(err) return res.status(500).json({"error": err});
      return res.status(200).json(cards);
    });
  }); //get all

    router.post('/add', function(req, res, next) {
      var _newCard = {
        "title": req.body.title,
        "text": req.body.text
      }
      cardCollection.insertOne( _newCard , function( err, rslt) {
          if(err) return res.status(500).json({"error":true});
          return res.status(200).json(rslt.ops[0]);
      });
      //return res.status(200).json({"inserted": true});
    }); // post add

    router.put('/setcolor', function(req, res, next) {
      var _id = new ObjectId(req.body.id);
      var query = {"_id":_id};
      var update = {"$set": {"color": parseInt(req.body.color)}};
      console.log(req.body);
      cardCollection.updateOne(query, update);
      res.status(200).json({"status":"ok"});
    }); //set color

  return router;

}



module.exports = initCards;
