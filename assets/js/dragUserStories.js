var dropZones=document.querySelectorAll(".dropZone");
function start(e)
{
    e.dataTransfer.effectAllowed="move";
    e.dataTransfer.setData("text",e.target.getAttribute("id"));
}
function over(e)
{
    e.currentTarget.classList.add("dropZone");
    return false;
}
function drop(e)
{
    var ob=e.dataTransfer.getData("text");
    e.currentTarget.appendChild(document.getElementById(ob));
    let idUserStory=ob;
    let cls=e.currentTarget;
    if(cls.classList.contains("doneUserStories")===true)
    {
        cls="terminé";
    }
    else if(cls.classList.contains("testUserStories")===true)
    {
        cls="En test";
    }
     else if(cls.classList.contains("progressUserStories")===true)
    {
        cls="En progression";
    }
   else 
    {
        cls="En attente";
    }
    $.ajax({
        'url':'/api/userStories/updateState/',
        'method':'put',
        data:{idUserStory,cls}
    })
    .done(function(response)
    {
        if(response!="updated")
        {
            location.assign(response);
        }
    });
    



    e.stopPropagation();
    for(var i=0;i<dropZones.length;i++)
    {
        dropZones[i].classList.remove("dropZone");
    }
    return false;
}
window.addEventListener("load",function()
{
    var dropZones=document.querySelectorAll(".dropZone");
    for(var i=0;i<dropZones.length;i++)
    {
        dropZones[i].classList.remove("dropZone");
    }
});