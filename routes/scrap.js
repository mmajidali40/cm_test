
var express = require('express');
var router = express.Router();
var async = require('async');
var scrapeIt = require("scrape-it");

router.get('/', function(req, res, next) {

  var query = req.query;
  var addresses;
  if(Object.keys(query).length == 0 || query.address == null)
  {
    return res.send('no link is provided');
  }
  if(!Array.isArray(query.address)) {
    addresses = [];
    addresses.push(query.address);
  } else {
    addresses = query.address;    
  }
  callbackFlow(addresses, res);
  // asyncFlow(addresses, res);
  // promisFlow(addresses, res);
});

module.exports = router;

function callbackFlow(addresses, res) {
  var result = [];
  addresses.forEach(function(add){
    scrapeIt(add, {
      title: "title"
    }, function(err, data) {
        var obj = {
          url: add,
          title: ''
        };
        if(err) {
        obj.title = 'NO RESPONSE';
        result.push( obj );
      } else {
        console.log(`Status Code: ${data.response.statusCode}`)
        console.log(data.data);
        obj.title = data.data.title;
        result.push( obj );
      }
      if(result.length >= addresses.length) {
        res.render('scrap', { result: result});
      }
    });
  });
}

function promisFlow(addresses, res) {
  var promiseArray = [];
  var result = [];
  addresses.forEach(function(url) {
    var obj = {
      url: url,
      title: ''
    };
    promiseArray.push( scrapeIt(url, {
      title: "title"
    }).then(({ data, response }) => {
      console.log(`Status Code: ${response.statusCode}`)
      console.log(data);
      obj.title = data.title;
      result.push( obj );
    }).catch( (error) => {
      obj.title = 'NO RESPONSE';
      result.push( obj );
    }) );
  });
  Promise.all(promiseArray).then( () => {
    res.render('scrap', { result: result});
  });
}

function asyncFlow(addresses, res) {
  var result = [];
  var index = 0;
  async.whilst(
      function() { return index < addresses.length; },
      function(callback) {
        index++;
        scrapeIt(addresses[index-1], {
          title: "title"
        }, function(err, data) {
          var obj = {
              url: addresses[index-1],
              title: ''
            };
            if(err) {
            obj.title = 'NO RESPONSE';
            result.push( obj );
          } else {
            console.log(`Status Code: ${data.response.statusCode}`)
            console.log(data.data);
            obj.title = data.data.title;
            result.push( obj );
          }
          callback(null, index);
        });
      },
      function (err, n) {
        res.render('scrap', { result: result});
      }
  );
}