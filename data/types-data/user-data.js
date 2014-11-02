var mongoose = require('mongoose');
var User = mongoose.model('users');
var Promise = require('bluebird');


//function loginUser(user) {
//    var promise = new Promise(function (reject, resolve) {
//        User.findOne({username: user.username})
//            .exec(function (err, foundUser) {
//                if (err) {
//                    reject(err);
//                } else if (!foundUser) {
//                    reject({
//                        message: 'username not found!'
//                    });
//                } else {
//                    if (
//                        foundUser.authenticate(user.password)) {
//                        //console.log('user cookies: '+cookie.toString());
//                        foundUser.generateNewToken();
//                        resolve(foundUser);
//                    } else if(!foundUser.authenticate(user.password)){
//                        reject({message: 'Incorrect password'});
//                    } else {
//                        reject(err);
//                    }
//                }
//            });
//    });
//
//    return promise;
//}
//
//function registerUser(user) {
//    var promise = new Promise(function (resolve, reject) {
//
//        User.findOne({username: user.username})
//            .exec(function (err, foundUser) {
//                if (err) {
//                    reject(err);
//                } else if (foundUser) {
//
//                    reject({
//                        message: 'User exist'
//                    });
//                } else {
//
//                    var newSalt = User.generateSalt();
//                    var auth=User.encrypt(user.password,newSalt);
//                    var newUser = new User({
//                        username: user.username,
//                        salt:newSalt,
//                        authCode:auth
//                    });
//
//                    newUser.save(function (err, savedUser) {
//                        if (err)
//                            reject(err);
//                        resolve(newUser);
//                    });
//                }
//            });
//    });
//
//    return promise;
//}
//
//function findUserByToken(token) {
//    var promise = new Promise(function (resolve, reject) {
//        User.find({tokens:token})
//            .exec(function(err,foundUserArray){
//                if(err){
//                    reject(err);
//                } else if(foundUserArray.length===0){
//                    reject({message:'Token not found!'});
//                } else {
//                    resolve(foundUserArray[0]);
//                }
//            });
//    });
//
//    return promise;
//}
//
//function logoutUser(username,token) {
//    var promise=new Promise(function(reject,resolve) {
//
//        token = token.split('Bearer').join('').split(' ').join('');
//
//        User.find({username: username})
//            .exec(function (err, foundUserArray) {
//                if (err) {
//                    reject(err);
//                } else if (foundUserArray.length === 0) {
//                    reject({
//                        message: 'user not found with that username'
//                    });
//                } else {
//                    var user = foundUserArray[0];
//                    var tokenArray = user.tokens;
//                    var tokenArray2=[];
//                    for(var i= 0,len=tokenArray.length;i<len;i+=1){
//                        if(tokenArray[i]!=token){
//                            tokenArray2.push(tokenArray[i]);
//                        }
//                    }
//                    //TODO:DO IT BETTER
//                    tokenArray=tokenArray2;
//                    user.tokens = tokenArray;
//                    resolve(user);
//                }
//            });
//    });
//
//    return promise;
//}
//
//function findAllUsers() {
//    var promise = new Promise(function (resolve, reject) {
//        User.find({}, {_id: 0, __v: 0,tokens:0,authCode:0,salt:0})
//            .exec(function (err, users) {
//                if (err) {
//                    reject(err);
//                }
//                resolve(users);
//            });
//    });
//
//    return promise;
//}

module.exports = {
    name: 'users' //,
    //data: {
    //    login: loginUser,
    //    register: registerUser,
    //    logout: logoutUser,
    //    findByToken: findUserByToken,
    //    all: findAllUsers
    //}
};
