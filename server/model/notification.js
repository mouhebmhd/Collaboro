var mongoose=require('mongoose');
var schema=new mongoose.Schema({
    recepteur:{
        type:mongoose.Types.ObjectId,
        require:true
    },
    contenu:{
        type:String,
        require:true
    },
    dateEnvoie:{
        type:String,
        required:false
    
    }
});
var notification=mongoose.model('notifications',schema);
module.exports=notification;