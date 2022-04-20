
function addNewObstacle(event) 
{
    let template=document.getElementsByClassName("obstacleModel")[0].cloneNode(true);
    template.classList.remove("d-none");
    template.cells[0].textContent=document.getElementsByClassName("obstacleItem").length+1;
    document.getElementsByClassName("obstaclesList")[0].appendChild(template.cloneNode(true));
}

function createObstacle(event)
{
    let idProject=event.currentTarget.id;
    let description=event.currentTarget.parentNode.parentNode.cells[1].childNodes[0].value;
    let date=event.currentTarget.parentNode.parentNode.cells[3].textContent;
    $.ajax({
        'url':'/api/impedimentLog/addItem/',
        'method': 'POST',
        data:{idProject,description,date}
    })
    .done(function(response){
        if(response=='created')
        {
            location.reload();
        }
        else
        {
            location.assign(response);
        }
    });
}
function deleteIssue(event) 
{
let id=(event.currentTarget.id);
$.ajax({
    'url':'/api/impedimentLog/deleteItem/'+$.param({id}),
    'method': 'DELETE'
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
}
function solveIssue(event)
{
let id=(event.currentTarget.id);
$.ajax({
    'url':'/api/impedimentLog/solveIssue/'+$.param({id}),
    'method': 'put'
})
.done(function(response){
if(response=='solved')
{
    location.reload();
}
else
{
    location.assign(response);
}
})
}
function modifyIssue(event)
{
event.currentTarget.parentNode.parentNode.cells[1].childNodes[0].classList.remove("d-none");
event.currentTarget.parentNode.parentNode.cells[1].childNodes[1].classList.add("d-none");
event.currentTarget.classList.add("d-none");
event.currentTarget.parentNode.getElementsByClassName("saveIssue")[0].classList.remove("d-none");
}
function saveIssue(event)
{
    let id=event.currentTarget.id;
    let description=event.currentTarget.parentNode.parentNode.cells[1].childNodes[0].value;
    $.ajax({
        'url':'/api/impedimentLog/updateItem/',
        'method': 'PUT',
        data:{description,id}
    })
    .done(function(response){
        if(response=='updated')
        {
            location.reload();
        }
        else
        {
            location.assign(response);
        }
    });
}