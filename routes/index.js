var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var jade = require('jade');

module.exports = function (data) {
    var router = express.Router();

    router
        .post('/pages', function (req, res) {
            data.pages.savePage(req.body)
                .then(function(page){
                    res.send("Done");
                },
                function(err){
                    res.status(400)
                        .json(err);
                });
        })
        .get('/test',function(req,res){
            console.log('rendering test');
            res.render('test');
        })
        .post('/common', function (req, res) {
            console.log('will save common');
            console.log(req.body);
            data.common.save(req.body)
                .then(function(page){
                    res.send("Done");
                },
                function(err){
                    res.status(400)
                        .json(err);
                });
        })
        .post('/custom', function (req, res) {
                    res.send("Done");
        })
        .get('/',function(req,res){
            res.redirect('/index3');
        })
        .get('/:path', function (req, res) {
            //console.log(req.params);
            var path=req.path;
            if(path[0]==='/'){
                path=path.slice(1);
            }
            console.log('Path:'+path);
            data.pages.byName(path)
                .then(function(page){
                    data.common.inject(page,path)
                        .then(function(page){
                            res.render('index',page);
                        },function(err){
                            res.status(400)
                                .render('error');
                        });
                },
                function(err){
                    res.status(400)
                        .render('error');
                });
        });

    return router;

};


//var home={
//  jade:'extends ./views/layout \nblock content \n    h1 Hackoooo #{title} #{something}',
//  locals:{
//    title:'Hacko',
//    something:'Nasko'
//  }
//};
///* GET home page. */
//router.get('/', function(req, res) {
//  data.pages.
//  res.render('index', { something: '<div style="min-height:200px; background-color:red;">YES </div>' });
//});
//
//router.get('/users', function(req, res) {
//  res.render('error');
//});
//
//router.get('/*', function(req, res) {
//  console.log('/*');
//  res.render('error');
//});
//
//module.exports = router;
