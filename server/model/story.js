const mongoose=require('mongoose');
const schema=new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    storyPoints:{
        type:String,
        required:true
    }
});
const story=mongoose.model("stories",schema);
module.exports=story;