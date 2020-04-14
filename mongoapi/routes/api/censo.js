var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
function initcenso(db){

  var censoCollection = db.collection('Registropersona');

  router.get('/franciscomorazan', function(req, res, next) {

    censoCollection.find({"departamento":"franciscomorazan"}).toArray( function (err, censo) {
      if(err) return res.status(500).json({"error": err});
      return res.status(200).json(censo);
    });
  }); //get franciscomorazan

  router.get('/cortes', function(req, res, next) {

    censoCollection.find({"departamento":"cortes"}).toArray( function (err, censo) {
      if(err) return res.status(500).json({"error": err});
      return res.status(200).json(censo);
    });
  }); //get cortes

  router.get('/olancho', function(req, res, next) {

    censoCollection.find({"departamento":"olancho"}).toArray( function (err, censo) {
      if(err) return res.status(500).json({"error": err});
      return res.status(200).json(censo);
    });
  }); //get olancho

    router.post('/newpersona', function(req, res, next) {
      var _persona = {
        "Nombrepersona": req.body.Nombrepersona,
        "FechaNacimiento": req.body.FechaNacimiento,
        "Tipogenero": req.body.Tipogenero,
        "Numerocedula": req.body.Numerocedula,
        "Codigoarea": req.body.Codigoarea,
        "estadocivil": req.body.estadocivil,
        "Pesopersona": req.body.Pesopersona,
        "departamento": req.body.departamento,        
      }
      censoCollection.insertOne( _persona , function( err, rslt) {
          if(err) return res.status(500).json({"error":true});
          return res.status(200).json(rslt.ops[0]);
      });
    }); 

  return router;

}



module.exports = initcenso;
