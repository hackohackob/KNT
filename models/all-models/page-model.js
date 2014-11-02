var mongoose=require('mongoose'),
    Schema= mongoose.Schema;

var PersonSchema=new Schema({
    id:Number,
    name:String,
    head:String,
    scripts:String,
    header:String,
    content:String,
    locals:Schema.Types.Mixed,
    dateCreated:String
});

mongoose.model('pages',PersonSchema);