var jwt=require("jsonwebtoken");
var utilisateur=require("../model/utilisateur");
var axios=require("axios");
var project=require("../model/projet");
var notification=require("../model/notification");
var equipeDev=require("../model/equipeDev");
const userStory=require("../model/userStory");
const skill=require("../model/competence");
const task=require("../model/tache");
const risk=require("../model/risk");
const formation=require("../model/formation");
const stakeholder=require("../model/stakeholders");
const weather=require('weather-js');
const util=require('util');
var mongoose = require('mongoose');
const meeting=require("../model/meeting");
const obstacle=require('../model/obstacle');
const inmail=require("../model/inMail");
const translate = require('translate-google');
const { json } = require("body-parser");
const sprint = require("../model/sprint");
const sprintBacklogItem = require("../model/sprintBacklog");
const { startSession, exists, countDocuments } = require("../model/utilisateur");
const { parse } = require("path");
const { response } = require("express");
const { Promise } = require("bluebird");
const Json=require('json')
const projet = require("../model/projet");
const synonym=require('../model/synonym');
const story = require("../model/story");
const { pt } = require("translate-google/languages");
const { WordNet } = require("natural");
var model=require('./model');
const { isNullOrUndefined } = require("util");
mongoose.Promise = require('bluebird');
require("dotenv").config();

function toObjectId(ids) {

    if (ids.constructor === Array) {
        return ids.map(mongoose.Types.ObjectId);
    }

    return mongoose.Types.ObjectId(ids);
}
exports.findProject=async (req,res)=>{
   project.findOne({_id:req.params.id})
   .then((projet)=>{
       res.send(projet);
   })
   .catch(()=>{
    res.status(400).send();
   })

}
exports.workIN=(req,res)=>{
    equipeDev.find({identifiantMembre:req.params.id})
    .then(function(projets){
        var resultat = [];
    projets.forEach(p=> {
		let id=mongoose.Types.ObjectId(p.identifiantProjet);
       resultat.push(project.findById({$eq:{_id:p.identifiantProjet}}));
    });
        return Promise.all(resultat );
        }).then(function(resultat) {
		res.send(resultat);
        }).catch(function(error) {
            res.status(500);
        });

    
}
exports.getDate=(req,res)=>{
    
	var date = new Date();
	jj = date.getDay();
	var jour = "";
	var day = date.getDate();
	var mois = date.getMonth();
	var annee = date.getFullYear();
  var seconds,hours,minutes;
  if(day<10) day="0"+day.toString()
	switch (jj) {
		case 1: {
			jour = "Lun";
			break;
		}
		case 2: {
			jour = "Mar";
			break;
		}
		case 3: {
			jour = "Mer";
			break;
		}

		case 4: {
			jour = "Jeu";
			break;
		}
		case 5: {
			jour = "Ven";
			break;
		}
		case 6: {
			jour = "Sam";
			break;
		}
		case 7: {
			jour = "Dim";
			break;
		}

	}
	switch (mois) {
		case 0: {
			mois = "Janvier";
			break;
		}
		case 1: {
			mois = "F??vrier ";
			break;
		}
		case 2: {
			mois = "Mars";
			break;
		}

		case 3: {
			mois = "Avril";
			break;
		}
		case 4: {
			mois = "Mai";
			break;
		}
		case 5: {
			mois = "Juin";
			break;
		}
		case 6: {
			mois = "Juillet";
			break;
		}
		case 7: {
			mois = "Aout";
			break;
		}
		case 8: {
			mois = "Septembre";
			break;
		}
		case 9: {
			mois = "Octobre";
			break;
		}
		case 10: {
			mois = "Novembre";
			break;
		}
		case 11: {
			mois = "D??cembre";
			break;
		}

	}
    res.send(day+'-'+mois+'-'+annee)
}
exports.getWeather=(req,res)=>{
	weather.find({search: req.params.city, degreeType: 'C'}, function(err, result) {
		if(err) res.send(err);
		else
		{
		translate(result[0].current.skytext, {to: 'french'}).then(translated=> {
			result[0].current.skytext=translated;
			res.send(result[0].current);
		})
		
		
	}
	  });
}
exports.developersList=(req,res)=>{
	var members=[];
    equipeDev.find({identifiantProjet:req.params.id})
    .then((developers)=>
    {
      if(developers.length==0)
      {
        res.send({developers:[],personalData:[]});
      }
      else{
      developers.forEach(element=>{
        utilisateur.findOne({_id:element.identifiantMembre})
        .then((data)=>
        {
          members[members.length]=data;
          if(members.length==developers.length)
          {
          res.send({developers:developers,personalData:members});
          }
        })
      });
    }
    }
    )
}
exports.getUserStory =(req, res) =>{
	var members=[];
	let id=req.params.ide;
	if(!mongoose.Types.ObjectId.isValid)
	{
		id=id.toString();
		id=id.substr(1);
	}
	userStory.findOne({_id:id})
	.then(story =>{
		res.send(story);
	});

}
exports.getUser=async (req,res) =>{
	utilisateur.findOne({_id:req.params.id})
	.then(user =>{
		res.send(user);
	})
}
exports.developersListForTask = (req, res) =>{
	var members=[];
	let id=req.params.id;
	if(mongoose.Types.ObjectId.isValid==false)
	{
		id=id.toString();
		id=id.substr(1);
	}
    task.find({identifiantUserStory:id})
    .then((tasks)=>
    {
      if(tasks.length==0)
      {
        res.send({personalData:[]});
      }
      else{
      tasks.forEach(element=>{
        utilisateur.findOne({_id:element.identifiantUtilisateur})
        .then((data)=>
        {
          members[members.length]=data;
          if(members.length==tasks.length)
          {
          res.send({ressigned:members});
          }
        })
      });
    }
    }
    )
}
exports.declareRegister=(req,res)=>{
		obstacle.find({identifiantProjet:req.params.id})
		.then(function(obstacles){
			var resultat = [];
		obstacles.forEach(function(p) {
		   resultat.push(utilisateur.findOne({_id:p.declaredBY}));
		});
			return Promise.all(resultat );
			}).then(function(resultat) {
				res.send(resultat);
			}).catch(function(error) {
				res.status(500);
			});
	
		
}
exports.impedimentLogStats=(req,res)=>{
	obstacle.find({$and:[{identifiantProjet:req.params.id},{statut:'En Attente'}] })
	.then(waiting=>{
		obstacle.find({$and:[{identifiantProjet:req.params.id},{statut:'R??solu'}] })
		.then((solved)=>{
			res.send({waiting:waiting.length,solved:solved.length});
		})
	})
}
exports.declareRiskRegister=(req,res) => {
	risk.find({identifiantProjet:req.params.id})
		.then(function(risks){
			var resultat = [];
		risks.forEach(function(p) {
		   resultat.push(utilisateur.findOne({_id:p.declaredBY}));
		});
			return Promise.all(resultat );
			}).then(function(resultat) {
				res.send(resultat);
			}).catch(function(error) {
				res.status(500);
			});
	
		

}
exports.declaredRiskAverage=(req,res)=>{
	risk.distinct('dateDeclaration',{identifiantProjet:req.params.id})
	.then(data=>{
		res.send(data);
		
	})
}
exports.calculForSprint=(req,res)=>{
	sprint.findById({_id:req.params.id})
	.then(spr=>{
		sprintBacklogItem.find({identifiantSprint:spr._id})
		.then(function(items){
		var resultat = [];
		items.forEach(function(item) {
		   resultat.push(task.find({identifiantUserStory:item.identifiantUserStory}).countDocuments());
		});
		return Promise.all(resultat );
			}).then(function(resultat) {
				res.send(resultat);
			}).catch(function(error) {
				res.status(500);
			});
	})
}
exports.achievedOfSprint=(req,res)=>{
	sprint.findOne({_id:req.params.id})
	.then(spr=>{

		sprintBacklogItem.find({identifiantSprint:spr._id})
		.then(function(items){
		var resultat = [];
		items.forEach(function(item) {
		   resultat.push(task.find({identifiantUserStory:item.identifiantUserStory}).countDocuments());
		});
		return Promise.all(resultat );
			}).then(function(resultat) {
				let perc=0;
				for(var i=0;i<resultat.length;i++)
				{
					perc+=resultat[i];
				}
				sprintBacklogItem.find({identifiantSprint:req.params.id}).countDocuments()
				.then(response=>{
					res.send({perc,response});

				})
			}).catch(function(error) {
				res.status(500);
			});
		})
}
exports.projectStat=(req,res) => {

	let resultat=[];
	var semaines=0;
	var stories=0;
	let store=0;
		sprint.find({$and:[{identifiantProjet:req.params.id},{statut:'termin??'}]})
			.then(sprintDone=>{
				if(sprintDone.length>0)
				{
					resultat.push(sprintDone.length);
				}
				else
				{
					resultat.push(0);
				}
				userStory.find({$and:[{identifiantProjet:req.params.id},{statut:'termin??'}]})
				.then(usDone=>{
					if(usDone.length>0)
					{
						resultat.push(usDone.length);
					}
					else
					{
						resultat.push(0);
					}
					var tdone=0;
					usDone.forEach(function(us){
						task.find({$and:[{identifiantUserStory:us._id},{statut:'termin??'}]})
						.then(taskDone=>{
							if(taskDone.length>0)
							{
								tdone+=taskDone.length;
							}

						});
					});
					userStory.find({identifiantProjet:req.params.id})
					.then(us=>{
						resultat.push(us.length);	
						resultat.push(tdone);
						res.send(resultat);
					});
				});
			});
}
exports.getObstaclesAndRisks=(req,res)=>{
	let id=req.params.id;
	obstacle.find({identifiantProjet:id})
	.then(obs=>{
		risk.find({identifiantProjet:id})
		.then(risks=>{
			res.send({obstacles:obs.length,risks:risks.length});
		})
		.catch(()=>{
			res.send({obstalces:0,risks:0});
		})
	})
}
exports.statistics=(req,res)=>{
	var resultat=[0,0,0,0,0,0];
	sprint.find({identifiantProjet:req.params.id})
	.then(function(sprints){
		//nombre se sprints totale
		resultat[0]=sprints.length;
		//nombre de user stories totale 
		resultat[1]=(userStory.find({identifiantProjet:req.params.id}).countDocuments());
		resultat[5]=(userStory.find({$and:[{identifiantProjet:req.params.id},{statut:'termin??'}]}).countDocuments());
		sprints.forEach(function(spr){
			//periode totale
			resultat[2]+=spr.semaines;
			resultat[4]+=spr.heures*spr.jours*spr.semaines;
			if(spr.statut=="termin??")
			{
				resultat[3]++;
			}
		});
		return Promise.all(resultat);
	})
	.then(function(resultat){
		res.send(resultat);
	})
	.catch(error=>{res.send(error)});

}
exports.sprintstat=(req,res)=>{
	sprintBacklogItem.find({identifiantSprint:req.params.id})
	.then(function(items){
		var resultat=[];
		items.forEach(function(item){
			resultat.push(task.find({identifiantUserStory:item.identifiantUserStory},{dateFin:1,statut:1,_id:0}).sort({dateFin:1}));
			
		});
		return Promise.all(resultat);
	}).then(function(resultat){
		res.send(resultat);
	}).catch(error=>{
		res.send(error);
	});
}
exports.allSprintDays=(req,res)=>{
	sprint.findById({_id:req.params.id})
	.then(spr=>{
	axios.get("http://localhost:8080/sprint/running/stats/"+req.params.id)
	.then(function(response){
		let resultat=[];
		let startDate=(spr.dateDebut);
		for(var i=0;i<(spr.semaines*spr.jours)+1;i++)
		{
			let d=new Date(startDate);
			d=d.getTime()+(i*1000*24*60*60);
			d=new Date(d);
			d=(d.getMonth()+1)+'/'+d.getDate()+'/'+d.getFullYear();
			if(resultat.indexOf(d)==-1)
			{
			resultat.push(d);
			}
		}
		return Promise.all(resultat);
	}).then(function(resultat){
	res.send(resultat);		
	});
});
}
exports.sprintBDN=(req,res)=>{
	axios.get("http://localhost:8080/sprint/running/stats/"+req.params.id)
	.then(function(tasks){
		axios.get("http://localhost:8080/sprint/days/"+req.params.id)
		.then(function(dates){
			let result=[];
			let bdn=[];
			let final=[];
			dates=dates.data;
			tasks=tasks.data;	
			tasks.forEach(tache=>{
				result.push(tache);})
				result.forEach(item=>{
					item.forEach(el=>{
						bdn.push(el);});
					
				});
				dates.forEach(date=>{
					let count=0;
					bdn.forEach(i=>{
						if(i.dateFin>date || i.statut!="termin??")
						{
							count++;
						}
					})
					final.push(count);
				})
			res.send({final});
		})
	});

}
exports.sprintUP=(req,res)=>{
	axios.get("http://localhost:8080/sprint/running/stats/"+req.params.id)
	.then(function(tasks){
		axios.get("http://localhost:8080/sprint/days/"+req.params.id)
		.then(function(dates){
			let result=[];
			let bdn=[];
			let final=[];
			dates=dates.data;
			tasks=tasks.data;	
			tasks.forEach(tache=>{
				result.push(tache);})
				result.forEach(item=>{
					item.forEach(el=>{
						bdn.push(el);});
					
				});
				dates.forEach(date=>{
					let count=0;
					bdn.forEach(i=>{
						if(i.dateFin<=date && i.statut=='termin??')
						{
							count++;
						}
					})
					final.push(count);
				})
			res.send({final});
		})
	});

}
exports.tasksDone=(req,res)=>{
	let resultat=[];
	sprint.findById({_id:req.params.id})
	.then(function(runningSprint){
		sprintBacklogItem.find({identifiantSprint:runningSprint._id})
		.then(function(items){
			items.forEach(item=>{
			resultat.push(task.find({$and:[{identifiantUserStory:item.identifiantUserStory},{statut:'termin??'}]}).countDocuments());
			});
			return Promise.all(resultat);
		}).then(function(result){
			let cntr=0;
			result.forEach(nbr=>{cntr+=parseInt(nbr);})
			res.send({cntr});});
	});
}
exports.sprintBacklog=(req,res)=>{
	
}
exports.listProjectNameAndId=(req,res)=>{
	let resultat=[];
	let id=req.params.id;
	project.find({})
	.then(function(projects){
		projects.forEach(work=>{
			if(work)
			{
			if(work.identifiantProductOwner==id || work.identifiantScrumMaster==id)
			{
				resultat.push(work);
			}
		}
		});
		return Promise.all(resultat);
	}).then(resultat=>{
		axios.get('http://localhost:8080/workIn/'+id)
		.then(others=>{
			others.data.forEach(prj=>{
				if(prj)
				{
				resultat.push(prj);
			}
			});
			res.send(resultat);
		});
	})
}
exports.loadMeetingsList=(req,res)=>{
axios.get('http://localhost:8080/workIn/'+req.params.id)
.then(function(response){
	let meets=[];
	let pts=[];
	response.data.forEach(elem=>{if(elem!=null){pts.push(elem);}});
	project.find({$or:[{identifiantProductOwner:req.params.id},{identifiantScrumMaster:req.params.id}]})
	.then(function(projects){
		projects.forEach(pr=>{if(pr!=null){pts.push(pr);}});
		pts.forEach(meet=>{
			meets.push(meeting.find({identifiantProjet:meet._id}));
		});
		return Promise.all(meets);
	}).then(resultat=>{res.send(resultat)})
	
})
}
exports.emailStats=(req,res)=>{
	let resultat=[];
	let id=req.params.id;
	utilisateur.findById({_id:id})
	.then(function(user){
	resultat.push(inmail.find({$and:[{identifiantRecepteur:user.email},{statut:'Non Lu'}]}).countDocuments());
	resultat.push(inmail.find({identifiantEmetteur:user.email}).countDocuments());	
	resultat.push(inmail.find({$and:[{identifiantEmetteur:user.email},{statut:'Lu'}]}).countDocuments());
	return Promise.all(resultat);
	})
	.then(function(resultat){
		res.send(resultat);
	})

}
exports.techLead=(req,res)=>{
	let id=req.params.id;
	equipeDev.findOne({$and:[{identifiantProjet:id},{isTechLead:'true'}]})
	.then(leader=>{
		if(leader)
		{
			utilisateur.findById({_id:leader.identifiantMembre})
			.then(profile=>{
				res.send(profile);
			})
		}
		else
		{
			res.send("no technical leader")
		}
	})
}

exports.sprintTasks=(req,res)=>{
	let taskList=[];
	sprintBacklogItem.find({identifiantSprint:req.params.id})
	.then(function(userStories){
	userStories.forEach(us=>{
			taskList.push(task.find({identifiantUserStory:us.identifiantUserStory}));
		});
		return Promise.all(taskList);
	}).then(result=>{
		let respo=[];
		for(var i=0;i<result.length;i++)
		{
			for(var j=0;j<result[i].length;j++)
			{
			respo.push(result[i][j]);	
			}	
		}
		res.send(respo);
	})
}
exports.sprintUserStories=(req,res)=>{
	let userStories=[];
	sprintBacklogItem.find({identifiantSprint:req.params.id})
	.then(function(items)
	{
		items.forEach(item=>{
			userStories.push(userStory.findOne({_id:item.identifiantUserStory}));
		});
		return Promise.all(userStories);
	}).then(resultat=>{
		res.send(resultat);
	})
}
exports.getUserStory=(req,res)=>{
	let id=req.params.ide;
	userStory.findById({_id:id})
	.then(us=>{
		res.send(us);
	});
}
exports.projectByCategory=(req,res)=>{
	equipeDev.find({identifiantMembre:req.params.id}).countDocuments()
	.then(dev=>{
		project.find({identifiantProductOwner:req.params.id}).countDocuments()
		.then(po=>{
			project.find({identifiantScrumMaster:req.params.id}).countDocuments()
			.then(sm=>{
				stakeholder.find({identifiantUtilisateur:req.params.id}).countDocuments()
				.then(sh=>{
					res.send({po,sm,dev,sh});
				})
			})
		})
	})
}
exports.countTasksForUser=(req,res)=>{
	task.find({identifiantUtilisateur:req.params.id}).countDocuments()
	.then(response=>{
		res.send({response});
	})
}
exports.userProjects=(req,res)=>{
	project.find({ $or: [{ identifiantProductOwner: { $eq: req.params.id } }, { identifiantScrumMaster: { $eq: req.params.id } }] })
	.then(projects => {
	   axios.get('http://localhost:8080/workIn/' + req.params.id)
		  .then(function (response) {
			  let list=[];
			  for(var i=0;i<projects.length;i++)
			  {
				  list.push(projects[i]);
			  }
			  for(var i=0;i<response.data.length;i++)
			  {
				  list.push(response.data[i]);
			  }
			 res.send(list);
		  });
	})
}
exports.getSynonyms= (req,res)=>{

	res.send(getSynonyms(req.params.word));
}
function getSynonyms(word)
{
var model=require('./model');
word=word.replace(':','');
word=model.toLowerCase(word);
word=model.lemmatize(word);
let stemmedWord =model.stemming(word);
let synonymsVector=[];
	let synonyms=require('../../assets/js/synonyms');
	for(var i=0;i<synonyms.length;i++)
	{
		if((synonyms[i].lemma).indexOf(word)>=0)
		{
			let synos=synonyms[i].synonyms.split(';');
			for(var k=0;k<synos.length;k++)
			{
				if(synonymsVector.indexOf(synos[k])==-1)
				{
					synonymsVector.push(synos[k])
				}
			}
		}
	}
	return(synonymsVector);
}
function loadDataSet()
{
let dataset=require('../../assets/js/stories');
res.send(dataset);
}
exports.loadDataSet= (req,res)=>{
res.send(loadDataSet());
}
exports.isSimilarTo= (req,res)=>
{
	let model=require('./model');
	let word1=req.params.word1;
	word1=model.lemmatize(word1);
	word1=model.stemming(word1);
	let word2=req.params.word2;
	word2=model.lemmatize(word2);
	word2=model.stemming(word2);
	let synos=getSynonyms(word1);
		let exist;
		exist=synos.filter(element=>element.indexOf(word2)>=0);
		res.send(exist.length>0);
}
exports.loadDictionary=(req,res)=>{
	let stories=require('../../assets/js/stories');
		var dictionary=[];
		for(var i=0;i<stories.length;i++)
		{
			var storyVector=model.toLowerCase(stories[i].description);
			 storyVector=model.tokenization(stories[i].description);
			 storyVector=model.stopWordsRemover(storyVector);
			 for(var j=0;j<storyVector.length;j++)
			 {
				 let word=model.lemmatize(storyVector[j]);
				 word=model.stemming(word);
				 if(dictionary.indexOf(word)==-1)
				 {
					 word=model.toLowerCase(word);
					 word=model.lemmatize(word);
					 word=model.stemming(word);
					 dictionary.push(word);
				 }
			 }
		}
		res.send(dictionary);
}
exports.getSimilarity= (req,res)=>{

	var sentence=req.params.sentence;
	var teamStrength=parseInt(req.params.teamStrength);
	var dictionaryVector=[];
	sentence=model.toLowerCase(sentence);
	let sentenceVector=model.tokenization(sentence);
	sentenceVector=model.stopWordsRemover(sentenceVector);
	var stories=require('../../assets/js/stories');
	for(var i=0;i<sentenceVector.length;i++)
	{
		sentenceVector[i]=model.lemmatize(sentenceVector[i]);
		sentenceVector[i]=model.stemming(sentenceVector[i]);
	}		
	let similarityVector=[];
	let similaritiesVector=[];
		var storyVector=[];
		var tempo;
		
		//for every user story we calculate how similar is it with the given user story description
		for (var i=0;i<stories.length;i++)
		{				
			similarityVector=[];
			 storyVector=stories[i].vector;	
			 for(var counter=0;counter<storyVector.length;counter++)
			 {				
				 tempo=0;
				 for(var counter1=0;counter1<sentenceVector.length;counter1++)
				 {
					if(model.isSimilarTo(sentenceVector[counter1],storyVector[counter])==true)
					{
						tempo++;
					}
				 }
			 similarityVector.push(tempo);
		}
			similaritiesVector.push(model.cosineSimilarity(similarityVector,model.calculateOwnVector(sentenceVector)));
					
	}
	let maxSimilarity=Math.max.apply(similaritiesVector);
	let minSimilarity=0;
	for(var i=0;i<similaritiesVector.length;i++)
	{
		if((similaritiesVector[i]>maxSimilarity) && (similaritiesVector[i]!=Infinity))
		{
			maxSimilarity=similaritiesVector[i];
		}
		if((similaritiesVector[i]<minSimilarity) && (similaritiesVector[i]!=Infinity))
		{
			minSimilarity=similaritiesVector[i];
		}
	}
	let teamStatus=req.params.teamStatus;
		let objectToPredict={similarity:maxSimilarity,teamStrength,teamStatus};
		let dataset=[];
		for(var i=0;i<stories.length;i++)
		{
			if((similaritiesVector[i]>=0)&&(similaritiesVector[i]<=1))
			{
				dataset.push({similarity:similaritiesVector[i],teamStrength:parseInt(stories[i].teamStrength),teamStatus:stories[i].teamStatus});
			}
			else
			{
				dataset.push({similarity:0,teamStrength:parseInt(stories[i].teamStrength),teamStatus:stories[i].teamStatus});
			}
			
		}
	res.send(model.predictWithDecisionTreeKNN({objectToPredict,dataset},5));
		
}



exports.measureSimilarities=(req,res)=>{
	let measures=[];
	let promises=[];
	axios.get('http://localhost:8080/stories/loadDataSet')
	.then(function(stories){
		 stories=stories.data;
		for(var i=0;i<stories.length;i++)
		{
			promises.push(axios.get('http://localhost:8080/similarities/getSimilarity/'+stories[i].description)
			.then(result=>{
			measures.push(Math.random());
		}));
	}	
	Promise.all(promises).then(() => res.send(measures));
	})
}