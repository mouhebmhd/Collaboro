var mongoose=require("mongoose");
var schema=new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:false
    },
    dateMeeting:
    {
        type:Date,
        required:false
    },
    heureMeeting:{
        type:String,
        required:true
    },
    createurMeeting:{
        type:String,
        required:true
    },
    identifiantProjet:{
        type:String,
        required:false
    },
    statut:{
        type:String,
        required:true
    }    
});
var meeting=mongoose.model("meetings",schema);
module.exports=meeting;