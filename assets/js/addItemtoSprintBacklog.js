var items=[];
function ToggleItemSprintBacklog(event) 
{
    let id=event.currentTarget.id;    
    if(event.currentTarget.classList.contains("text-success"))
    {
        //here we are going to add the item to the sprint backlog
        event.currentTarget.classList.replace("text-success","text-muted");
        items=items.filter(elem=>elem!=id);        
    }
    else
    {
        //here we will remove the item from the sprint backlog 
        event.currentTarget.classList.replace("text-muted","text-success");
        items.push(id);   

    }
    
}
function startNewSprint(event)
{
    let projectId=event.currentTarget.id;
    let titre=document.getElementsByName("titre")[0];
    let description=document.getElementsByName("description")[0];
    let hours=document.getElementsByName("hours")[0];
    let days=document.getElementsByName("days")[0];
    let weeks=document.getElementsByName("weeks")[0];
    let returnValue=true;
    let jour=document.getElementById("jour");
    let mois=document.getElementById("month");
    let annee=document.getElementById("year");
    if(titre.value.length==0)
    {
        titre.classList.add("is-invalid");
        returnValue=false;
    }
    else
    {
        titre.classList.remove("is-invalid");
        titre.classList.add("is-valid");

    }
    if(description.value.length==0)
    {
        description.classList.add("is-invalid");
        returnValue=false;
    }
    else
    {
        description.classList.remove("is-invalid");
        description.classList.add("is-valid");

    }
    if(hours.value==0)
    {
        hours.classList.add("is-invalid");
        returnValue=false;
    }
    else
    {
        hours.classList.add("is-valid");
        hours.classList.remove("is-invalid");
    }
    if(days.selectedIndex==0)
    {
        days.classList.add("is-invalid");
        returnValue=false;
    }
    else
    {
        days.classList.add("is-valid");
        days.classList.remove("is-invalid");
    }
    if(weeks.selectedIndex==0)
    {
        weeks.classList.add("is-invalid");
        returnValue=false;
    }
   else
    {
        weeks.classList.remove("is-invalid");
        weeks.classList.add("is-valid");
    }
    if((jour.value>31)||(jour.value<1))    
    {
        jour.classList.add("is-invalid");
        returnValue=false;
    }
    else
    {
        jour.classList.remove("is-invalid");
        jour.classList.add("is-valid");
    }
    if(mois.selectedIndex==0)
    {
        mois.classList.add("is-invalid");
        returnValue=false;
    }
    else
    {
        mois.classList.remove("is-invalid");
        mois.classList.add("is-valid");
    }
    let d=new Date().getFullYear();
    if(annee.value<d)
    {
        annee.classList.add("is-invalid");
        returnValue=false;
    }
    else
    {
        annee.classList.remove("is-invalid");
        annee.classList.add("is-valid");
    }
    let data={projectId,titre,description,hours,days,weeks,items,jour:jour.value,annee:annee.value,mois:mois.selectedIndex};
    if(returnValue)
    {
        if(items.length==0)
        {
            document.getElementsByClassName("nonValidatedForm")[0].classList.remove("d-none");
        }
        else
        {
            document.getElementsByClassName("nonValidatedForm")[0].classList.add("d-none");
            $.ajax({
                'url':'/api/sprints/startOne/',
                'method':'post',
                data: {projectId,hours:hours.value,days:days.value,weeks:weeks.value,items,description:description.value,titre:titre.value,dateDebut:jour.value+'/'+mois.selectedIndex+'/'+annee.value}
            })
            .done(function(response){
                if(response=='created')
                {
                    location.assign("/sprints/showSprint/"+projectId);
                }
                else
                {
                    location.assign(response);
                }
            });
        }
    }
}
