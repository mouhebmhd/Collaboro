const mongoose = require('mongoose');
//Definition de la structure d'un enregistrment contenant le profil d'un utilisateur
var schema = new mongoose.Schema({
    identifiantSprint: 
    {
        type:mongoose.Types.ObjectId,
        required:true
    },
    identifiantUserStory: 
    {
        type:mongoose.Types.ObjectId,
        required:true
    }
});
const sprintItem = mongoose.model('sprintBacklogItems', schema);
module.exports = sprintItem;
