var fs = require('fs');

var files = fs.readdirSync(__dirname + '/all-models');

for (var i = 0; len = files.length, i < len; i += 1) {
    require('./all-models/' + files[i]);
}

console.log('Loaded db models: ' + files.join(', '));
