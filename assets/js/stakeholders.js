for(var i=0;i<document.getElementsByClassName("deleteStakeholder").length;i++)
{
  document.getElementsByClassName("deleteStakeholder")[i].addEventListener("click",function(event){
let id=event.currentTarget.id;
$.ajax({
    'url':'/api/stakeholders/delete/'+$.param({id}),
    'method':'delete'
    })
    .done(function(response){
        if(response=='deleted')
        {
            location.reload();
        }
        else
        {
            location.assign(response);
        }
    })
});  
}
for(var i=0;i<document.getElementsByClassName("modifyStakeholder").length;i++)
{
document.getElementsByClassName("modifyStakeholder")[i].addEventListener("click",function(event){
    let parent=event.currentTarget.parentNode.parentNode;
    event.currentTarget.classList.add("d-none");
    parent.getElementsByClassName("updateStakeholder")[0].classList.remove("d-none");
    parent.getElementsByClassName("stakeholderRoleName")[0].classList.add("d-none");
    parent.getElementsByClassName("stakeholderNewRoleName")[0].classList.remove("d-none");
});
}
for(var i=0;i<document.getElementsByClassName("updateStakeholder").length;i++)
{
document.getElementsByClassName("updateStakeholder")[i].addEventListener("click",function(event){
   $.ajax({
        'url':'/api/stakeholders/update/',
        'method':'put',
        data:{id:event.currentTarget.id,newRole:event.currentTarget.parentNode.parentNode.getElementsByClassName("stakeholderNewRoleName")[0].childNodes[0].value}
    });
        location.reload();

}); 
}
function launchSearchSH()
{
    let query=document.getElementById("searchField").value.toUpperCase();
    let resultat=document.getElementsByClassName("stakeholderName");
    let queries=[];
    for(var i=0;i<resultat.length;i++)
    {
        queries[i]=resultat[i].textContent.toUpperCase();
    }
    for(var i=0;i<queries.length;i++)
    {
        if(queries[i].indexOf(query)>-1)
        {
        resultat[i].parentNode.parentNode.classList.remove("d-none");
        }
        else
        {
        resultat[i].parentNode.parentNode.classList.add("d-none");
        }
    }
    
}