
var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
//    var queryPrameters = Object.keys(req.query);
  var query = req.query;
  if(Object.keys(query).length == 0 || query.address == null)
  {
    console.log('no add');
  } else {
    console.log(Array.isArray(query.address));
  }
  const scrapeIt = require("scrape-it");
  var arr= ["https://ionicabizau.net","https://www.linkedin.com"];
  arr.forEach(function(e){
    console.log(scrape(e));
  });

  //res.send('yess');
  
  function scrape(url) {
    var value = true;
    var returnData;
    scrapeIt(url, {
      title: "title"
    }).then(({ data, response }) => {
      console.log(`Status Code: ${response.statusCode}`)
      console.log(data);
      returnData = data.title;
      value = false;
    })
    //while(value);
    return returnData;
  }

});

module.exports = router;