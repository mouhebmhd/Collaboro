const mongoose=require('mongoose');
let schema=new mongoose.Schema({
    lemma:{
        type:String,
        required:true
    },
    part_of_speech:{       
         type:String,
        required:true
    },
    synonyms:{
        type:String,
        required:true
    },
});
let synonym=mongoose.model("synonyms",schema);
module.exports=synonym;