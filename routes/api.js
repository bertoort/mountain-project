var express = require('express');
var router = express.Router();
var phantom = require('../bin/phantom.js');
var cheerio = require('cheerio');
var normalize = require('../bin/logic.js').normalize
var addToList = require('../bin/logic.js').addToList

// gets front page links
router.get('/', function(req, res, next) {
  phantom().then(result => {
    $ = cheerio.load(result.content);
    var list = [];
    addToList(list, $('.destArea a'));
    addToList(list, $('.destSubArea a'));
    res.json({ data: list });
    result.sitepage.close();
    result.phInstance.exit();
  }).catch(error => {
    console.log(error);
  })
});

// gets gps location
router.get('/v/:name/:id', function(req, res, next) {
  var info = {
    id: req.params.id,
    name: req.params.name
  }
  phantom(info).then(result => {
    var regexp = /(http:\/\/maps.google.com\/maps\?q=)(.*?)(?=&amp;t=h)/
    var location = result.content.match(regexp)
    res.json({ data: location[2] });
    result.sitepage.close();
    result.phInstance.exit();
  }).catch(error => {
    console.log(error);
  })
});

// gets link and id to all states
router.get('/states', function(req, res, next) {
  phantom().then(result => {
    $ = cheerio.load(result.content);
    var list = [];
    addToList(list, $('.destArea a'));
    res.json({ data: normalize(list) });
    result.sitepage.close();
    result.phInstance.exit();
  }).catch(error => {
    console.log(error);
  })
});

// gets link and id to all top areas
router.get('/top-areas', function(req, res, next) {
  phantom().then(result => {
    $ = cheerio.load(result.content);
    var list = [];
    addToList(list, $('.destSubArea a'));
    res.json({ data: normalize(list) });
    result.sitepage.close();
    result.phInstance.exit();
  }).catch(error => {
    console.log(error);
  })
});

module.exports = router;
