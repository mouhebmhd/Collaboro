const mongoose=require("mongoose");
//Definition de la structure d'un enregistrment contenant une tache
var schema=new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    estimation:{
        type:Number,
        required:true
    },
    statut:{
        type:String,
        required:true
    },
    dateFin:{
        type:String,
        required:true
    },
    dateDebut:{
        type:String,
        required:false
    },
    identifiantUserStory:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    identifiantUtilisateur:{
        type:mongoose.Types.ObjectId,
        required:true 
    }
});
const tache = mongoose.model('taches', schema);
module.exports = tache;