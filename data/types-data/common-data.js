var mongoose = require('mongoose');
var Promise = require('bluebird');
var Common = mongoose.model('common');
var fs = require('fs');

function save(common) {
    var promise = new Promise(function (resolve, reject) {
        console.log(common);
        var commonToSave={
            id:common.id,
            name:common.name,
            style:common.style,
            script:{
                head:common['script-head'],
                finish:common['script-finish']
            },
            description:common.description
        };
        console.log(commonToSave);
        var dbCommon = new Common(commonToSave);
        dbCommon.save(function (err, dbData) {
            if (err) {
                reject(err);
                return;
            }

            resolve(dbData);
        })
    });

    return promise;
}


function getById(id) {
    var promise = new Promise(function (resolve, reject) {
        Common.findById(id, function (err, common) {
            if (err) {
                reject(err);
                return;
            }
            resolve(common);
        });
    })

    return promise;
}

function getByName(name) {
    var promise = new Promise(function (resolve, reject) {
        Common.find({name: name}, function (err, common) {
            if (err) {
                reject(err);
                return;
            }
            if (common.length === 0) {
                reject({message: 'Page not found', code: 404});
                return;
            }
            resolve(page[0]);
        });
    });

    return promise;
}

function getAll() {
    var promise = new Promise(function (resolve, reject) {
        Common.find({}, function (err, common) {
            if (err) {
                reject(err);
                return;
            }
            resolve(commons);
        });
    });

    return promise;
}

function deleteByQuery(query) {
    var promise = new Promise(function (resolve, reject) {
        console.log('deletion query: ' + query);
        Common.remove(query, function (err, done) {
            if (err) {
                reject(err);
                return;
            }

            resolve(done);
        })
    })
}

function injectCommon(page,path) {
    var promise = new Promise(function (resolve, reject) {
        var commonName;
        switch(path){
            case 'index3':commonName='index3'; break;
            case 'index4':commonName='test4'; break;
        };

        Common.find({name:commonName}, function (err, common) {
            if (err) {
                reject(err);
                return;
            } else if (common.length === 0) {
                resolve(page);
                return;
            }
            common=common[0];
            console.log('Common:'+common.name);
            if(common.style!=undefined){page.head += common.style;}
            if(common.script.head!=undefined){page.head += common.script[head];}
            if(common.script.finish!=undefined){page.scripts += common.script[finish];}
            //console.log(page1);
            resolve(page);
        });
    });

    return promise;
};

module.exports = {
    name: 'common',
    data: {
        save: save,
        all: getAll,
        byId: getById,
        byName: getByName,
        delQuery: deleteByQuery,
        inject:injectCommon
    }
};