var mongoose=require("mongoose");
var schema=new mongoose.Schema({
   
    estimation:{
        type:Number,
        required:true
    },
    priorite:{
        type:Number,
        required:true
    },
    acteur:{
        type:String,
        required:true
    },
    action:{
        type:String,
        required:true
    },
    objectif:{        
        type:String,
        required:true},
    statut:{
        type:String,
        required:true
    },
    acceptanceCriteria:{
        type:String,
        required:true
    },
    identifiantProjet:{
        type:mongoose.Types.ObjectId,
        required:true
    }
}
);
var userStory=mongoose.model("userStories",schema);
module.exports=userStory;
