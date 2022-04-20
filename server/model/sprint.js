const mongoose = require('mongoose');
//Definition de la structure d'un enregistrment contenant le profil d'un utilisateur
var schema = new mongoose.Schema({
    statut:{
        type:String,
        required: true
    },
    dateDebut: {
        type : String,
        required: true
    },
    jours: {
        type : Number,
        required: true
    },
    semaines:{
        type:Number,
        required:true
    },
    heures:{
        type:Number,
        required:true
    },
    description: {
        type : String,
        required: true
    },
    titre:{
        type:String,
        required:true
    },
    identifiantProjet: 
    {
        type:mongoose.Types.ObjectId,
        required:true
    }
});
const sprint = mongoose.model('sprints', schema);
module.exports = sprint;
