var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

function api_init(db){

  var usuarios_collection = db.collection('usuarios');

  router.get('/all' , function(req,res, next){
    var options = {
      "projection": {
          "nombre":1,
          "apellido":1,
          "correo":1,
          "edad":1
      },
      //"sort":[ ["apellido",1], ["edad" , -1] ],
      "limit":10,
      "skip":10
    };
    usuarios_collection.find({}, options).toArray(
      function(err, docs){
        if(err) return res.status(404).json({"error":"no se encuentra documento"});
        return res.status(200).json(docs);
      }
    );//toArray
  });// get all

  router.get('/range/:ini/:end', function(req,res,next){
    var ini = parseInt(req.params.ini);
    var end = parseInt(req.params.end);
    var query = {"edad":{"$gte": ini , "$lte" : end}};
    usuarios_collection.find(query).toArray(
      function(err, docs){
        if(err) return res.status(404).json({"error":"Documentos No encontrados"});
        return res.status(200).json(docs);
      }
    ); //toArray
  }); // get range

    router.get('/color/:color', function(req,res,next){
      var color = req.params.color;
      var query = {"colores":color};
      usuarios_collection.find(query).toArray(
        function(err, docs){
          if(err) return res.status(404).json({"error":"No existe documentos"});
          return res.status(200).json(docs);
        }
      );//toArray
    }); //get color

 router.put('/login', function(req,res,next){
   var username = req.body.username || "";
   var password = req.body.password || "";

   var q = {"correo" : username}
   usuarios_collection.findOne( q , function(err, user){
      if(err){
        return res.status(403).json({"error":"Credenciales Incorrectas"});
      }
      if(! user){
        // var upd = {"$inc": {"failedCount":1}}
        // usuarios_collection.updateOne({"_id": user._id}, upd);
        return res.status(403).json({"error":"Credenciales Incorrectas"});
      } else {
        var upd = {"$inc": {"loggedtimes":1}, "$set":{"lastLogin": new Date().getTime()}};
        usuarios_collection.updateOne({"_id": user._id}, upd);
        //delete user.password;
        return res.status(200).json(user);
      }
   }); // findOne
 }); // get login

  router.put('/popular/:id', function(req,res,next){
      var q = {"_id":ObjectID(req.params.id)};
      var u = {"$inc":{"popularity":1}};
      var options = {returnOriginal:false};
      usuarios_collection.findOneAndUpdate(
          q,
          u,
          options,
          function(err, rslt){
              if(err) return res.status(404).json({"error":"Actualización Fallida"});
              var doc = rslt.value;
              res.status(200).json(doc);
          }
      ); // findOneAndUpdate
  });// put puplaritu

  router.put('/unpopular/:id', function(req,res,next){
      var q = {"_id":ObjectID(req.params.id)};
      var u = {"$inc":{"popularity":-1}};
      var options = {returnOriginal:false};
      usuarios_collection.findOneAndUpdate(
          q,
          u,
          options,
          function(err, rslt){
              if(err) return res.status(404).json({"error":"Actualización Fallida"});
              var doc = rslt.value;
              res.status(200).json(doc);
          }
      ); // findOneAndUpdate
  });// put unpuplaritu

  router.put('/resetlogindata/:id', function(req,res,next){
      var q = {"_id":ObjectID(req.params.id)};
      var tu = {"loggedtimes":0, "lastLogin":0};
      tu = Object.assign({}, tu, req.body);
      var u = {"$set":tu};
      var options = {returnOriginal:false};
      usuarios_collection.findOneAndUpdate(
          q,
          u,
          options,
          function(err, rslt){
              if(err) return res.status(404).json({"error":"Actualización Fallida"});
              var doc = rslt.value;
              res.status(200).json(doc);
          }
      ); // findOneAndUpdate
  });// put unpuplaritu

  router.put('/addrol/:id/:rol', function(req,res,next){
      var q = {"_id":ObjectID(req.params.id)};
      // siempre debe haber validacion de entrada de datos
      var u = {"$push":{"roles": req.params.rol}};
      var options = {returnOriginal:false};
      usuarios_collection.findOneAndUpdate(
          q,
          u,
          options,
          function(err, rslt){
              if(err) return res.status(404).json({"error":"Actualización Fallida"});
              var doc = rslt.value;
              res.status(200).json(doc);
          }
      ); // findOneAndUpdate
  });// put unpuplaritu

  router.delete('/delete/:id', function(req, res, next){
    var q = {"_id": ObjectID(req.params.id)};
    usuarios_collection.deleteOne(q, {},function(err, rslt){
      if(err) return res.status(404).json({"error":"No se pudo eliminar"});
      return res.status(200).json({"deleted": rslt.deletedCount});
    });// deleteOne
  }); //delete
  return router;
} // api_init

module.exports = api_init;
