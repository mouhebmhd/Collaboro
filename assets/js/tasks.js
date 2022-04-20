function addNewTask()
{  
    let items=document.getElementsByClassName("task");
    let template=document.getElementById("taskModel").cloneNode(true);
    template.classList.remove("d-none");    
    template.cells[0].textContent=items.length+document.getElementsByClassName("taskModel").length;
    document.getElementById("tachesListe").appendChild(template.cloneNode(true));
}
function saveNewTask(event)
{
   let descrtiption=event.currentTarget.parentNode.parentNode.cells[1].childNodes[0].value || "description non spécifiée";
   let statut="En attente";
   let affectedTo=event.currentTarget.parentNode.parentNode.cells[3].getElementsByClassName("affectedTo")[0];
   if((affectedTo.selectedIndex==0)||(affectedTo.value.length==0))
    { 
     //do nothing here because there are some empty fields
    }
    else
    {
        affectedTo=affectedTo.value;
        let priority=event.currentTarget.parentNode.parentNode.cells[4].childNodes[0].value || 1;
        let identifiantUserStory=document.getElementsByClassName(" userStoryIdentifier")[0].textContent;
    
        let data={descrtiption,statut,affectedTo,priority,identifiantUserStory};
        $.ajax({
            'url':'/api/tasks/addNewOne/',
            'method':'post',
            data:data
        })
        .done(function(response)
        {
            if(response=="created")
            {
                location.reload();
            }
            else
            {
                location.assign(response);
            }
        });    
    }
 
}
for(var i=0;i<document.getElementsByClassName("deleteTaskButton").length;i++){
    document.getElementsByClassName("deleteTaskButton")[i].addEventListener("click",function(event){
        let id=(event.currentTarget.id);
        $.ajax({
            'url':'/api/tasks/deleteOne/'+$.param({id}),
            'method': 'delete'
        })
        .done(function(response){
            if(response=="deleted")
            {
            location.reload();
            }
            else if (response=="/login")
            {
            location.assign(response);
            }
        })
    });
}

function updateTask(event)
{  let id=event.currentTarget.id;
    let items=document.getElementsByClassName("task");
    let template=document.getElementById("taskUpdateModel").cloneNode(true);
    template.classList.remove("d-none");    
    template.cells[0].textContent=items.length+document.getElementsByClassName("taskModel").length;   
    let description=event.currentTarget.parentNode.parentNode.cells[1].childNodes[0].textContent;
    let priority=event.currentTarget.parentNode.parentNode.cells[4].childNodes[0].textContent;
    template.cells[1].childNodes[0].value=description;
    template.cells[4].childNodes[0].value=parseInt(priority);
    template.cells[5].childNodes[1].id=id;
    document.getElementById("tachesListe").appendChild(template.cloneNode(true));    
    event.currentTarget.parentNode.parentNode.classList.add("d-none"); 
}
for(var i=0;i<document.getElementsByClassName("updateTaskButton").length;i++) 
{
    document.getElementsByClassName("updateTaskButton")[i].addEventListener("click",updateTask);
}
function updateExistingTask(event)
{
   let descrtiption=event.currentTarget.parentNode.parentNode.cells[1].childNodes[0].value || "description non spécifiée";
   let statut="En attente";
   let affectedTo=event.currentTarget.parentNode.parentNode.cells[3].getElementsByClassName("affectedTo")[0];
   if((affectedTo.selectedIndex==0)||(affectedTo.value.length==0))
    { 
     //do nothing here because there are some empty fields
     affectedTo.classList.add("is-invalid");
    }
    else
    {
        let id=event.currentTarget.id;
        affectedTo.classList.remove("is-invalid");
        affectedTo.classList.add("is-valid");
        affectedTo=affectedTo.value;
        let priority=event.currentTarget.parentNode.parentNode.cells[4].childNodes[0].value || 1;
        let identifiantUserStory=document.getElementsByClassName(" userStoryIdentifier")[0].textContent;
        let data={descrtiption,statut,affectedTo,priority,id};
        $.ajax({
            'url':'/api/tasks/updateOne/',
            'method':'put',
            data:data
        })
        .done(function(response)
        {
            if(response=="updated")
            {
                location.reload();
            }
            else
            {
                location.assign(response);
            }
        });    
    }
 
}
function abandonTask(event)
{
   $.ajax({
       'url':'/api/tasks/abandonTask/'+$.param({id:event.currentTarget.id}),
       'method':'put'
   })
   .done(function(response){
       if(response=='abandonned')
       {
           location.reload();
       }
       else
       {
           location.assign(response);
       }
   });
}
function terminateTask(event)
{
   $.ajax({
       'url':'/api/tasks/terminateTask/'+$.param({id:event.currentTarget.id}),
       'method':'put'
   })
   .done(function(response){
       if(response=='terminated')
       {
           location.reload();
       }
       else
       {
           location.assign(response);
       }
   });
}
function launchTask(event)
{
   $.ajax({
       'url':'/api/tasks/launchTask/'+$.param({id:event.currentTarget.id}),
       'method':'put'
   })
   .done(function(response){
       if(response=='launched')
       {
           location.reload();
       }
       else
       {
           location.assign(response);
       }
   });
}