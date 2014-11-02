var mongoose=require('mongoose');
var Promise=require('bluebird');
var Page=mongoose.model('pages');
//var Common=mongoose.model('common');
var fs=require('fs');

function save(page) {
    console.log('Preparing to save ' + JSON.stringify(person));
    var promise = new Promise(function (resolve, reject) {
        var dbPerson = new Page(page);
        dbPerson.save(function (err, dbData) {
            if (err) {
                reject(err);
                return;
            }

            resolve(dbData);
        })
    });

    return promise;
}

function savePage(body) {
    console.log('Preparing to save ');
    console.log(body);
    var promise = new Promise(function (resolve, reject) {
        var pageToSave={
            id:body.id,
            name:body.name,
            head:body.head,
            scripts:body.scripts,
            header:body.header,
            content:body.content,
            locals:body.locals,
            dateCreated:body.dateCreated
        };
        var dbPage = new Page(pageToSave);
        dbPage.save(function (err, dbData) {
            if (err) {
                reject(err);
                return;
            }

            resolve(dbData[0]);
        })
    });

    return promise;
}

function getById(id) {
    var promise = new Promise(function (resolve, reject) {
        Page.findById(id, function (err, page) {
            if (err) {
                reject(err);
                return;
            }
            resolve(page);
        });
    })

    return promise;
}

function getByName(name) {
    var promise = new Promise(function (resolve, reject) {
        Page.find({name:name}, function (err, page) {
            if (err) {
                reject(err);
                return;
            }
            if(page.length===0){
                reject({message:'Page not found',code:404});
            }
            resolve(page[0]);

        });
    });

    return promise;
}

function getAll(){
    var promise = new Promise(function (resolve, reject) {
        Page.find({}, function (err, page) {
            if (err) {
                reject(err);
                return;
            }
            resolve(pages);
        });
    });

    return promise;
}

function deleteByQuery(query){
    var promise = new Promise(function (resolve,reject){
        console.log('deletion query: '+query);
        Page.remove(query,function(err,done){
            if(err){
                reject(err);
                return;
            }

            resolve(done);
        })
    })
};

module.exports ={
    name:'pages',
    data:{
        save: save,
        all: getAll,
        byId: getById,
        byName:getByName,
        delQuery:deleteByQuery,
        savePage:savePage
    }
};