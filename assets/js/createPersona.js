document.getElementsByClassName("previousAvatar")[0].addEventListener("click",function(event){
    let bg=(event.currentTarget.parentNode.parentNode.getElementsByClassName("avatarContainer")[0].style.backgroundImage);
    var index=parseInt(bg.substr(bg.indexOf('jpg')-2,1));
    if(index==0)
    {
        index=9;
    }
    else
    {
        index-=1;
    }
    
    let newVar="url('/assets/uploads/personas/personas"+index+".jpg')";
    event.currentTarget.parentNode.parentNode.getElementsByClassName("avatarContainer")[0].style.backgroundImage=newVar;
});
document.getElementsByClassName("nextAvatar")[0].addEventListener("click",function(event){
    let bg=(event.currentTarget.parentNode.parentNode.getElementsByClassName("avatarContainer")[0].style.backgroundImage);
    var index=parseInt(bg.substr(bg.indexOf('jpg')-2,1));
    if(index==9)
    {
        index=0;
    }
    else
    {
        index+=1;
    }
    
    let newVar="url('/assets/uploads/personas/personas"+index+".jpg')";
    event.currentTarget.parentNode.parentNode.getElementsByClassName("avatarContainer")[0].style.backgroundImage=newVar;
});

function validateForm(event)
{
    let nom=document.getElementById("nom").value || "Nom Provisoire";
    let age=document.getElementById("age").value||0;
    let profession=document.getElementById("profession").value || 'Non Indiqué';
    let adresse=document.getElementById("adresse").value || 'Non Indiqué';

    let genre=document.getElementById("genderMale");
    let genre1=document.getElementById("genderFemale");
    if(genre.checked)
    {
        genre="Homme";
    }
    else if(genre1.checked)
    {
        genre="Femme";
    }
    else
    {
        genre="Autre";
    }
    let status;
    let s1=document.getElementById("single").checked;
    let s2=document.getElementById("married").checked;
    let s3=document.getElementById("divorced").checked;
    let s4=document.getElementById("widow").checked;
    if(s1){status="Célibataire";}
    else if(s2){status="Marié(e)";}
    else if(s3){status="Divorcé(e)";}
    else {status="Veuf(ve)";}
    let objectifs=document.getElementById("objectifs").value || 'Non Indiqué';
    let environment=document.getElementById("environment").value || 'Non Indiqué';
    let description=document.getElementById("description").value || 'Non Indiqué';
    let photo=document.getElementsByClassName("avatarContainer")[0].style.backgroundImage;
    photo=photo.substr(photo.indexOf("/assets"),photo.indexOf(".jpg")-1);    
    let id=event.currentTarget.id;
    let data={nom,age,profession,adresse,genre,status,objectifs,environment,description,photo,id};
    $.ajax({
        'url':'/api/persona/createNewPersona',
        'method':'post',
        data:data
    }).done(function(response){
        location.assign(response);
    });
}


function updateForm(event)
{
    let nom=document.getElementById("nom").value || "Nom Provisoire";
    let age=document.getElementById("age").value||0;
    let profession=document.getElementById("profession").value || 'Non Indiqué';
    let adresse=document.getElementById("adresse").value || 'Non Indiqué';

    let genre=document.getElementById("genderMale");
    let genre1=document.getElementById("genderFemale");
    if(genre.checked)
    {
        genre="Homme";
    }
    else if(genre1.checked)
    {
        genre="Femme";
    }
    else
    {
        genre="Autre";
    }
    let status;
    let s1=document.getElementById("single").checked;
    let s2=document.getElementById("married").checked;
    let s3=document.getElementById("divorced").checked;
    let s4=document.getElementById("widow").checked;
    if(s1){status="Célibataire";}
    else if(s2){status="Marié(e)";}
    else if(s3){status="Divorcé(e)";}
    else {status="Veuf(ve)";}
    let objectifs=document.getElementById("objectifs").value || 'Non Indiqué';
    let environment=document.getElementById("environment").value || 'Non Indiqué';
    let description=document.getElementById("description").value || 'Non Indiqué';
    let photo=document.getElementsByClassName("avatarContainer")[0].style.backgroundImage;
    photo=photo.substr(photo.indexOf("/assets"),photo.indexOf(".jpg")-1);    
    let id=event.currentTarget.id;
    let data={nom,age,profession,adresse,genre,status,objectifs,environment,description,photo,id};
    $.ajax({
        'url':'/api/persona/updatePersona/',
        'method':'put',
        data:data
    }).done(function(response){
        if(response=="updated")
        {
            location.assign("/projets");
        }
        else
        {
            location.assign(response);
        }
    });
}

var btn=document.getElementsByClassName("deletePersona")[0];
btn.addEventListener("click",function(event){
   let id=(event.currentTarget.id);
   $.ajax({
       'url':'/api/perosna/delete/'+$.param({id}),
       'method':'DELETE'
   }).done(function(response)
   {
       if(response=="deleted")
       {
           location.reload();
       }
       else
       {
           location.assign(response);
       }
   })
});