function addMemberToTeam(event)
{
    var project=document.getElementById('projectIdentifier').textContent;
   var member=event.target.id;
   $.ajax({
       'url':'/api/members/addToTeam/',
       'method':'POST',
       data:{project,member}
   }).done(function(response){
       location.assign("/project/devTeam/"+project);
   })
}
function addStakeholder(event)
{
    var project=document.getElementById('projectIdentifier').textContent;
   var member=event.currentTarget.id;
   $.ajax({
       'url':'/api/stakeholders/add/',
       'method':'POST',
       data:{project,member}
   }).done(function(response){
       if(response==='created')
       {
        location.assign("/project/showSh/"+project);
       }
       else
       {
           location.assign(response);
       }
   });
}
function launchSearch()
{
    let query=document.getElementById("searchField").value.toUpperCase();
    let resultat=document.getElementsByClassName("developerName");
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