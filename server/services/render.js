var jwt = require("jsonwebtoken");
var utilisateur = require("../model/utilisateur");
var axios = require("axios");
var project = require("../model/projet");
var notification = require("../model/notification");
var equipeDev = require("../model/equipeDev");
const skill = require("../model/competence");
const formation = require("../model/formation");
const userStory = require("../model/userStory");
const persona = require("../model/persona");
const stakeholder = require("../model/stakeholders");
const task = require("../model/tache");
const obstacle = require("../model/obstacle");
const risk = require("../model/risk");
const meeting = require("../model/meeting");
const sprint = require("../model/sprint");
const inmail=require("../model/inMail");
const mongoose = require("mongoose");
const sprintItem = require("../model/sprintBacklog");
const { projectStat } = require("./workers");
const { response } = require("express");
const { listenerCount } = require("../model/utilisateur");
const projet = require("../model/projet");
require("dotenv").config();

//this function is used to check if the user who is asking for a page or a service is logged in or no 
function checkAuthorization(req, res) {
   let user = req.cookies['currentUser'];
   if (user) {
      return true;
   }
   else {
      return false;
   }
}
exports.homeRouter = (req, res) => {
   res.render('index');
}
exports.dashboard = (req, res) => {
   if (checkAuthorization(req, res) === true) {
      axios.get('http://localhost:8080/weather/' + jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user.ville + "&" + jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user.pays)
         .then(function (response) {
            axios.get('http://localhost:8080/project/byCategory/'+jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id)
            .then(respo=>{
               axios.get('http://localhost:8080/tasks/countForUser/'+jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id)
               .then(tasks=>{
            res.render('dashboard', {data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, weather: response.data,stats:respo.data,tasks:tasks.data });
         });
         });
         });
   }
   else {
      res.render('login');
   }
}
exports.login = (req, res) => {
   if (req.cookies['currentUser']) {
      var str = req.cookies['currentUser'].toString();
      var data = jwt.decode(str, { complete: true }).payload.user;
      res.redirect("/dashboard");
   }
   else {
      res.render("login");
   }
}
exports.register = (req, res) => {
   res.render('register');
}
exports.error404 = (req, res) => {
   res.render('error404');
}
exports.error500 = (req, res) => {
   res.render('error500');
}
exports.editMyProfile = (req, res) => {
   if (checkAuthorization(req, res) === true) {
      utilisateur.findOne({ _id: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id })
         .then((data) => {
            skill.find({ identifiantUtilisateur: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id })
               .then(skills => {
                  formation.find({ identifiantUtilisateur: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id })
                     .then((studies) => {
                        if (studies) {
                           res.render("editMyProfile", { data, skills, studies });
                        }
                        else {
                           res.render("editMyProfile", { data, skills, studies: [] });
                        }

                     })
               })
         })
         .catch(() => {
            res.render("error500");
         });
   }
   else {
      res.render('login');
   }
}
exports.logout = (req, res) => {
   res.clearCookie("currentUser");
   res.render('login');
}
exports.projects = (req, res) => {
   if (checkAuthorization(req, res) === true) {
      project.find({ $or: [{ identifiantProductOwner: { $eq: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id } }, { identifiantScrumMaster: { $eq: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id } }] })
         .then(projects => {
            axios.get('http://localhost:8080/workIn/' + jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id)
               .then(function (response) {
                  res.render("projets", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, projects: projects, other: response });
               })
               .catch(err => {
                  res.render("error500");
               })
         })
         .catch(() => {
            res.status(500).render("error500");
         })
   }
   else {
      res.render('login');
   }
}
exports.nouveauProjet = (req, res) => {
   if (checkAuthorization(req, res) === true) {
      utilisateur.find({ _id: { $ne: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id } })
         .then(users => {
            if (users) {
               res.render("newProject", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, users: users });
            }

         })
   }
   else {
      res.render('login');
   }
}
exports.notifications = (req, res) => {
   if (checkAuthorization(req, res) === true) {
      notification.find({ recepteur: { $eq: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id } }).sort({ dateEnvoie: -1 })
         .then((notifications) => {
            res.render("notifications", { notifications, data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user })
         })
         .catch(() => { res.render("error500") })
   }
   else {
      res.render('login');
   }
}

exports.showProject = (req, res) => {
   if (checkAuthorization(req, res) === true) {
      project.findOne({ _id: req.params.id })
         .then(projet => {
            axios.get('http://localhost:8080/project/techLead/'+projet._id)
            .then(techlead=>{
            axios.get('http://localhost:8080/project/countObstaclesAndRisks/' + projet._id)
               .then(function (statistics) {
                  utilisateur.findOne({ _id: projet.identifiantScrumMaster })
                     .then((sm) => {
                        utilisateur.findOne({ _id: projet.identifiantProductOwner })
                           .then((po) => {
                              if (projet.statut == "En Archive") {
                                 if (projet.identifiantProductOwner == jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id) {

                                    res.render("showProjectDone", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, projet: projet, scrumMaster: sm, productOwner: po, isPo: '', statistics,techlead:techlead.data });
                                 }
                                 else {
                                    res.render("showProjectDone", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, projet: projet, scrumMaster: sm, productOwner: po, isPo: 'd-none', statistics,techlead:techlead.data });
                                 }
                              }
                              else {
                                 if (projet.identifiantProductOwner == jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id) {
                                    res.render("showProjectPO", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, projet: projet, scrumMaster: sm, productOwner: po, statistics,techlead:techlead.data });
                                 }
                                 else if (projet.identifiantScrumMaster == jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id) {
                                    res.render("showProjectSM", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, projet: projet, scrumMaster: sm, productOwner: po, statistics,techlead:techlead.data });
                                 }
                                 else {
                                    equipeDev.findOne({ identifiantMembre: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id })
                                       .then((role) => {
                                          if (role) {
                                             res.render("showProjectDEV", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, projet: projet, scrumMaster: sm, productOwner: po, statistics,techlead:techlead.data });
                                          }
                                          else {
                                             res.render("showProjectOther", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, projet: projet, scrumMaster: sm, productOwner: po, statistics,techlead:techlead.data });
                                          }
                                       })
                                 }
                              }
                           })
                     })

               })})
         })
         .catch(() => { res.render("error500") })
   }
   else {
      res.render('login');
   }

}
exports.deleteNotification = (req, res) => {
   if (checkAuthorization(req, res) === true) {
      notification.findOneAndDelete({ _id: req.params.id })
         .then((data) => {
            if (data) {
               res.render("error500");
            }
         })
         .catch(() => { res.render("error500"); })
   }
   else {
      res.render('login');
   }
}
exports.deleteProject = (req, res) => {
   if (checkAuthorization(req, res) === true) {
      project.findOneAndRemove({ _id: req.params.id })
         .then((data) => {
            if (data) {
               project.findOneAndRemove({ _id: req.params.id })
                  .then(() => {
                     res.end();
                  })
            }
         })
   }
   else {
      res.render('login');
   }
}
exports.updateProject = (req, res) => {
   if (checkAuthorization(req, res) === true) {

      project.findOne({ _id: req.params.id })
         .then(projet => {
            utilisateur.find({ _id: { $ne: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id } })
               .then(users => {
                  res.render("updateProject", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, projet: projet, users: users });
               })
               .catch(() => {
                  res.render("error500");
               })
         })
         .catch(() => { res.render("error500") })
   }
   else {
      res.render('login');
   }

}
exports.addMember = (req, res) => {
   if (checkAuthorization(req, res) == true) {
      project.findOne({ _id: req.params.id })
         .then(work => {
            utilisateur.find({ $and: [{ _id: { $ne: work.identifiantProductOwner } }, { _id: { $ne: work.identifiantScrumMaster } }] })
               .then(developers => {
                  res.render("addMember", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, developers, projet: work });
               });
         });
   }
   else {
      res.render("login");
   }
}
exports.viewProfile = (req, res) => {
   if (checkAuthorization(req, res) == true) {
      utilisateur.findOne({ _id: req.params.id })
         .then(user => {
            formation.find({ identifiantUtilisateur: req.params.id })
               .then((studies) => {
                  skill.find({ identifiantUtilisateur: req.params.id })
                     .then((skills) => {
                        res.render("view_profile", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, user: user, skills, studies });
                     })
               })
         })
         .catch(() => {
            res.render("error500");
         })
   }
   else {
      res.render("login");
   }
}
exports.addMemberToTeam = (req, res) => {
   if (checkAuthorization(req, res) == true) {
      var idProject = req.body.project;
      var idMember = req.body.member;
      var member = new equipeDev({
         identifiantProjet: idProject,
         identifiantMembre: idMember,
         roleMembre: 'Non Assigné',
         isTechLead:'false'
      });
      equipeDev.find({ $and: [{ identifiantProjet: idProject }, { identifiantMembre: idMember }] })
         .then((exist) => {
            if (exist.length > 0) {
               res.end();
            }
            else {
               member.save()
                  .then(() => {
                     res.end();
                  })
                  .catch(() => {
                     res.render("error500");
                  })
            }
         })
   }
   else {
      res.render("login");
   }
}
exports.deleteMember = (req, res) => {
   if (checkAuthorization(req, res) === true) {
      let idMembre = req.params.id.substr(req.params.id.indexOf('=') + 1);
      let idProjet = req.params.idp.substr(req.params.id.indexOf('=') + 1);
      equipeDev.findOneAndRemove({ $and: [{ identifiantMembre: idMembre }, { identifiantProjet: idProjet }] })
         .then(() => {
            res.end();
         })
         .catch(() => {
            res.render("error500");
         })
   }
   else {
      res.render("login");
   }
}
exports.updateMemberRole = (req, res) => {
   if (checkAuthorization(req, res)) {
      let idMember = req.params.idMember.substr(req.params.idMember.indexOf('=') + 1);
      let idProjet = req.params.idProject.substr(req.params.idProject.indexOf('=') + 1);
      let NewRole = req.params.Role.substr(req.params.Role.indexOf('=') + 1);
      equipeDev.findOneAndUpdate({ $and: [{ identifiantMembre: idMember }, { identifiantProjet: idProjet }] }, { roleMembre: NewRole })
         .then(() => {
            res.end();
         })
         .catch(() => {
            res.render("error500");
         })
   }
   else {
      res.render("login");
   }
}
exports.updateProfile = (req, res) => {
   if (checkAuthorization(req, res)) {
      utilisateur.findById({ _id: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id })
         .then((user) => {
            if (user) {
               user.nom = req.body.data.nom,
                  user.prenom = req.body.data.prenom,
                  user.genre = req.body.data.gender,
                  user.ville = req.body.data.city,
                  user.pays = req.body.data.country,
                  user.codePostale = req.body.data.postale_code,
                  user.jourNaissance = req.body.data.day,
                  user.moisNaissance = req.body.data.month,
                  user.anneeNaissance = req.body.data.year,
                  user.email = req.body.data.email,
                  user.telephone = req.body.data.phone,
                  user.linkedin = req.body.data.linkedin,
                  user.photo = req.body.data.photo
               user.save().then(() => {
                  res.end()
               });
            }
            else {
               res.end();
            }
         })
   }
   else {
      res.render("login");
   }
}
exports.terminateProject = (req, res) => {
   if (checkAuthorization(req, res)) {
      axios.get('http://localhost:8080/date')
         .then(function (response) {
            project.findOneAndUpdate({ _id: req.params.id }, {
               statut: "En Archive",
               DateFin: response.data
            })
               .then(() => {
                  res.end();
               })
         })
         .catch(err => {
            res.send(err);
         })
   }
   else {
      res.render("login");
   }
}
exports.showProductBacklog = (req, res) => {
   if (checkAuthorization(req, res)) {
      userStory.find({ identifiantProjet: req.params.id }).sort({ priorite: -1 })
         .then((userStories) => {
            project.findOne({ _id: req.params.id })
               .then((projet) => {
                  if (projet.identifiantProductOwner == jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id) {
                     res.render("productBacklog", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, stories: userStories, projet, isPO: '', PO: true })
                  }
                  else {
                     res.render("productBacklog", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, stories: userStories, projet, isPO: 'd-none', PO: false })
                  }
               })
         })
         .catch(() => {
            res.status.send("error500");
         })
   }
   else {
      res.render("login");
   }
}
exports.manageUserStories = (req, res) => {
   if (checkAuthorization(req, res)) {
      userStory.find({ identifiantProjet: req.params.id }).sort({ priorite: -1 })
         .then((stories) => {
            project.findOne({ _id: req.params.id })
               .then((projet) => {
                  if (projet.identifiantProductOwner == jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id) {
                     res.render("manage_userStories", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, stories, projet, isPo: '' });
                  }
                  else {
                     res.render("manage_userStories", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, stories, projet, isPo: 'd-none' });
                  }

               })
               .catch(() => {
                  res.status(500).render("error500");
               });
         })
         .catch(() => {
            res.status(500).render("error500");
         })
   }
   else {
      res.render("login");
   }
}
exports.deleteUserStory = (req, res) => {
   if (checkAuthorization(req, res)) {
      let id = req.params.id.substr(req.params.id.indexOf('=') + 1);
      userStory.findOneAndDelete({ _id: id })
         .then(() => {
            res.send("deleted");
         })
         .catch(() => {
            res.send("failed");
         })
   }
}
exports.updateUserStory = (req, res) => {
   if (checkAuthorization(req, res)) {
      userStory.findByIdAndUpdate({ _id: req.body.id }, {
         estimation: parseInt(req.body.estimation) || 0,
         acteur: req.body.actor,
         action: req.body.action,
         objectif: req.body.value,
         statut: "En attente",
         acceptanceCriteria: req.body.acceptnceCriteria
      })
         .then(() => {
            res.send("updated");
         })
         .catch(() => {
            res.send("/error500");
         });
   }
   else {
      res.send("/login");
   }
}
exports.updateTask = (req, res) => {
   if (checkAuthorization(req, res)) {
      task.findByIdAndUpdate({ _id: req.body.id }, {
         description: req.body.descrtiption,
         estimation: parseInt(req.body.priority),
         statut: req.body.statut,
         dateFin: '',
         identifiantUtilisateur: req.body.affectedTo
      })
         .then(() => {
            res.send("updated");
         })
         .catch((error) => {
            console.log(error);
         });
   }
   else {
      res.send("/login");
   }
};
exports.updateUserStoryPriority = (req, res) => {
   if (checkAuthorization(req, res)) {
      userStory.find({ _id: req.body.id })
         .then((data) => {
            if (data.length > 0) {
               userStory.findOneAndUpdate({ _id: req.body.id }, {
                  priorite: parseInt(req.body.priority)
               })
                  .then(() => {
                     res.send("success");
                  })
                  .catch(() => {
                     res.send("/error500");
                  });
            }
         })
   }
   else {
      res.send("/login");
   }
}
exports.updateUserStoryState = (req, res) => {
   if (checkAuthorization(req, res)) {
      userStory.findOneAndUpdate({ _id: req.body.idUserStory }, {
         statut: req.body.cls
      })
         .then(() => {
            res.send("updated");
         })
         .catch(() => {
            res.send("/error500");
         });
   }
   else {
      res.send("/login");
   }
}
exports.showPersona = (req, res) => {
   if (checkAuthorization(req, res)) {
      persona.findOne({ identifiantProjet: req.params.id })
         .then((personas) => {
            project.findOne({ _id: req.params.id })
               .then((pro) => {
                  if (pro.identifiantProductOwner == jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id) {
                     res.render("showPersona", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, projet: pro, personas, isPO: '' });
                  }
                  else {
                     res.render("showPersona", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, projet: pro, personas, isPO: 'd-none' });
                  }
               })
         })
   }
   else {
      res.render("login");
   }
}
exports.createNewPersona = (req, res) => {
   if (checkAuthorization(req, res)) {
      res.render("createPersona", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, projet: req.params.id });
   }
   else {
      res.render("login");
   }
}
exports.updatePersona = (req, res) => {
   if (checkAuthorization(req, res)) {
      persona.findOne({ _id: req.params.id })
         .then((personas) => {
            res.render("updatePersona", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, personas, projet: req.params.projet });
         })
   }
   else {
      res.render("login");
   }
}
exports.updatePersonaData = (req, res) => {
   if (checkAuthorization(req, res)) {
      persona.findByIdAndUpdate({ _id: req.body.id }, {
         nom: req.body.nom,
         adresse: req.body.adresse,
         genre: req.body.genre,
         age: req.body.age,
         profession: req.body.profession,
         status: req.body.status,
         description: req.body.description,
         objectifs: req.body.objectifs,
         environnement: req.body.environment,
         photo: req.body.photo
      })
         .then(() => {
            res.send("updated");
         })
         .catch(() => {
            res.send("/error500");
         });
   }
   else {
      res.send("/login")
   }
}
exports.deletePersona = (req, res) => {
   if (checkAuthorization(req, res)) {
      let id = (req.params.id.substr(req.params.id.indexOf('=') + 1));
      persona.findOne({ _id: id })
         .then(existe => {
            if (existe) {
               persona.findByIdAndDelete({ _id: id })
                  .then(() => {
                     res.send("deleted")
                  })
                  .catch(() => {
                     res.send("/error500");
                  });
            }
            else {
               res.send('/error500');
            }
         })
   }
   else {
      res.send("/login");
   }
}
exports.addStakeholder = (req, res) => {
   if (checkAuthorization(req, res)) {
      project.findOne({ _id: req.params.id })
         .then(work => {
            utilisateur.find({ $and: [{ _id: { $ne: work.identifiantProductOwner } }, { _id: { $ne: work.identifiantScrumMaster } }] })
               .then(stakeholders => {
                  res.render("addStakeholder", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, stakeholders, projet: work });
               });
         });
   }
   else {
      res.render("login");
   }
}
exports.deleteStakeholder = (req, res) => {
   if (checkAuthorization(req, res)) {
      let id = req.params.id;
      id = id.substr(id.indexOf('=') + 1);
      stakeholder.findOneAndDelete({ _id: id })
         .then(() => {
            res.send("deleted");
         })
         .catch(() => {
            res.send("/error500");
         });
   }
   else {
      res.send("/login");
   }
}
exports.updateStakeholderRole = (req, res) => {
   if (checkAuthorization(req, res)) {
      stakeholder.updateMany({ _id: req.body.id }, { roleMembre: req.body.newRole })
         .then((exist) => {
            if (!exist) {
               res.send("updated");
            }
            else {
               res.send("/error500");
            }
         })
         .catch((error) => {
            res.send("/error500");
         });
   }
   else {
      res.send("/login");
   }
}

exports.viewTaskList = (req, res) => {
   if (checkAuthorization(req, res)) {
      axios.get("http://localhost:8080/userStories/getOne/" + req.params.id)
         .then(function (story) {
            axios.get("http://localhost:8080/project/developers/" + story.data.identifiantProjet)
               .then(function (developers) {
                  task.find({ identifiantUserStory: req.params.id })
                     .then((taches) => {
                        axios.get("http://localhost:8080/tasks/developers/" + story.data._id)
                           .then(function (resultat) {
                              {
                                 project.findOne({_id:story.data.identifiantProjet})
                                 .then(prSM=>{
                                    utilisateur.findOne({_id:prSM.identifiantScrumMaster})
                                    .then(rep=>{
                                       res.render("viewTaskList", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, taches, developers: developers.data.developers, personalData: developers.data.personalData, story: story.data, ressigned: resultat.data,sm:rep });
                                    })
                                 })
                              }
                           })
                     })
                     .catch(() => {
                        res.render("error500");
                     });
               })
         });
   }
   else {
      res.render("login");
   }
}
exports.deleteTask = (req, res) => {
   if (checkAuthorization(req, res)) {
      let id = req.params.id;
      id = id.substr(id.indexOf("=") + 1);
      task.findByIdAndDelete({ _id: id })
         .then(() => {
            res.send("deleted");
         })
         .catch(() => {
            res.send("/error500");
         });
   }
   else {
      res.send("/login");
   }
}
exports.updateUserStory = (req, res) => {
   if (checkAuthorization(req, res)) {
      userStory.findOneAndUpdate({ _id: req.body.id }, {
         description: req.body.descrtiption,
         acteur: req.body.actor,
         action: req.body.action,
         acceptanceCriteria: req.body.acceptnceCriteria,
         estimation: parseInt(req.body.estimation),
         objectif: req.body.value
      })
         .then(() => {
            res.send("updated");
         })
         .catch("/error500");
   }
   else {
      res.send("/login");
   }
}

exports.showSprintsList = (req, res) => {
   if (checkAuthorization(req, res)) {
      project.find({ $or: [{ identifiantProductOwner: { $eq: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id } }, { identifiantScrumMaster: { $eq: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id } }] })
         .then(projects => {
            axios.get('http://localhost:8080/workIn/' + jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id)
               .then(function (response) {
                  if (response.data.length > 0) {
                     res.render("sprints", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, projects: projects, other: response.data, otherExist: "true" });
                  }
                  else {
                     res.render("sprints", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, projects: projects, other: {}, otherExist: "false" });
                  }
               })
               .catch(err => {
                  res.send(err);
               })
         })
         .catch(() => {
            res.status(500).render("error500");
         })
   }
   else {
      res.render("/login");
   }
}

exports.showSprint = (req, res) => {
   if (checkAuthorization(req, res)) {
      project.findOne({ _id: req.params.id })
         .then((projet) => {
            sprint.find({ identifiantProjet: projet._id })
               .then(spr => {
                  if (spr.length > 0) {
                     axios.get('http://localhost:8080/projects/project/loadStats/' + projet._id)
                        .then(function (response) {
                           sprint.findOne({ $and: [{ identifiantProjet: projet._id }, { statut: 'En cours' }] })
                              .then(sprintRunning => {
                                 if (sprintRunning) {
                                    axios.get('http://localhost:8080/sprint/burnDownChart/' + sprintRunning._id)
                                       .then(function (rep) {
                                          axios.get('http://localhost:8080/sprint/burnUpChart/' + sprintRunning._id)
                                             .then(function (repo) {
                                                axios.get('http://localhost:8080/countForSprint/' + sprintRunning._id)
                                                   .then(function (count) {
                                                      axios.get('http://localhost:8080/project/showStats/' + projet._id)
                                                         .then(sta => {
                                                            axios.get('http://localhost:8080/sprint/tasksDone/' + sprintRunning._id)
                                                               .then(done => {
                                                                  res.render("viewSprints", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, projet, stats: response.data, hasRunningSprint: "true", sprintRunning, stat: rep.data, stat1: repo.data, achieved: count.data, sta: sta.data, done: done.data });
                                                               })
                                                         })
                                                   })
                                             })
                                       })
                                 }
                                 else {
                                    res.render("viewSprints", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, projet, stats: response.data, hasRunningSprint: "false" });
                                 }
                              });
                        })

                  }
                  else {
                     res.render("viewSprints", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, projet, stats: [0, 0, 0, 0, 0, 0, 0, 0, 0], hasRunningSprint: "false" });
                  }
               })
         });
   }
   else {
      res.render("login");
   }
}
exports.showImpedimentLog = (req, res) => {
   if (checkAuthorization(req, res)) {
      project.findOne({ _id: req.params.id })
         .then((projet) => {
            obstacle.find({ identifiantProjet: { $eq: req.params.id } })
               .then((obstacles) => {
                  axios.get("http://localhost:8080/date")
                     .then(function (date) {
                        axios.get("http://localhost:8080/statistics/impedimentLog/" + projet._id)
                           .then(function (stats) {
                              axios.get('http://localhost:8080/declared/impediment/' + projet._id)
                                 .then(function (personalData) {
                                    res.render("impediment_log", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, projet, obstacles, date, stats, personalData });
                                 })
                           });
                     });
               })
         })
   }
   else {
      res.render("login")
   }
}
exports.deleteItem = (req, res) => {
   if (checkAuthorization(req, res)) {
      let id = req.params.id;
      id = id.substr(id.indexOf("=") + 1);
      obstacle.findOneAndDelete({ _id: id })
         .then(() => {
            res.send("deleted");
         })
         .catch(() => {
            res.send("/erro500");
         })
   }
   else {
      res.send("/login");
   }
}
exports.solveIssue = (req, res) => {
   if (checkAuthorization(req, res)) {
      let id = req.params.id;
      id = id.substr(id.indexOf("=") + 1);
      obstacle.findByIdAndUpdate({ _id: id }, { statut: 'Résolu' })
         .then(() => {
            res.send("solved");
         })
         .catch(() => {
            res.send("/error500");
         })
   }
   else {
      res.send('/login');
   }
}
exports.updateItemDescription = (req, res) => {
   if (checkAuthorization(req, res)) {
      obstacle.findOneAndUpdate({ _id: req.body.id }, { decription: req.body.description })
         .then(() => {
            res.send("updated");
         })
         .catch((error) => {
            res.send("/error500");
         })
   }
   else {
      res.send("/login");
   }
}
exports.showRiskLog = (req, res) => {
   if (checkAuthorization(req, res)) {
      risk.find({ identifiantProjet: req.params.id })
         .then((risks) => {
            project.findById({ _id: req.params.id })
               .then(projet => {
                  axios.get("http://localhost:8080/date")
                     .then(function (response) {
                        axios.get('http://localhost:8080/declared/risk/' + projet._id)
                           .then(function (result) {
                              axios.get('http://localhost:8080/risk/average/' + projet._id)
                                 .then(function (distinct) {
                                    res.render("risque_log", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, risks, projet, date: response.data, personalData: result.data, avg: distinct.data });
                                 })
                           });
                     })
               })
         })
   }
   else {
      res.render("login",);
   }
}
exports.removeRisk = (req, res) => {
   if (checkAuthorization(req, res)) {
      let id = req.params.id;
      id = id.substr(id.indexOf("=") + 1);
      risk.findByIdAndDelete({ _id: id })
         .then(() => {
            res.send("deleted");
         })
         .catch(() => {
            res.send("/error500");
         })
   }
   else {
      res.send("/login");
   }
}
exports.updateRiskDescription = (req, res) => {

   if (checkAuthorization(req, res)) {
      console.log(req.body);
      risk.findByIdAndUpdate({ _id: req.body.id }, { description: req.body.message })
         .then(() => {
            res.send("updated");
         })
         .catch((error) => {
            res.send("/error500");
         });
   }
   else {
      res.send("/login");
   }
}
exports.startNewSprint = (req, res) => {
   if (checkAuthorization(req, res)) {
      let id = req.params.id;
      project.findOne({ _id: req.params.id })
         .then((projet) => {
            userStory.find({ identifiantProjet: req.params.id }).sort({ priorite: -1 })
               .then((stories) => {
                  res.render("newSprint", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, projet, stories });
               })
         })
   }
   else {
      res.render("login",);
   }
}
exports.loadSprintsList = (req, res) => {
   if (checkAuthorization(req, res)) {
      sprint.find({ identifiantProjet: req.params.id })
         .then((sprints) => {
            sprint.findOne({ $and: [{ identifiantProjet: req.params.id }, { statut: 'En cours' }] })
               .then(run => {
                  if (run) {
                     res.render("sprintsListView", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, sprints, running: "d-none" });
                  }
                  else {
                     res.render("sprintsListView", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, sprints, running: "" });
                  }
               })
         })
         .catch(() => {
            res.render("error500");
         })
   }
   else {
      res.render("login");
   }
}

exports.launchSprint = (req, res) => {
   if (checkAuthorization(req, res)) {
      let id = req.params.id;
      id = id.substr(id.indexOf("=") + 1);
      let date = new Date();
      var day = date.getDate();
      var mois = date.getMonth() + 1;
      var annee = date.getFullYear();
      let dateD = (mois + "/" + day + "/" + annee);

      sprint.findByIdAndUpdate({ _id: id }, { statut: "En cours", dateDebut: dateD })
         .then(() => {
            sprint.findById({ _id: id })
               .then(spr => {
                  projet.findByIdAndUpdate({ _id: spr.identifiantProjet }, { statut: 'En cours' })
                     .then(() => {
                        equipeDev.find({ identifiantProjet: spr.identifiantProjet })
                           .then((developers) => {
                              developers.forEach(developer => {
                                 let noti = new notification({
                                    recepteur: developer.identifiantMembre,
                                    dateEnvoie: Date.now().toString(),
                                    contenu: 'Vous Avez une nouvelle sprint qui a été declenché.Veuillez consulter la liste de vos tâches afin de savoir vos nouvellestâches'
                                 });
                                 noti.save()
                                    .then(() => {
                                    })
                                    .catch(() => {
                                       res.render("/error500");
                                    })
                              })
                              res.end();
                           })
                     })
               })
         })
         .catch((error) => {
            console.log(error);
         });

   }
   else {
      res.send("/login");
   }
}
exports.terminateSprint = (req, res) => {
   if (checkAuthorization(req, res)) {
      sprint.findByIdAndUpdate({ _id: req.params.id }, { statut: 'Terminé' })
         .then((sprint) => {
            res.redirect('/sprints/showSprint/' + sprint.identifiantProjet);
         })
         .catch(error => {
            res.render('error500');
         })
   }
   else {
      res.render("login");
   }
}
exports.acceptSprint = (req, res) => {
   if (checkAuthorization(req, res)) {
      sprint.findByIdAndUpdate({ _id: req.params.id }, { statut: 'Accepté' })
         .then((sprint) => {
            res.redirect('/sprints/showSprint/' + sprint.identifiantProjet);
         })
         .catch(error => {
            res.render('error500');
         });
   }
   else {
      res.render("login");
   }
}
exports.refuseSprint = (req, res) => {
   if (checkAuthorization(req, res)) {
      sprint.findByIdAndUpdate({ _id: req.params.id }, { statut: 'Réfusé' })
         .then((sprint) => {
            res.redirect('/sprints/showSprint/' + sprint.identifiantProjet);
         })
         .catch(error => {
            res.render('error500');
         });
   }
   else {
      res.render("login");
   }
}
exports.cancelSprint = (req, res) => {
   if (checkAuthorization(req, res)) {
      sprint.findByIdAndUpdate({ _id: req.params.id }, { statut: 'Annulé' })
         .then((sprint) => {
            res.redirect('/sprints/showSprint/' + sprint.identifiantProjet);
         })
         .catch(error => {
            res.render('error500');
         });
   }
   else {
      res.render("login");
   }
}
exports.showSprintBacklog = (req, res) => {
   if (checkAuthorization(req, res)) {
      axios.get('http://localhost:8080/sprint/sprintTasksList/'+req.params.id)
      .then(tasks=>{
         axios.get('http://localhost:8080/sprint/sprintUserStoriesList/'+req.params.id)
         .then(stories=>{
            res.render("sprintBacklog", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user,stories:stories.data,tasks:tasks.data});     
         })
      })
   }
   else {
      res.render("login");
   }
}
exports.showTasks = (req, res) => {
   if (checkAuthorization(req, res)) {
      task.find({ identifiantUtilisateur: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id })
         .then(tasks => {
            res.render("taches", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, tasks });
         });
   }
   else {
      res.render("login");
   }
}
exports.abandonTask = (req, res) => {
   if (checkAuthorization(req, res)) {
      let id = req.params.id;
      id = id.substr(id.indexOf("=") + 1);
      axios.get('http://localhost:8080/date')
         .then(date => {
            task.findByIdAndUpdate({ _id: id }, { statut: 'abandonné', dateFin: date.data })
               .then(() => {
                  res.send("abandonned");
               })
               .catch(() => {
                  res.send("/error500");
               })
         })
   }
   else {
      res.send("/login");
   }
}
exports.terminateTask = (req, res) => {
   if (checkAuthorization(req, res)) {

      let id = req.params.id;
      id = id.substr(id.indexOf("=") + 1);
      axios.get('http://localhost:8080/date')
         .then(date => {
            task.findByIdAndUpdate({ _id: id }, { statut: 'terminé', dateFin: date.data })
               .then(() => {
                  res.send("terminated");
               })
               .catch(() => {
                  res.send("/error500");
               })
         });
   }
   else {
      res.send("/login");
   }
}
exports.launchTask = (req, res) => {
   if (checkAuthorization(req, res)) {

      let id = req.params.id;
      id = id.substr(id.indexOf("=") + 1);
      axios.get('http://localhost:8080/date')
         .then(date => {
            task.findByIdAndUpdate({ _id: id }, { statut: 'En cours', dateDebut: date.data })
               .then(() => {
                  res.send("launched");
               })
               .catch(() => {
                  res.send("/error500");
               })
         });
   }
   else {
      res.send("/login");
   }
}
exports.showMeetings = (req, res) => {
   if (checkAuthorization(req, res)) {
      axios.get('http://localhost:8080/project/listNameAndId/' + jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id)
         .then(response => {
            meeting.find({ $and: [{ createurMeeting: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id }, { type: { $eq: 'Personnel' } }] })
               .then(meetings => {
                  axios.get("http://localhost:8080/meetings/meetingsList/" + jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id)
                     .then(respo => {
                        utilisateur.find({ _id: { $ne: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id } })
                           .then(users => {
                              res.render("meeting", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, projets: response.data, meetings, respo: respo.data, users });
                           })
                     })
               })
         });
   }
   else {
      res.render("login");
   }
}
exports.removeMeeting = (req, res) => {
   if (checkAuthorization(req, res)) {
      let id = req.params.id;
      id = id.substr(id.indexOf('=') + 1);
      meeting.findByIdAndDelete({ _id: id })
         .then(() => {
            res.send("deleted");
         })
         .catch((error) => {
            console.log(error);
         })
   }
   else {
      res.send("/login");
   }
}
exports.terminateMeeting = (req, res) => {
   if (checkAuthorization(req, res)) {
      let id = req.params.id;
      id = id.substr(id.indexOf('=') + 1);
      meeting.findByIdAndUpdate({ _id: id }, { statut: 'Terminé' })
         .then(() => {
            res.send("terminated");
         })
         .catch(() => {
            res.send("/error500");
         })
   }
   else {
      res.send('/login');
   }
}
exports.showEmails = (req, res) => {
   if (checkAuthorization(req, res)) {
      utilisateur.find({ _id: { $ne: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id } })
         .then(users => {
            inmail.find({$and:[{identifiantRecepteur:jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user.email},{$or:[{deleted:'truefalse'},{deleted:'falsefalse'}]}]})
            .then(inmails=>{
               axios.get('http://localhost:8080/inmails/statistics/'+jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id)
               .then((respo)=>{
                  res.render("chat", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, users,inmails,stats:respo.data });
               })
            })
         })
         .catch(error => {
            res.render("error500");
         })
   }
   else {
      res.render("login");
   }
}
exports.sentInMails = (req, res) => {
      if (checkAuthorization(req, res)) {
         utilisateur.find({ _id: { $ne: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id } })
            .then(users => {
               inmail.find({$and:[{identifiantEmetteur:jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user.email},{$or:[{deleted:'falsetrue'},{deleted:'falsefalse'}]}]})
               .then(inmails=>{
                  axios.get('http://localhost:8080/inmails/statistics/'+jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id)
                  .then((respo)=>{
                  res.render("chat_envoye", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, users,inmails,stats:respo.data });
               })
            })
            })
            .catch(error => {
               res.render("error500");
            })
      }
      else {
         res.render("login");
      }
   }
exports.deletedInMails = (req, res) => {
   if (checkAuthorization(req, res)) {
      utilisateur.find({ _id: { $ne: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id } })
         .then(users => {
            inmail.find({$or:[{$and:[{identifiantEmetteur:jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user.email},{$or:[{deleted:'truefalse'},{deleted:'truetrue'}]}]},{$and:[{identifiantRecepteur:jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user.email},{$or:[{deleted:'falsetrue'},{deleted:'truetrue'}]}]}]})
            .then(inmails=>{
               axios.get('http://localhost:8080/inmails/statistics/'+jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user._id)
               .then((respo)=>{
               res.render("chat_recycleBin", { data: jwt.decode(req.cookies['currentUser'], { complete: true }).payload.user, users,inmails,stats:respo.data });
            })
         })
         })
         .catch(error => {
            res.render("error500");
         })
   }
   else {
      res.render("login");
   }
}
exports.markInMailAsSeen=(req,res)=>{
   if(checkAuthorization(req,res))
   {
      let id=req.params.id;
      id=id.substr(id.indexOf('=')+1);
      inmail.findByIdAndUpdate({_id:id},{statut:'Lu'})
      .then(()=>{
         res.send('updated');
      })
      .catch(()=>{
         res.send('/error500');
      })
   }
   else
   {
      res.send("/login");
   }
}
exports.deleteForReceiver=(req,res)=>
{
   if(checkAuthorization(req,res))
   {
      let id=req.params.id;
      let deleted;
      id=id.substr(id.indexOf('=')+1);
      inmail.findById({_id:id})
      .then(respo=>{

         if(respo.deleted=='falsefalse')
         {
            deleted='falsetrue';
         }
         else if(respo.deleted=='truefalse')
         {
            deleted='truetrue';
         }        
         inmail.findByIdAndUpdate({_id:id},{deleted:deleted})
         .then(()=>{
            res.send("deleted");
         })
         .catch(()=>{
            res.send("/error500");
         })
      })
   }
   else
   {
      res.send("/login");
   }
}
exports.deleteForSender=(req,res)=>
{
   if(checkAuthorization(req,res))
   {
      let id=req.params.id;
      let deleted;
      id=id.substr(id.indexOf('=')+1);
      inmail.findById({_id:id})
      .then(respo=>{
         if(respo.deleted=='falsefalse')
         {
            deleted='truefalse';
         }
         else if(respo.deleted=='falsetrue')
         {
            deleted='truetrue'
         }
         inmail.findByIdAndUpdate({_id:id},{deleted:deleted})
         .then(()=>{
            res.send("deleted");
         })
         .catch(()=>{
            res.send("/error500");
         })
      })
   }
   else
   {
      res.send("/login");
   }
}
exports.nameTechLead=(req,res)=>{
 if(checkAuthorization(req,res))
 {
   let idMembre=req.params.idMember;
   idMembre=idMembre.substr(idMembre.indexOf('=')+1);
   let idProject=req.params.idProject;
   idProject=idProject.substr(idProject.indexOf('=')+1);
   equipeDev.updateMany({identifiantProjet:idProject},{isTechLead:'false'})
   .then(()=>{
      equipeDev.updateMany({$and:[{identifiantMembre:idMembre},{identifiantProjet:idProject}]},{isTechLead:'true'})
      .then(()=>{
         res.send("named");
      })
      .catch(()=>{
         res.send("/error500");
      });
   })
   .catch(()=>{
      res.send("/error500");
   });

 }
 else
 {
    res.send("/login");
 }
}
exports.showDocumentation=(req,res)=>{
   if(checkAuthorization(req,res))
   {
      res.render('documentation',{data:jwt.decode(req.cookies['currentUser'],{complete:true}).payload.user});
   }
   else
   {
      res.render("login");
   }
}
exports.storyPointsEstimator=(req,res)=>{
   if(checkAuthorization(req,res))
   {
      res.render('prediction',{data:jwt.decode(req.cookies['currentUser'],{complete:true}).payload.user});
   }
   else
   {
      res.render("login");
   }
}