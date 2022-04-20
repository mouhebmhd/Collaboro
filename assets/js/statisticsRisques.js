function addNewRisk(event)
{
    let template=document.getElementsByClassName("riskModel")[0];
    template.classList.remove("d-none");
    template.cells[0].textContent =document.getElementsByClassName("rsikItem").length+1;
}
function saveNewRisk(event)
{
    let message = event.currentTarget.parentNode.parentNode.cells[1].childNodes[0].value || 'Description de risque non fournie';
    let id=event.currentTarget.id;
    let date=event.currentTarget.parentNode.parentNode.cells[3].textContent;
    let data={message,id,date};
    $.ajax({
        'url':'/api/riskLog/addItem/',
        'method':'POST',
        data:data
    })
    .done(function(response){
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
function deleteRisk(event)
{
    let id=event.currentTarget.id;
    $.ajax({
        'url':'/api/riskLog/removeItem/'+$.param({id}),
        'method':'delete'
    }
    ).done(function(response){
        if(response=="deleted")
        {
            location.reload();
        }
        else
        {
            location.assign(response);
        }
    });
}
function modifyRisk(event)
{
    event.currentTarget.classList.add("d-none");
    event.currentTarget.parentNode.childNodes[1].classList.remove("d-none");
    event.currentTarget.parentNode.parentNode.cells[1].childNodes[0].classList.remove("d-none");
    event.currentTarget.parentNode.parentNode.cells[1].childNodes[1].classList.add("d-none");

}
function updateRisk(event)
{
    
    let message = event.currentTarget.parentNode.parentNode.cells[1].childNodes[0].value || 'Description de risque non fournie';
    let id=event.currentTarget.id;
    let data={message,id};
    $.ajax({
        'url':'/api/riskLog/updateItem/',
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
