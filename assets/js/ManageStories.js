function minusOrder(event)
{
    let  priority=parseInt(event.currentTarget.parentNode.getElementsByClassName("USID")[0].textContent);
    if(priority>1)
    {
        priority--;
        event.currentTarget.parentNode.getElementsByClassName("USID")[0].textContent=priority;
        $.ajax({
            'url':'/api/userStory/updatePriority/',
            'method':'put',
            data:{id:event.currentTarget.id,priority: event.currentTarget.parentNode.getElementsByClassName("USID")[0].textContent}
        }).done(function(response){
            if(response!="success")
            {
                location.assign(response);
            }
        });
    }
}
function plusOrder(event)
{
    let  priority=parseInt(event.currentTarget.parentNode.getElementsByClassName("USID")[0].textContent);
     priority++;
        event.currentTarget.parentNode.getElementsByClassName("USID")[0].textContent=priority;
        $.ajax({
            'url':'/api/userStory/updatePriority/',
            'method':'put',
            data:{id:event.currentTarget.id,priority: event.currentTarget.parentNode.getElementsByClassName("USID")[0].textContent}
        });
    
}
function toggleModification() {
    var toolsBar = document.querySelectorAll(".userStoryTools");
    for (var k = 0; k < toolsBar.length; k++) {
        if (toolsBar[k].style.display === "none") {
            toolsBar[k].style.display = "flex";
        }
        else {
            toolsBar[k].style.display = "none";
        }

    }
}

function createNewUserStory() {
    var template = document.getElementsByClassName("userStoryCardModel")[0].cloneNode(true);
    template.classList.remove("d-none");
    template.getElementsByClassName("tools")[0].style.display="block";
    document.getElementsByClassName("userStories")[0].appendChild(template.cloneNode(true));
}



var buttons = document.getElementsByClassName("deleteUserStory");
for (var i=0;i<buttons.length;i++)
{
  buttons[i].addEventListener('click', function () 
    {
        let launcher=this.parentNode.parentNode.parentNode;
        let id=this.parentNode.parentNode.parentNode.id;
        $.ajax({
            'url':'/api/userStories/delete/'+$.param({id}),
            'method':'delete'
        })
        .done(function(response){
            if(response==="deleted")
            {
                launcher.style.display="none";
            }
            else
            {
                location.assign("/error500");
            }
        });
    });  
}

function saveNewUserStory(event)
{
    let btn=event.currentTarget;
    let priorite=btn.parentNode.parentNode.parentNode.getElementsByClassName("USID")[0].textContent;
    let estimation=btn.parentNode.parentNode.parentNode.getElementsByClassName("estimation")[0].value;
    let actor=btn.parentNode.parentNode.parentNode.getElementsByClassName("storyActor")[0].value;
    let action=btn.parentNode.parentNode.parentNode.getElementsByClassName("storyAction")[0].value;
    let value=btn.parentNode.parentNode.parentNode.getElementsByClassName("storyGoalValue")[0].value;
    let acceptnceCriteria=btn.parentNode.parentNode.parentNode.getElementsByClassName("acceptnceCriteria")[0].value;
    var validate=true;
    if(estimation==="")
    {
        validate=false;
    }
    if(actor==="")
    {
        validate=false;
    }
    if(action==="")
    {
        validate=false;
    }
    if(value==="")
    {
        validate=false;
    }
    if(acceptnceCriteria==="")
    {
        validate=false;
    }
    if(validate)
    {
        var template=document.getElementsByClassName("userStoryCardModelShow")[0].cloneNode(true);
        template.classList.remove("d-none");
        template.getElementsByClassName("USID")[0].textContent=priorite;
        template.getElementsByClassName("storyEstimationValue")[0].textContent=estimation;
        template.getElementsByClassName("storyActorValue")[0].textContent=actor;
        template.getElementsByClassName("storyActionValue")[0].textContent=action;
        template.getElementsByClassName("storyGoalValue")[0].textContent=value;
        let projectId=document.getElementsByClassName("projetId")[0].textContent;
        template.getElementsByClassName("storyAcceptanceValue")[0].textContent=acceptnceCriteria;
        let data={estimation,actor,action,value,acceptnceCriteria,projectId,priorite};
        $.ajax({
            'url':'/api/userStories/create/',
            'method':'post',
            data:data
        })
        .done(function(response){
            if(response==="created")
            {
                document.getElementsByClassName("userStories")[0].appendChild(template.cloneNode(true));
                btn.parentNode.parentNode.parentNode.classList.add("d-none");
            }
        });
    }
}
var updateButtons=document.getElementsByClassName("modifyUserStory");
for(var i=0;i<updateButtons.length;i++)
{
    updateButtons[i].addEventListener("click",function(){
        
        var template=document.getElementsByClassName("userStoryCardModel")[0].cloneNode(true);
        template.classList.remove("d-none");
        let priorite=(this.parentNode.parentNode.parentNode.getElementsByClassName("USID")[0].textContent);
       let estimation= (this.parentNode.parentNode.parentNode.getElementsByClassName("storyEstimationValue")[0].textContent);
       let actor=(this.parentNode.parentNode.parentNode.getElementsByClassName("storyActorValue")[0].textContent);
       let action=(this.parentNode.parentNode.parentNode.getElementsByClassName("storyActionValue")[0].textContent);
       let goal=(this.parentNode.parentNode.parentNode.getElementsByClassName("storyGoalValue")[0].textContent);
        let acceptenceCriteria=(this.parentNode.parentNode.parentNode.getElementsByClassName("storyAcceptanceValue")[0].textContent);
        let id=this.parentNode.parentNode.parentNode.id;
        template.getElementsByClassName("USID")[0].textContent=priorite;
        template.getElementsByClassName("estimation")[0].value=estimation;
        template.getElementsByClassName("storyActor")[0].value=actor;
        template.getElementsByClassName("storyAction")[0].value=action;
        template.getElementsByClassName("storyGoalValue")[0].value=goal;
        template.getElementsByClassName("acceptnceCriteria")[0].value=acceptenceCriteria;
        template.id=id;
        let btn=template.getElementsByClassName("saveNewUserStory")[0];
        btn.classList.replace("saveNewUserStory","updateUserStory");
        btn.classList.replace("btn-success","btn-primary");
        btn.childNodes[1].textContent="Mettre à jour";
        btn.setAttribute("onclick","updateUserStory(event)");
        document.getElementsByClassName("userStories")[0].appendChild(template.cloneNode(true));
        this.parentNode.parentNode.parentNode.classList.add("d-none");
    });
}
function updateUserStory(event)
{

   let launcher=event.currentTarget.parentNode.parentNode.parentNode;
   let priorite=launcher.getElementsByClassName("USID").textContent;
   let estimation=launcher.getElementsByClassName("estimation")[0].value;
   let actor=launcher.getElementsByClassName("storyActor")[0].value;
   let action=launcher.getElementsByClassName("storyAction")[0].value;
   let value=launcher.getElementsByClassName("storyGoalValue")[0].value;
   let acceptnceCriteria=launcher.getElementsByClassName("acceptnceCriteria")[0].value;
   let data={actor,action,value,acceptnceCriteria,id:launcher.id,estimation};
    $.ajax({
        'url':'/api/userStories/update/',
        'method':'PUT',
         data:data
    })
    .done(function(response){
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
