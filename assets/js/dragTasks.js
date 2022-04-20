function showUserStory(id)
{
    $.ajax({
        'url':'http://localhost:8080/userStories/getOne/'+id,
        'method':'get'
    }).done(function(data)
    {
        document.getElementsByClassName('userStoryIdValue')[0].textContent=data._id;
        document.getElementsByClassName('storyEstimationValue')[0].textContent=data.estimation;
        document.getElementsByClassName('storyActorValue')[0].textContent=data.acteur;
        document.getElementsByClassName('storyActionValue')[0].textContent=data.action;
        document.getElementsByClassName('storyGoalValue')[0].textContent=data.objectif;
        document.getElementsByClassName('storyAcceptanceValue')[0].textContent=data.acceptanceCriteria;
        $('#exampleModal').modal('show')
    });
}
window.addEventListener("load",function()
{
    var dropZones=document.querySelectorAll(".dropZone");
    for(var i=0;i<dropZones.length;i++)
    {
        dropZones[i].classList.remove("dropZone");
    }
});
