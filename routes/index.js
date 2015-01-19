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
                res.render('error-unauth');
            }
        })
        .get('/test',function(req,res){
            res.render('test');
        })
        .get('/test2',function(req,res){
            res.render('test2');
        })
        .get('/change/:name',function(req,res){
            if(req.cookies.TU=='qazwsx') {
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
                res.render('error-unauth');
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
                res.render('error-unauth');
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
                res.render('error-unauth');
            }
        })
        .get('/admin',function(req,res){
            if(req.cookies.TU=='qazwsx'){
                res.render('admin');
            } else {
                res.render('error-unauth');
            }
        })
        .get('/admin/7809',function(req,res){
            res.cookie("TU","qazwsx",{});
            res.redirect('/admin');
        })
        .get('/admin/unauthorize',function(req,res){
            res.clearCookie('TU').redirect('/');
        })
        .get('/deletePages', function (req, res) {
            data.pages.delQuery({})
                .then();
        })
        .get('/', function(req, res) {
            data.pages.byName('index')
                .then(function(page) {
                    res.render('index', page);
                }, function(err) {
                    res.status(400)
                       .render('error');
                });
        })
        .get('/page/:name',function(req,res){
            var path=req.path;
            path=path.split('/')[2];
            if(path[0]==='/'){
                path=path.slice(1);
            }
            
            data.pages.byName(path)
                .then(function(page){
                    res.json(page);
                },
                function(err){
                    res.status(400)
                        .render('error');
                });
        })
        .get('/:path', function (req, res) {
            var path=req.path;
            if(path[0]==='/'){
                path=path.slice(1);
            }
            
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
