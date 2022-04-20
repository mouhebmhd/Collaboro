const mongoose=require("mongoose");

let schema=new mongoose.Schema({
    decription:
    {
        type:String,
        required:true
    },
    identifiantProjet:
    {
        type:mongoose.Types.ObjectId,
        required:true
    },
    declaredBY:
    {
        type:mongoose.Types.ObjectId,
        required:true
    },
    dateDeclaration:
    {
        type:String,
        required:true
    },
    statut:
    {
        type:String,
        required:true
    }
});
let obstacle=mongoose.model("obstacles",schema);
module.exports =obstacle;