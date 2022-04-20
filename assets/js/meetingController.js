function videoOnOff()
{

}
function audioOnOff()
{

}
function endCall()
{
    window.close()
}
function micOnOff()
{

}
function fullScreenOnOff()
{
    
}
function createNewMeeting()
{
    document.getElementsByClassName("addMeetingContainer")[0].classList.remove("d-none");
}
document.getElementsByClassName("meetingTypeSelect")[0].addEventListener("change",function(event){
    if(document.getElementsByClassName("meetingTypeSelect")[0].selectedIndex==2)
    {
        document.getElementsByClassName("meetingProject")[0].classList.remove("d-none");
        document.getElementsByClassName("projectSelect")[0].classList.remove("d-none");
    }
    else
    {
        document.getElementsByClassName("meetingProject")[0].classList.add("d-none");
        document.getElementsByClassName("projectSelect")[0].classList.add("d-none");
    }
});
function saveNewMeeting()
{
    let returnValue=true;
    let description=document.getElementById("description");
    let date=document.getElementById("date");
    let time=document.getElementById("time");
    let type=document.getElementsByClassName("meetingTypeSelect")[0];
    let project=document.getElementsByClassName("projectSelect")[0];
    if(description.value=='')
    {
        description.classList.add("is-invalid");
        returnValue=false;
    }
    else
    {
        description.classList.remove("is-invalid");
        description.classList.add("is-valid");
    }
    if(date.value=='')
    {
        date.classList.add("is-invalid");
        returnValue=false;
    }
    else
    {
        date.classList.remove("is-invalid");
        date.classList.add("is-valid");
    }
    if(time.value=='')
    {
        time.classList.add("is-invalid");
        returnValue=false;
    }
    else
    {
        time.classList.remove("is-invalid");
        time.classList.add("is-valid");
    }
    if(type.selectedIndex==0)
    {
        type.classList.add("is-invalid");
        returnValue=false;
    }
    else
    {
        type.classList.remove("is-invalid");
        type.classList.add("is-valid");
    }
    if(type.selectedIndex==2)
    {
        if(project.selectedIndex==0)
        {
            returnValue=false;
            project.classList.add("is-invalid");
        }
        else
        {
            project.classList.remove("is-invalid");
            project.classList.add("is-valid");
        }
    }
    if(returnValue)
    {
        let data;
        if(type.selectedIndex==2)
        {
            data={description:description.value,date:date.value,time:time.value,type:type.value,project:project.value};
        }
        else
        {
            data={description:description.value,date:date.value,time:time.value,type:type.value,project:''};
        }
        $.ajax({
            'url':'/api/meetings/addOne/',
            'method':'post',
            data:data
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
        })
    }
}
function removeMeeting(event)
{
    let id=event.currentTarget.id;
    $.ajax({
        'url':'/api/meetings/removeMeeting/'+$.param({id}),
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
    });
}
function terminateMeeting(event)
{
    let id=event.currentTarget.id;
    $.ajax({
        'url':'/api/meetings/terminateMeeting/'+$.param({id}),
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
let meetTitle;
let meetTime;

function toggleModal(desc,time)
{
    $('#reg-modal').modal('show');
    meetTime=time;
    meetTitle=desc;
}
function inviteToMeeting(event)
{
   let id=(event.currentTarget.id);
   event.currentTarget.childNodes[1].classList.replace("bi-person-plus","bi-person-check");
   event.currentTarget.childNodes[0].textContent="invitation envoyée ";
    $.ajax({
        'url':'/api/meetings/sendInvitation/',
        'method':'post',
        data:{meetTitle,meetTime,id}
    })
    .done(function(response){
        if(response!="sent")
        {
            location.assign(response);
        }
    })

}