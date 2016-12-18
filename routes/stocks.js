var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://cmerrick:outlast91@ds139278.mlab.com:39278/stock-portfolio', ['stocks']);
mongodb://<dbuser>:<dbpassword>@ds139278.mlab.com:39278/stock-portfolio
// Get All stocks
router.get('/stocks', function(req, res, next){
    db.stocks.find(function(err, stocks){
        if(err){
            res.send(err);
        }
        res.json(stocks);
    });
});

// Get Single stock
router.get('/stock/:id', function(req, res, next){
    db.stocks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, stock){
        if(err){
            res.send(err);
        }
        res.json(stock);
    });
});

//Save stock
router.post('/stock', function(req, res, next){
    var stock = req.body;
    if(!stock.title || !(stock.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.stocks.save(stock, function(err, stock){
            if(err){
                res.send(err);
            }
            res.json(stock);
        });
    }
});

// Delete stock
router.delete('/stock/:id', function(req, res, next){
    db.stocks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, stock){
        if(err){
            res.send(err);
        }
        res.json(stock);
    });
});

// Update stock
router.put('/stock/:id', function(req, res, next){
    var stock = req.body;
    var updStock = {};

    if(stock.isDone){
        updStock.isDone = stock.isDone;
    }

    if(stock.title){
        updStock.title = stock.title;
    }

    if(!updStock){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.stocks.update({_id: mongojs.ObjectId(req.params.id)},updStock, {}, function(err, stock){
        if(err){
            res.send(err);
        }
        res.json(stock);
    });
    }
});

module.exports = router;
