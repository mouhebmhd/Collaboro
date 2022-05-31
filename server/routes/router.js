const express = require('express');
const route = express.Router();
const services =require('../services/render');
const controller=require('../controller/controller');
const worker=require("../services/workers");
const { Router } = require('express');


/* WORKERS ARE GET APIS WHO ARE USED TO RETRIEVE A SPECIFIC DATA SUCH A DATE,TIME OR WEATHER INFOS,OR SOMETIMES TO GET A SPECIFIC DATA to be used by another API */

//for this api we give the project id as input and we got the project infos as input
route.get("/project/infos/:id",worker.findProject);
//this api is used to render the profile of the technical leader of a project
route.get('/project/techLead/:id',worker.techLead);
//this api is used to load the statistics of inmails of an user 
route.get("/inmails/statistics/:id",worker.emailStats);
//this api is used to load the list of meetings of an user 
route.get('/meetings/meetingsList/:id',worker.loadMeetingsList);
//this api is used to load the list that contains thename and the id of each project where the user is a po,sm or develoeper
route.get('/project/listNameAndId/:id',worker.listProjectNameAndId)
//this api is used to load the user stories and the list of task to the sprint Backlog of a sprint 
route.get('/sprint/runningSprint/sprintBacklog/:id',worker.sprintBacklog);
//this api is used to count the number of tasks done of a sprint 
route.get('/sprint/tasksDone/:id',worker.tasksDone);
//thisd api is used to get the tasks list of a sprint
route.get("/sprint/running/stats/:id",worker.sprintstat);
//this api is used to load all the days of a running sprint
route.get("/sprint/days/:id",worker.allSprintDays);
//this api is used to load the sprint burndown chart of a running sprint
route.get("/sprint/burnDownChart/:id",worker.sprintBDN);
//this api is used to load the sprint burn up chart of a running sprint
route.get("/sprint/burnUpChart/:id",worker.sprintUP);
//this api is used tot count the number of obstalces and risks of a specififc project
route.get('/project/countObstaclesAndRisks/:id',worker.getObstaclesAndRisks);
//this api is used to load statistsitcs of a project 
route.get("/projects/project/loadStats/:id",worker.statistics);
//this api is used to get relative ststsistics of a project 
route.get('/project/showStats/:id',worker.projectStat);
//this api is used to count how many tasks are done for every sprint 
route.get('/countForSprint/:id',worker.achievedOfSprint);
//this api is used to get the number of user stories of each sprint and the number of tasks
route.get('/sprint/tasksAndUserStories/:id',worker.calculForSprint);
//this api is used to give the full informations of an user using he's _id
route.get('/user/getById/:id',worker.getUser);
//this api is used to get the realtive infos of an user story
route.get("/userStories/getOne/:ide",worker.getUserStory);
//for this api we give the id of an user and it gives the list of project were his role is a developer
route.get("/workIn/:id",worker.workIN);
//this api is used to get the list of users who did declared new impediments(obstacles) in the impediment log
route.get('/declared/impediment/:id',worker.declareRegister);
//this api is used to get the list of personal data of the user who had already added some items in the risk log
route.get('/declared/risk/:id',worker.declareRiskRegister);
//this api is used to render the average of declared risks for a certain project
route.get('/risk/average/:id',worker.declaredRiskAverage);
//this api is used to get the list of developers of a certain project
route.get("/project/developers/:id",worker.developersList);
//this api is used to get the list of developers of all the tasks of an user story
route.get("/tasks/developers/:id",worker.developersListForTask);
//this api is used to get the full date of today in format dd-mm-yyyy
route.get("/date",worker.getDate);
//this api is used to get the weather infos of a specific city or country
route.get("/weather/:city&:country",worker.getWeather);
//this api is used to give statistics about impediment log(solved,still waiting )
route.get('/statistics/impedimentLog/:id',worker.impedimentLogStats);
//this api is used to load the tasklist and the list of user stories of a sprint 
route.get('/sprint/sprintTasksList/:id',worker.sprintTasks);
//this api is used to load the list of the user Stories of a sprint
route.get('/sprint/sprintUserStoriesList/:id',worker.sprintUserStories);
//this route is used to load the details of an user story
route.get('/userStories/getOne/:id',worker.getUserStory);
//this api is used to load some statistics relative to project for a specific user
route.get('/project/byCategory/:id',worker.projectByCategory);
//this api is used to load the number of tasks affected to a specific user
route.get('/tasks/countForUser/:id',worker.countTasksForUser);
//this api is used  to load the list of projects of an user
route.get('/user/projects/:id',worker.userProjects);
//this api is used to get the list of synonyms of a word
route.get('/words/getSynonyms/:word',worker.getSynonyms);
//this api is used to load the dataset
route.get('/stories/loadDataSet',worker.loadDataSet);
//this api is used to load the dictionary
route.get('/data/loadDictionary',worker.loadDictionary);
//this api is used to check if two word are similar
route.get('/similarities/isSimilarTo/:word1/:word2',worker.isSimilarTo);
//this api is used to get the list of similarities of a given text 
route.get('/similarities/getSimilarity/:sentence',worker.getSimilarity);
//this api is used to measure all similarities of the documents of our dataset
route.get('/similarity/measureAllSimilarities/',worker.measureSimilarities);



/***********************************GET APIS********************************************/
//GET APIS ARE USED TO LOG SOME PAGEs OR DATA,BUT NOT TO UPDATE ,DELETE OR INSERT DATA TO AND FROM THE DATABASE 


//those two apis  are used to show the index page
route.get('/', services.homeRouter);
route.get('/index', services.homeRouter);
//this api is used to get the login page 
route.get('/login', services.login);
//this api is used to get the register page 
route.get('/register', services.register);
//this api is used to get the dashboard after the login process
route.get("/dashboard",services.dashboard);
//those two apis are used to show the EDIT PROFILE PAGE of the current user 
route.get('/EditMyProfile',services.editMyProfile);
route.get('/EditMyProfile/:id',services.editMyProfile);
//this apis is used to get the Page of the creation of a new project
route.get('/nouveauProjet',services.nouveauProjet);
//this api is used to get all the project where the current user is a scrum master,product owner or a developer
route.get('/projets',services.projects);
//this api is used to list all notifications of the current user 
route.get('/notification',services.notifications);
//this api is used to logout the user and terminate his own session 
route.get('/logout',services.logout);
//this api is used to  show the status of the project an d all relative informations 
route.get('/project/:id',services.showProject);
//this api is used to log the page where the user can update relative informations of the project 
route.get('/project/update/:id',services.updateProject);
//this api is used to log th development team of a project 
route.get('/project/devTeam/:id',controller.showDevTeam);
//this api is used to log the page where the scrum master can add new members to the team 
route.get('/members/add/:id',services.addMember);
//this api is used to log the product backlog of a specific project 
route.get('/project/showProductBacklog/:id',services.showProductBacklog);
//this api is used to log the  page where the po can manage user stories 
route.get('/project/manage_userStories/:id',services.manageUserStories);
//this api is used to show the profile page of a certain user of the plateforme
route.get('/users/profile/view/:id',services.viewProfile);
//this api is used to dshow the persona of a specific project
route.get('/project/showPersonas/:id',services.showPersona);
//this api is used to render the persona creation page to allow him to create a new persona for the project
route.get('/api/personas/create/:id',services.createNewPersona);
//this api is used to render the page where the user can update an existing persona
route.get('/api/persona/update/:id&:projet',services.updatePersona);
//this route is used to get the list of all stakeholders of a project
route.get('/project/showSh/:id',controller.showStakeholders);
//this api is used to get the page where the scrummaster or the product owner can add new stakeholder
route.get('/stakeholders/add/:id',services.addStakeholder);
//this api is used to load tthe list of tasks relatice to an user story
route.get('/api/userStories/viewTaskList/:id',services.viewTaskList);
//this api is used to show the list of project to the user to allow him to select a project to view the sprints list relative to it  
route.get('/sprints/',services.showSprintsList);
//this api is used to  get the sprints view of a certain project 
route.get('/sprints/showSprint/:id',services.showSprint);
//this api is used to  render the impediment log of a projec.An impediment log is a place where the users can add a brief description of the problems that they had faced
route.get('/project/impedimentLog/:id',services.showImpedimentLog);
//this api is used to show the risk log of the project 
route.get('/project/riskLog/:id',services.showRiskLog);
//thhis api is used to create a new sprint within a project 
route.get('/project/sprints/startOne/:id',services.startNewSprint);
//this api is used to load the list of all sprint of a project 
route.get('/api/sprintsList/:id',services.loadSprintsList);
//this api is used to terminate a running sprint 
route.get('/api/sprints/terminateOne/:id',services.terminateSprint);
//this api is used to accept a sprint
route.get('/api/sprints/acceptOne/:id',services.acceptSprint);
//this api is used to allow the product owner to refuse a sprint 
route.get('/api/sprints/refuseOne/:id',services.refuseSprint);
//this api is used to allow the product owner to cancel a sprint
route.get('/api/sprints/cancelOne/:id',services.cancelSprint);
//this api  is used to show the sprintBacklog of a sprint 
route.get('/api/sprint/sprintBacklog/:id',services.showSprintBacklog);
//this api is usedto load the list of tasks of the current user
route.get('/taches/',services.showTasks);
//this api is used to load the list of meetings of an user
route.get('/meeting/',services.showMeetings);
//this api is show the email panel of an user 
route.get('/chat/',services.showEmails);
//this api is used to show the list of sent emails
route.get('/sent/',services.sentInMails);
//this api is used to show the list of deleted emails
route.get('/corbeille/',services.deletedInMails);
//this api is used to render the documentation page 
route.get('/documentation',services.showDocumentation);
//this api is used to log the error page when the status is equal to 500
route.get('/error500',services.error500);
//this api is used to render the page where users can estimate the duration of an user story
route.get('/userStories/estimator',services.storyPointsEstimator);
//default router,is used to log 404 page not found whene entering unexpected url in the browser
route.get('*',services.error404);


/***********************************POST APIS********************************************/
//POST APIS ARE USED POST NEW DATA TO THE DATA BASE WHICH MEANS TO INSERT NEW DOCUMENTS TO THE DATA BASE 

//this api is used to check the identity of the user ,to verify if he has already an account 
route.post("/api/login/utilisateurs",controller.loginAttempt);
//this api is used to register a new user to the database 
route.post("/api/register/utilisateurs",controller.registerAttempt);
//this api is used to create a new project 
route.post('/api/project/add',controller.createNewProject);
//this api is used to update a specific project
route.post('/api/project/update/',controller.updateProject);
//this api is used to update some user skills 
route.post('/api/skills/update/',controller.updateSkills);
//this api is used to perform update on user studies to achieve the objective of completing his profile
route.post('/api/studies/update/',controller.updateStudies);
//this api is used to add a new member to the development team of a certain project 
route.post('/api/members/addToTeam/',services.addMemberToTeam);
//this api is used to create a new user story and to be added the product backlog of a project
route.post('/api/userStories/create/',controller.createNewUserStory);
//this api is used to create a new persona for a specific project 
route.post('/api/persona/createNewPersona',controller.createNewPersona);
//this api is used to add a new stakeholder to the project 
route.post('/api/stakeholders/add/',controller.createNewStakeholder);
//this route is used to add a new task for the task list relative to an user story
route.post('/api/tasks/addNewOne/',controller.addNewTask);
//this api is used to add a newitem to the impediment log 
route.post('/api/impedimentLog/addItem/',controller.addNewImpediment);
//thjis api is used to append a new risk to risk Log
route.post('/api/riskLog/addItem/',controller.addNewRisk);
//this api is used to  start a new sprint in a project 
route.post('/api/sprints/startOne/',controller.startSprint);
//this api is used to add a new meeting 
route.post('/api/meetings/addOne/',controller.addMeeting);
//this api is used to send a request to a member to assist a meeting
route.post('/api/meetings/sendInvitation/',controller.sendInvitation);
//this api is used to send a new message
route.post('/api/messages/sendNewMessage/',controller.sendNewMessage);

/***********************************DELETE APIS********************************************/
//DELETE APIS ARE USED TO DELETE SOME SPECIFIC DATA FROM THE DATA BASE 

//this api is used to delete a notification
route.delete('/api/notifications/delete/:id',services.deleteNotification);
//this api is used to delete a project
route.delete('/api/projects/delete/:id',services.deleteProject);
//this api is used to delete a member of the development team of a project 
route.delete('/api/devTeam/delete/:id&:idp',services.deleteMember);
//this api is used to delete an user story of the product backlog of a project 
route.delete('/api/userStories/delete/:id',services.deleteUserStory);
//this api is used to delete a custom persona
route.delete("/api/perosna/delete/:id",services.deletePersona);
//this api is used to remove a stakeholder form the list of stakeholders
route.delete('/api/stakeholders/delete/:id',services.deleteStakeholder);
//this api is used to delete a task from the task list of an user storyGoalValue
route.delete('/api/tasks/deleteOne/:id',services.deleteTask);
//this api is used to delete an item  from the impedimnent log of a product 
route.delete('/api/impedimentLog/deleteItem/:id',services.deleteItem);
//this api is used to remove an item form the risk log of a project 
route.delete('/api/riskLog/removeItem/:id',services.removeRisk);
//this api is used to remove a meeting
route.delete('/api/meetings/removeMeeting/:id',services.removeMeeting);

/***********************************PUT APIS********************************************/
//PUT APIS ARE USED TO UPDATE DATA THAT ALREADY EXISTS IN THE DATA BASE

//this api is used to update the role of a member in the development team in a certain project 
route.put('/api/devTeam/update/:idMember&:idProject&:Role',services.updateMemberRole);
//this api is used to update the persona data of the user 
route.put('/api/profile/update/',services.updateProfile);
//this api is used to terminate a project ,which means to set the status of the project to "DONE"
route.put('/api/projects/terminate/:id',services.terminateProject);
//this api is used to  update the descriptions of an existing user story 
route.put('/api/userStories/update/',services.updateUserStory);
//this api is used to update the priority of an existing user story
route.put('/api/userStory/updatePriority/',services.updateUserStoryPriority);
//this api is used to  update the state of an user story from 'waiting ' to done,progress or testing 
route.put('/api/userStories/updateState/',services.updateUserStoryState);
//this api is used to update an existing project Persona
route.put('/api/persona/updatePersona/',services.updatePersonaData);
//this api is used to update the role of a stakeholder in a project
route.put('/api/stakeholders/update/',services.updateStakeholderRole);
//this api is used to update the content of an existing task relative to the task list of an user story
route.put('/api/tasks/updateOne/',services.updateTask);
//this api is used to change the state of an item in the impediment log from waiting to solved
route.put('/api/impedimentLog/solveIssue/:id',services.solveIssue);
//this api is used to change the description of the issue decalred in the impediment log 
route.put('/api/impedimentLog/updateItem/',services.updateItemDescription);
//this api is used to update the main descrription of a risk in the risk log
route.put('/api/riskLog/updateItem/',services.updateRiskDescription);
//this api is used to launch a new sprint in a specific project
route.put('/api/sprint/launch/:id',services.launchSprint);
//this api is used to abandon a task.Abandon a task means to update its statue to abandonned
route.put('/api/tasks/abandonTask/:id',services.abandonTask);
//this api is used to terminate a task 
route.put('/api/tasks/terminateTask/:id',services.terminateTask);
//this api is used to launch a task.Launch a task means to update its statue from waiting to progress
route.put('/api/tasks/launchTask/:id',services.launchTask);
//this api is used to update the statue of a meeting to done
route.put('/api/meetings/terminateMeeting/:id',services.terminateMeeting);
//this api is used to  load mark an inmail as seen 
route.put("/api/inmails/seenUpdate/:id",services.markInMailAsSeen);
//this api is used to delete an email for  the receiver
route.put('/api/inmails/deleteForReceiver/:id',services.deleteForReceiver);
//this api is used to delete an email for  the sender
route.put('/api/inmails/deleteForSender/:id',services.deleteForSender);
//this api is used to name a developer as a technical leader for the team 
route.put('/api/devTeam/nameAsTechLEad/:idMember&:idProject',services.nameTechLead);
module.exports=route;