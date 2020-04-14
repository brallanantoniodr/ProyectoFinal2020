var express= require('express');
var router = express.Router();
var ObjectID=  require('mongodb').ObjectID;

function router_init(db){

  var ejemplo_collection = db.collection('ejemplo');

  router.get('/all', function(req, res, next){
     ejemplo_collection.find({}).toArray(
       function(err, docs){
         if ( err ) return res.status(404).json({error:"Error"});
         return res.status(200).json(docs);
       }
     );
  }); // get all

  router.get('/one/:id', function(req, res, next){
    var query = {"_id": ObjectID(req.params.id)};
    ejemplo_collection.findOne(query,{}, function(err, doc) {
      if(err){
        return res.status(404).json({"error":"No se encontró documento."});
      } else {
        return res.status(200).json(doc);
      }
    } ); //findOne
  }); // get one

  var _somedata = {
    index: 0,
    somedata: 0
  }

  router.post('/new', function(req, res, next){
    var _newSomeData = Object.assign({}, _somedata, req.body);
    // un proceso de validacion  de datos
    var _validated = true;
    if (!_validated) {
      return res.status(404).json({"error":"Hay Data Incoherente!"});
    } else {
      ejemplo_collection.insertOne( _newSomeData, {} , function(err, rslt) {
          if(err){
            return res.status(404).json({"error":"Error al Escribir Documento"});
          } else {
            // rslt.insertedCount == 1
            // ops
            return res.status(200).json(rslt.ops);
          }
      } ); // insertOne
    }
  }); // post new

  return router;
}

module.exports = router_init;
