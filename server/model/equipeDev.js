var mongoose=require("mongoose");
const utilisateur = require("../model/utilisateur");
var projet=require("../model/projet");
var notification=require("../model/notification");
var schema=new mongoose.Schema({
    identifiantMembre:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    identifiantProjet:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    roleMembre:
    {
        type:String,
        required:true
    },
    isTechLead:
    {
        type:String,
        required:true
    }
});
schema.post('save',function(doc,next){
    projet.findOne({_id:doc.identifiantProjet})
    .then((project)=>{
        let projectName=project.titre;
        utilisateur.findOne({_id:project.identifiantScrumMaster})
        .then((scrumMaster)=>{
            let sm=scrumMaster.prenom+' '+scrumMaster.nom;
            let notif=new notification({
                recepteur:doc.identifiantMembre,
                contenu:"Félicitation! "+sm+" vous a assigné un nouveau rôle dans le projet "+projectName+" ."
            });
            notif.save();
            next();
        })
    })
});
schema.post('findOneAndUpdate',function(doc,next){
    projet.findOne({_id:doc.identifiantProjet})
    .then((project)=>{
        let projectName=project.titre;
        utilisateur.findOne({_id:project.identifiantScrumMaster})
        .then((scrumMaster)=>{
            let sm=scrumMaster.prenom+' '+scrumMaster.nom;
            
            let notif1=new notification({
                recepteur:doc.identifiantMembre,
                contenu:"Félicitation! "+sm+" vous a modifié votre  rôle dans le projet "+projectName+" .",
                dateEnvoie:Date.now().toString()
            });
            notif1.save();
            next();
        })
    })
});





var membre=mongoose.model("equipes",schema);
module.exports=membre;