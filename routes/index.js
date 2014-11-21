var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var router = express.Router();
var jade = require('jade');
var beautifyHtml = require('js-beautify').html;
var beautifyJs = require('js-beautify');

module.exports = function (data) {
    var router = express.Router();

    router
        .post('/pages', function (req, res) {
            if(req.cookies.TU=='qazwsx') {
                data.pages.savePage(req.body)
                    .then(function (page) {
                        res.redirect('/admin');
                    },
                    function (err) {
                        res.status(400)
                            .json(err);
                    });
            }else {
                res.render('error');
            }
        })
        .get('/test',function(req,res){
            console.log('rendering test');
            res.render('test');
        })
        .get('/test2',function(req,res){
            console.log('rendering test2');
            res.render('test2');
        })
        .get('/change/:name',function(req,res){
            if(req.cookies.TU=='qazwsx') {
                console.log('update ' + req.param('name'));
                data.pages.byName(req.param('name'))
                    .then(function (page) {

                        page.head=beautifyHtml(page.head);
                        page.scripts=beautifyHtml(page.scripts);
                        page.header=beautifyHtml(page.header);
                        page.content=beautifyHtml(page.content);
                        res.render('update', page);
                    }, function (err) {
                        res.status(404)
                            .render('error');
                    })
            }else {
                res.render('error');
            }
        })
        .post('/change', function (req, res) {
            if(req.cookies.TU=='qazwsx') {
                data.pages.updatePage(req.body)
                    .then(function (page) {
                        res.redirect('/admin');
                    },
                    function (err) {
                        res.status(400)
                            .json(err);
                    });
            }else {
                res.render('error');
            }
        })
        .post('/common', function (req, res) {
            if(req.cookies.TU=='qazwsx') {
                data.common.save(req.body)
                    .then(function (page) {
                        res.send("Done");
                    },
                    function (err) {
                        res.status(400)
                            .json(err);
                    });
            }else {
                res.render('error');
            }
        })
        .get('/admin',function(req,res){
            if(req.cookies.TU=='qazwsx'){
                res.render('admin');
            } else {
                res.render('error');
            }
        })
        .post('/admin/7809',function(req,res){
            res.cookie("TU","qazwsx",{})
        })
        .get('/deletePages', function (req, res) {
            data.pages.delQuery({})
                .then();
        })
        .get('/',function(req,res){
            res.redirect('/index');
        })
        .get('/:path', function (req, res) {
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
