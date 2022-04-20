function showModal(event)
{
    $('#reg-modal').modal('show');

}
function auto_grow(element) {
    element.style.height = "5px";
    element.style.height =(element.scrollHeight)+"px";
}
function sendNewInMail()
{
    let returnValue=true;
    let destinataire=document.getElementById("destinataire");
    let objet=document.getElementById("objet").value || "vide";
    let msg=document.getElementById("msg").value || "Message vide";
    if(destinataire.selectedIndex==0)
    {
        destinataire.classList.add("is-invalid");
        returnValue=fals;
    }
    else
    {
        destinataire.classList.add("is-valid");
        destinataire.classList.remove("is-invalid");

    }
    if(returnValue)
    {
    let data={destinataire:destinataire.value,objet,msg,date:new Date()};
    $.ajax({
        'url':'/api/messages/sendNewMessage/',
        'method':'post',
        data:data
    })
    .then(function(response){
        if(response=="sent")
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
function showEmail(id,email,objet,contenu,date)
{
    let  months=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'];
    document.getElementsByClassName("showEmailContainer")[0].style.backgroundImage="none";
    document.getElementsByClassName("emailDetails")[0].classList.remove("d-none");
    document.getElementById("email").textContent=email;
    document.getElementById("sujet").textContent=objet;
    document.getElementById("message").textContent=contenu;
    document.getElementById("date").textContent='Envoyé le '+(new Date(date)).getDate()+' '+months[(new Date(date)).getMonth()]+' '+(new Date(date)).getFullYear();
    document.getElementsByClassName("deleteEmail")[0].id=id;
    document.getElementsByClassName("replyEmail")[0].id=email;
    $.ajax({
        'url':'/api/inmails/seenUpdate/'+$.param({id}),
        'method':'put'
    })
    .done(function(response){
        if(response!="updated")
        {
            location.assign(response);
        }
    })

}
function deleteEmail(event)
{
    let id=event.currentTarget.id;
    $.ajax({
        'url':'/api/inmails/deleteForReceiver/'+$.param({id}),
        'method':'put'
    })
    .done(function(response){
        if(response=="deleted")
        {
            location.reload();
        }
        else
        {
            location.assign(response);
        }
    })
}
function deleteEmail1(event)
{
    let id=event.currentTarget.id;
$.ajax({
        'url':'/api/inmails/deleteForSender/'+$.param({id}),
        'method':'put'
    })
    .done(function(response){
        if(response="deleted")
        {
            location.reload();
        }
        else
        {
            location.assign(response);
        }
    })
}
function transferEmail(event)
{
    $('#reg-modal').modal('show');
    let msg=document.getElementById("msg");
    let objet=document.getElementById("objet");
    msg.value=document.getElementById("message").textContent;
    objet.value=document.getElementById("sujet").textContent;
}
function replyEmail(event)
{
    let id=event.currentTarget.id;
    let destinataire=document.getElementById("destinataire");
    let counter=0;
    while((counter<destinataire.length)&&(destinataire[counter].value!=id))
    {
        counter++;
    }
    destinataire[counter].selected=true;
    $('#reg-modal').modal('show');

}