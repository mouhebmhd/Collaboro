function toggleProjects()
{
    var grid=document.getElementById("project-grid");
   var icon=document.getElementById("toggle-rojects-button");
    if(grid.style.display==="none")
    {
    grid.style.display="flex"   
    icon.classList.replace("bi-arrow-bar-down","bi-arrow-bar-up");
}
    else
    {
    grid.style.display="none"
    icon.classList.replace("bi-arrow-bar-up","bi-arrow-bar-down");
    }

}
function toggleTasks()
{
    var grid=document.getElementById("tasks-grid");
   var icon=document.getElementById("toggle-tasks-button");
    if(grid.style.display==="none")
    {
    grid.style.display="flex"   
    icon.classList.replace("bi-arrow-bar-down","bi-arrow-bar-up");
}
    else
    {
    grid.style.display="none"
    icon.classList.replace("bi-arrow-bar-up","bi-arrow-bar-down");
    }

}
function deleteProject(event)
{
    $.ajax({
        "url" : `/api/projects/delete/${event.target.id}`,
        method : 'delete'
    }).done(function(response){
        location.assign('/projets');
    })
}
function terminateProject(event)
{
    $.ajax({
        "url" : `/api/projects/terminate/${event.target.id}`,
        method : 'put'
    }).done(function(response){
        location.assign('/projets');
    })
}
