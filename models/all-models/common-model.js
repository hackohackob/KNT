var mongoose=require('mongoose'),
    Schema= mongoose.Schema;

var CommonSchema=new Schema({
    id:Number,
    name:String,
    style:String,
    script:{
        head:String,
        finish:String
    },
    description:String
});

mongoose.model('common',CommonSchema);