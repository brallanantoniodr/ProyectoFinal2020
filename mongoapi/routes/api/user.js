var express = require('express');
var router = express.Router();
var ObjectID= require('mongodb').ObjectID;

function api_init(db){

  var usuarios_collection= db.collection('usuarios');

  router.get('/all',function(req,res,next){
    var options ={
                 "projection":{
                       "nombre":1,
                       "apellido":1,
                       "correo":1,
                       "edad":1
                },
                "sort":[["apellido",1],["edad",-1]],
                "limit":10,
                "skip":10
    };
    usuarios_collection.find({},options).toArray(
      function(err,docs){
        if(err) return res.status(404).json({"error":"Error con el documento"});
        return res.status(200).json(docs);
      }
    );//toArray
  });//get all

  router.get('/range/:ini/:end',function(req,res,next){
    var ini= parseInt(req.params.ini);
    var end= parseInt(req.params.end);
    var query={"edad":{"$gte": ini, "$lte": end}};
    usuarios_collection.find(query).toArray(
      function(err,docs){
        if(err) return res.status(404).json({"error":"documento no encontrado"});
        return res.status(200).json(docs);
      }
    ); //toArray
  });//get range

  router.get('/color/:color',function(req,res,next){
    var color= req.params.color;
    var query={"colores":color};
    usuarios_collection.find(query).toArray(
      function(err,docs){
        if(err) return res.status(404).json({"error":"No existe documento"});
        return res.status(200).json(docs);
      }
    );//to array
  });// get color
  return router;
}// api init

module.exports= api_init;
