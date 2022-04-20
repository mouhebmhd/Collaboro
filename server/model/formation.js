var  mongoose=require('mongoose');

var schema= new mongoose.Schema({
    certificat:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    institut:{
        type:String,
        required:true
    },
    annee:{
        type:String,
        required:true
    },
    domaine:{
        type:String,
        required:true
    },
    identifiantUtilisateur:
    {
        type:mongoose.Types.ObjectId,
        required:true
    }
});
const formation=mongoose.model("formations",schema);
module.exports=formation;