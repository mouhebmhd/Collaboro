var mongoose=require("mongoose");
var schema=new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    identifiantUtilisateur:{
        type:mongoose.Types.ObjectId,
        required:true
    }
});
var competence=mongoose.model("competences",schema);
module.exports=competence;