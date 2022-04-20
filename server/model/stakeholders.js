var mongoose=require("mongoose");
var notification=require("./notification");
const projet=require('./projet');
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
    }
});
schema.post("save",function(doc,next){
    projet.findOne({_id:doc.identifiantProjet})
    .then((project)=>{
        let projectName=project.titre;
            let notif=new notification({
                recepteur:doc.identifiantMembre,
                contenu:"Félicitation!  vous êtes designé comme un Stakeholder pour le projet  "+projectName+" ."
            });
            notif.save();
            next();
    })
});
schema.post("findOneAndUpdate",function(doc,next){
    projet.findOne({_id:doc.identifiantProjet})
    .then((project)=>{
        let projectName=project.titre;
        this.findOne({_id:doc._id})
        .then(data=>{
              let notif=new notification({
                recepteur:doc.identifiantMembre,
                contenu:"Félicitation!  votre role dans le projet  "+projectName+" est mis à jour ."
            });
            notif.save();
            next();
        })
          
    })
});

var membre=mongoose.model("stakeholders",schema);
module.exports=membre;