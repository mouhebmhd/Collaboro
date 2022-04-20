
var mongoose=require("mongoose");
var utilisateur=require("../model/utilisateur");
var project=require("../model/projet");
var skill=require("../model/competence");
var formation=require("../model/formation");
var bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
var equipeDev=require("../model/equipeDev");
var persona=require("../model/persona");
const stakeholder=require('../model/stakeholders');
const notification=require("../model/notification");
const task=require('../model/tache');
const risk=require('../model/risk');
const obstacle=require("../model/obstacle");
const sprint=require("../model/sprint");
const sprintItem=require("../model/sprintBacklog");
var Json=require("Json");
const userStory = require("../model/userStory");
const inmail=require('../model/inMail');
const meeting = require("../model/meeting");
const { notifications } = require("../services/render");
const { response } = require("express");

//this function is used to create a token the recently logged in user where we can store all his data 
function createToken(data)
{
return   jwt.sign({user:data},process.env.ACCESS_SECRET+data._id,{expiresIn:"24h"});
}
//this function is used to check if the user who is asking for a certain page or service,if he is logged in or no,the purpose here is to protect our data 
function checkAuthorization(req,res)
{
   let user=req.cookies['currentUser'];
   if(user)
   {
     return true;
   }
   else
   {
      return false;
   }
}
exports.loginAttempt= (req, res)=>
{
 utilisateur.findOne( {email:req.body.Email} )
 .then(data =>{
     if(data)
     {
     var trust=bcrypt.compareSync(req.body.Password,data.motDePasse);
     if (trust)
    { 
      //here we are going to send a token that contains the user informations  
      let token1=createToken(data);
      res.cookie('currentUser',token1, { maxAge:100*365*24*60*60*1000, httpOnly: true });
      res.redirect("/dashboard");
    }
    else
    {
      //the email is correct but the password given  is incorrect 
       res.render("loginPasswordError",{data:data});       
    }
    }
    else
    {
      //the email given by the user is incorrect ,we can not find any email in the database equal to the given one 
      res.render("loginEmailError");
    }
  })
 .catch(err =>{
   //some error occurs
        res.status(500).render("error500");
 })
}
exports.registerAttempt=(req,res)=>{ 
    var user=new utilisateur({
        nom :req.body.name,
        prenom :req.body.first_name,
        genre:req.body.gender,
        ville:req.body.city,
        pays :req.body.country,
        codePostale:req.body.postale_code,
        jourNaissance:req.body.day,
        moisNaissance:req.body.month,
        anneeNaissance:req.body.year,
        email:req.body.email,
        motDePasse:bcrypt.hashSync(req.body.password,10),
        telephone:req.body.phone,
        linkedin:"https://www.linkedin.com/search",
        photo:req.body.avatar
    });
    utilisateur.findOne( {email:req.body.email} )
    .then(data=>
    {
      if(data)
      {
        res.render("registerInvalidEmail")
      }
      else
      {
        user.save()
        .then(()=>{
          res.render("loginRegisterSuccess")
        })
        .catch(()=>{
          res.render("error500");
        })
      }
    }
    )
    .catch(()=>{
      res.render("error500");
    });
}
exports.createNewProject=(req,res)=>
{
  if(checkAuthorization(req,res)===true)
  {
    var projet= new project({
    titre:req.body.titre,
    description:req.body.description,
    dateDebut:req.body.day+"-"+req.body.month+"-"+req.body.year,
    DateFin:"",
    budget:req.body.budget,
    cahierCharge:req.body.cahierCharge,
    definitionOfDone:req.body.dod,
    statut:'En attente',
    identifiantProductOwner:jwt.decode(req.cookies['currentUser'],{complete:true}).payload.user._id,
    identifiantScrumMaster:req.body.scrumMaster,
    domaine:req.body.domaine
    });
    projet.save()
    .then(()=>
    {
     res.redirect("/projets");
    })
    .catch(()=>{
      res.status(500).render("error500");
    }
    )
  }
  else
  {
    res.render("login");
  }
}
exports.updateProject=(req,res)=>
{
  if(checkAuthorization(req,res)===true)
  {
   project.findOneAndUpdate({_id:req.body._id},{
    titre:req.body.titre,
    description:req.body.description,
    dateDebut:req.body.day+"-"+req.body.month+"-"+req.body.year,
    DateFin:"",
    budget:req.body.budget,
    cahierCharge:req.body.cahierCharge,
    definitionOfDone:req.body.dod,
    statut:'En attente',
    identifiantScrumMaster:req.body.scrumMaster,
    domaine:req.body.domaine
   })
   .then((data)=>{
     if(data)
     {
       res.redirect("/projets");
     }
     else
     {
      console.log("update failed");
    }
   })
   .catch(()=>{
     res.render("error500");
   })
  }
  else
  {
    res.render("login");
  }  
}     
exports.showDevTeam=(req,res)=>{
  if(checkAuthorization(req,res)===true)
  {  
    var members=[];
    equipeDev.find({identifiantProjet:req.params.id})
    .then((developers)=>
    {
      if(developers.length==0)
      {
        project.findOne({_id:req.params.id})
        .then(pro=>{
          res.render("manage_team",{data:jwt.decode(req.cookies['currentUser'],{complete:true}).payload.user,pro,developers:[],projet:req.params,personalData:[]});
        })
      }
      else{
      developers.forEach(element=>{
        utilisateur.findOne({_id:element.identifiantMembre})
        .then((data)=>
        {
          members[members.length]=data;
          if(members.length==developers.length)
          {
            project.findOne({_id:req.params.id})
            .then(pro=>{
              res.render("manage_team",{data:jwt.decode(req.cookies['currentUser'],{complete:true}).payload.user,developers:developers,pro,projet:req.params,personalData:members});
           })
          }
        })
      });
    }
    }
    )
  }
  else
  {
     res.render("login");
  }
}
exports.updateProfileContact=(req,res)=>{
  if(checkAuthorization(req,res))
  {
  
  }
  else
  {
    res.render("login");
  }
}

exports.updateSkills=(req,res)=>{
  if(checkAuthorization(req,res))
  {
    let sk;
      skill.deleteMany({identifiantUtilisateur:jwt.decode(req.cookies['currentUser'],{complete:true}).payload.user._id})
      .then(()=>{
       req.body.data.forEach(sk=>{
      if(sk!="")
      {
        let record=new skill({
          description:sk,
          identifiantUtilisateur:jwt.decode(req.cookies['currentUser'],{complete:true}).payload.user._id});
          record.save();
      }
    });
    });
    res.end();
  }
  else
  {
    res.render("login");
  }

}
exports.updateStudies=(req,res)=>{
  if(checkAuthorization(req,res))
  {
    formation.deleteMany({identifiantUtilisateur:jwt.decode(req.cookies['currentUser'],{complete:true}).payload.user._id})
    .then(()=>{
      let studies=req.body.cleanData;
      studies.forEach(study=>{
        let course=new formation({
          certificat:study.certificat,
          description:study.description,
          institut:study.institut,
          annee:study.annee,
          domaine:study.domaine,
          identifiantUtilisateur:jwt.decode(req.cookies['currentUser'],{complete:true}).payload.user._id
        });
        course.save();
      });
    res.end();
  }  
    )
  }
  else
  {
    res.end();
  }
}
exports.createNewUserStory=(req,res)=>{
  if(checkAuthorization(req,res))
  {
    let us=new userStory({
    estimation:parseInt(req.body.estimation) || 0,
    priorite:parseInt(req.body.priorite) || 1,
    acteur:req.body.actor,
    action:req.body.action,
    objectif:req.body.value,
    statut:"En attente",
    acceptanceCriteria:req.body.acceptnceCriteria,
    identifiantProjet:req.body.projectId,
    });
    us.save()
    .then(()=>{
      res.send("created");
    })
    .catch(()=>{
      res.send("failed");
     
    });
  }
  else
  {
    res.end();
  }
}
exports.createNewPersona=(req,res)=>{
  if(checkAuthorization(req,res))
  {
    let newPersona=new persona({
    identifiantProjet:req.body.id,
    nom:req.body.nom,
    adresse:req.body.adresse,
    genre:req.body.genre,
    age:req.body.age,
    profession:req.body.profession,
    status:req.body.status,
    description:req.body.description,
    objectifs:req.body.objectifs,
    environnement:req.body.environment,
    photo:req.body.photo
    });
    persona.findOne({identifiantProjet:req.body.id})
    .then((existe)=>{
      if(existe)
      {
        res.send('/project/showPersonas/'+req.body.id);
      }
      else
      {
        newPersona.save()
        .then(()=>{
          res.send('/project/showPersonas/'+req.body.id);
        })
        .catch(()=>{
          res.send("/error500");
        });
      }
    })
  }
  else
  {
    res.send("/login");
  }
}
exports.showStakeholders= ((req,res)=>{
  if(checkAuthorization(req,res)===true)
  {  
    var members=[];
    stakeholder.find({identifiantProjet:req.params.id})
    .then((stakeholders)=>
    {
  if(stakeholders.length==0)
      {
        res.render("manage_stakeholders",{data:jwt.decode(req.cookies['currentUser'],{complete:true}).payload.user,stakeholders:[],projet:req.params.id,personalData:[]});
      }
      else{
      stakeholders.forEach(element=>{
        utilisateur.findOne({_id:element.identifiantMembre})
        .then((data)=>
        {
          members[members.length]=data;
          if(members.length==stakeholders.length)
          {
          res.render("manage_stakeholders",{data:jwt.decode(req.cookies['currentUser'],{complete:true}).payload.user,stakeholders,projet:req.params.id,personalData:members});
          }
        });
      });
    }
    }
    )
  }
  else
  {
     res.render("login");
  }
})
exports.createNewStakeholder=(req,res)=>{
  if(checkAuthorization(req,res))
  {
    let sh=new stakeholder({
      identifiantMembre:req.body.member,
      identifiantProjet:req.body.project,
      roleMembre:'Non Assigné'
    });
    sh.save()
    .then(()=>{
      res.send('created');
    })
    .catch((error)=>{
      console.log(error);
      res.send('/error500');
    });
  }
  else
  {
    res.send("/login");
  }
}
exports.addNewTask=(req,res)=>
{
  if(checkAuthorization(req,res))
  {
    let tache=new task({
    description:req.body.descrtiption,
    estimation:parseInt(req.body.priority),
    statut:req.body.statut,
    dateFin:' ',
    identifiantUserStory:req.body.identifiantUserStory,
    identifiantUtilisateur:req.body.affectedTo
    });
    tache.save()
    .then(()=>{
      res.send("created");
    })
    .catch((error)=>{
     res.send("/error500");
    });

  }
  else
  {
    res.send("/login");
  }
}
exports.addNewImpediment=(req,res)=>{
  if(checkAuthorization(req,res))
  {
   let impediment=new obstacle({
    decription:req.body.description || 'Spécification de problème non déclaré',
    identifiantProjet:req.body.idProject,
    declaredBY:jwt.decode(req.cookies['currentUser'],{complete:true}).payload.user._id,
    dateDeclaration:req.body.date,
    statut:'En Attente'
   }); 
   impediment.save()
   .then(()=>{
    res.send("created");
   })
   .catch((error)=>{
    res.send("/error500");
  })
  }
  else
  {
    res.send("/login");
  }
}
exports.addNewRisk=(req,res)=>{
  if(checkAuthorization(req,res))
  {
    let risque=new risk({
      description:req.body.message,
      identifiantProjet:req.body.id,
      declaredBY:jwt.decode(req.cookies['currentUser'],{complete:true}).payload.user._id,
      dateDeclaration:req.body.date
    });
    risque.save()
    .then(()=>{
      res.send("created");
    })
    .catch((error)=>{
      res.send("/error500");
    })
  }
  else
  {
    res.send("/login");
  }
}
exports.startSprint=(req,res)=>
{
if(checkAuthorization(req,res))
{
let newSprint=new sprint({
  statut:'En attente',
  dateDebut:req.body.dateDebut,
  semaines:parseInt(req.body.weeks),
  heures:parseInt(req.body.hours),
  description:req.body.description,
  titre:req.body.description,
  identifiantProjet:req.body.projectId,
  jours:parseInt(req.body.days)
});
  newSprint.save()
  .then((spr)=>{
    for(var i=0;i<req.body.items.length;i++)
    {
      let provisoire=new sprintItem({identifiantSprint:spr._id,identifiantUserStory:req.body.items[i]});
      provisoire.save()
      .then(()=>{})
      .catch(()=>{res.send("error500");})
    }
    res.send("created");
  })
  .catch((error)=>{
    console.log(error);
  })
}
else
{
  res.send("/login");
}
}
exports.addMeeting=(req,res)=>{
  if(checkAuthorization(req,res))
  {
       let meet=new meeting({
        description:req.body.description,
        type:req.body.type,
        dateMeeting:req.body.date,
        heureMeeting:req.body.time,
        statut:'En Attente',
        createurMeeting:jwt.decode(req.cookies['currentUser'],{complete:true}).payload.user._id,
        identifiantProjet:req.body.project
        });
        if(req.body.type!="Personnel")
        {
          project.findById({_id:meet.identifiantProjet})
          .then(respo=>{
          meet.type+="("+respo.titre+")";
          meet.save()
          .then(()=>{
            res.send("created");
          })
          .catch((error)=>{
            res.send("/error500");
          })
        })
        }
        else
        {
          meet.save()
          .then(()=>{
            res.send("created");
          })
          .catch((error)=>{
            res.send("/error500");
          })
        }
  }
  else
  {
    res.send("/login");
  }
}
exports.sendInvitation=(req,res)=>{
  if(checkAuthorization(req,res))
  {
    let alert=new notification({
      recepteur:req.body.id,
    contenu:jwt.decode(req.cookies['currentUser'],{complete:true}).payload.user.prenom+' '+jwt.decode(req.cookies['currentUser'],{complete:true}).payload.user.nom+' vous invite à assister une réunion intitulée '+req.body.meetTitle+" aujourd'hui à "+req.body.meetTime,
    dateEnvoie:(Date.now())
    });
    alert.save()
    .then(()=>{
      res.send("sent");
    })
    .catch(error=>{
      res.send("/error500");
    })
  }
  else
  {
    res.send("/login");
  }
}
exports.sendNewMessage=(req,res)=>{
  if(checkAuthorization(req,res))
  {
    let message=new inmail({
    identifiantEmetteur:jwt.decode(req.cookies['currentUser'],{complete:true}).payload.user.email,
    identifiantRecepteur:req.body.destinataire,
    dateEnvoi:req.body.date,
    objet:req.body.objet,
    contenu:req.body.msg,
    statut:'Non Lu',
    deleted:'falsefalse'

    });
    message.save()
    .then(()=>{
      res.send("sent");
    })
    .catch(()=>{
      res.send("/error500");
    })
  }
  else
  {
    res.send("/login");
  }
}
