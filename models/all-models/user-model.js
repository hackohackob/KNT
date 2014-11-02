var mongoose=require('mongoose'),
    Schema= mongoose.Schema;

var PersonSchema=new Schema({
    id:Number
});

mongoose.model('users',PersonSchema);