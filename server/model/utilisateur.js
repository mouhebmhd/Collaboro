const mongoose = require('mongoose');
//Definition de la structure d'un enregistrment contenant le profil d'un utilisateur
var schema = new mongoose.Schema({
    nom : {
        type : String,
        required: true
    },
    prenom : {
        type : String,
        required: true
    },
    genre: {
        type : String,
        required: true
    },
    ville: {
        type : String,
        required: true
    },
    pays : {
        type : String,
        required: true
    },
    codePostale: {
        type : String,
        required: true
    },
    jourNaissance: {
        type : Number,
        required: true
    },
    moisNaissance: {
        type : String,
        required: true
    },
    anneeNaissance: {
        type : Number,
        required: true
    },
    email: {
        type : String,
        required: true,
        unique:true
    },
    motDePasse: {
        type : String,
        required: true
    },
    telephone: {
        type : String,
        required: true
    },
    photo: {
        type : String,
        required: true
    },
    linkedin: {
        type : String,
        required:true
    }
});

const utilisateur = mongoose.model('utilisateur', schema);
module.exports = utilisateur;
