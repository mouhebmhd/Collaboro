var mongoose=require("mongoose");
var notificationSchema=require('../model/notification');
var utilisateur=require('../model/utilisateur');
//Definition de la structure d'un enregistrment contenant un projet
var schema= new mongoose.Schema({
    titre:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    dateDebut:{
        type:String,
        required:true
    },
    DateFin:{
        type:String,
        required:false
    },
    budget:{
        type:String,
        required:true
    },
    statut:{
        type:String,
        required:true
    },
    cahierCharge:{
        type:String,
        required:false
    },
    definitionOfDone:{
        type:String,
        required:true
    },
    identifiantProductOwner:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    domaine:{
        type:String,
        required:true
    },
    identifiantScrumMaster:{
        type:mongoose.Types.ObjectId,
        required:true
    }
});
schema.post('save',function(doc,next){
    var po=utilisateur.findOne({_id:doc.identifiantProductOwner})
    .then(data=>{
let notification=new notificationSchema({
    recepteur:doc.identifiantScrumMaster,
    contenu:data.nom+' '+data.prenom+' '+'vous a désigné comme un Scrum Master pour un nouveau projet  appelé '+doc.titre,
    dateEnvoie:Date.now().toString()
});
    notification.save()
    next();
})
});
schema.post('updateOne',function(doc,next){
    var po=utilisateur.findOne({_id:doc.identifiantProductOwner})
    .then(data=>{
let notification=new notificationSchema({
    recepteur:doc.identifiantScrumMaster,
    contenu:data.nom+' '+data.prenom+' '+'vous a désigné comme un Scrum Master pour le projet appelé '+doc.titre
});
    notification.save()
    next();
})
});
const projet = mongoose.model('projets', schema);
module.exports=projet;
