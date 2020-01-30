'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var mongoose = require('mongoose');
var objectId = mongoose.Types.ObjectId
var request = require('request-promise-native')

const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

// Schema definition 

var stockSchema = new mongoose.Schema({ 
  code: String,
  likes: { type: [String], default: []}
});

var Stock = mongoose.model('stock', stockSchema)

function saveStock(code, like, ip) {
  return Stock.findOne({ code: code })
    .then(stock => {
      if (!stock) {
        let newStock = new Stock({ code: code, likes: like ? [ip] : [] })
        return newStock.save()
      } else {
        if (like && stock.likes.indexOf(ip) === -1) {
          stock.likes.push(ip)
        }
        return stock.save()
      }
    })
};

function parseData(data) { 
  let i  = 0;
  let stockData = [];
  let likes = [];
  while (i < data.length) { 
    let stock = { stock: data[i].code, price: parseFloat(data[i+1]) }
      likes.push(data[i].like.length)
      stockData.push(stock)
      i += 2
  }

  if (likes.length > 1) { 
    stockData[0].rel_likes = likes[0] - likes[1]
    stockData[1].rel_likes = likes[1] - likes[0]
  } else { 
    stockData[0].likes = likes[0]
    stockData = stockData[0]
  }

  return stockData

};

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(function (req, res){
      let code = req.query.stock || ''
      if (!Array.isArray(code)) { 
        code = [code]
      }
      
      let promises = [] 
      code.forEach(code => { 
        promises.push(saveStock(code.toUpperCase(), req.query.like, req.ip))
        
        //uses Freecode camps stock price proxy
        let url = `https://repeated-alpaca.glitch.me/v1/stock/${code.toUpperCase()}/quote`
        promises.push(request(url))
      })
        
      Promise.all(promises)
        .then(data => { 
          let stockData = parseData(data)
          res.json({ stockData })
        })
        .catch (err => { 
          console.log(err)
          res.send(err)
        })
      })
    
};
