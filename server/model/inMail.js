var mongoose=require("mongoose");
var schema=new mongoose.Schema({
    identifiantEmetteur:{
        type:String,
        required:true
    },
    identifiantRecepteur:{
        type:String,
        required:true
    },
    dateEnvoi:
    {
        type:Date,
        required:true
    },
    objet:{
        type:String,
        required:true
    },
    contenu:{
        type:String,
        required:true
    },
    statut:{
        type:String,
        required:true
    },
    deleted:{
        type:String,
        required:true
    }
});
var inmail=mongoose.model("inmails",schema);
module.exports=inmail;