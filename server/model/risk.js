const mongoose=require("mongoose");

let schema=new mongoose.Schema({
    description:
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
    }
});
let risque=mongoose.model("risques",schema);
module.exports =risque;