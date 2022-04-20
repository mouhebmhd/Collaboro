function alphabetique(chaine)
{   
    var returnValue=true;
    chaine=chaine.toString();
    var alphabet="azertyuiopqsdfghjklwxcvbnmAZERTYUIOPLKJHGFDSQWXCVBNM";
    for (var i=0;i<chaine.length;i++)
    {
        if(alphabet.indexOf(chaine.charAt(i))===-1)
        {
            returnValue=false;
        }
    }
    return ((returnValue)&&(nonVide(chaine)===true));
}
function nonVide(chaine)
{
    chaine=chaine.toString();
    return chaine.length>0;
}
function entier(chaine)
{   
    var returnValue=true;
    chaine=chaine.toString();
    var chiffres="0123456789";
    for (var i=0;i<chaine.length;i++)
    {
        if(chiffres.indexOf(chaine.charAt(i))===-1)
        {
            returnValue=false;
        }
    }
    return ((returnValue)&&(nonVide(chaine)===true));
}
function decimal(chaine)
{   
    var returnValue=true;
    chaine=chaine.toString();
    var chiffres="0123456789,.";
    for (var i=0;i<chaine.length;i++)
    {
        if(chiffres.indexOf(chaine.charAt(i))===-1)
        {
            returnValue=false;
        }
    }
    if(((chaine.indexOf("."))*(chaine.indexOf(",")))>0)
    {
        returnValue=false;
    }
    if((chaine.indexOf("."))!=(chaine.lastIndexOf(".")))   {
        returnValue=false;
    }
    if(((chaine.indexOf(","))!=(chaine.lastIndexOf(","))))    {
        returnValue=false;
    }
    return ((returnValue)&&(nonVide(chaine)===true));
    
}
function identicalPassword(password,repassword)
{
password=password.toString();
repassword=repassword.toString();
return ((password===repassword) &&(nonVide(chaine)===true));
}
function alphaNumerique(chaine)
{   
    var returnValue=true;
    chaine=chaine.toString();
    var alphanum="0123456789azertyuioplkjhgfdsqwxcvbnmAZERTYUIOPLKJHGFDSQWXCVBNM";
    for (var i=0;i<chaine.length;i++)
    {
        if(alphanum.indexOf(chaine.charAt(i))===-1)
        {
            returnValue=false;
        }
    }
    return ((returnValue)&&(nonVide(chaine)===true));
}
function nextPrev(formId)
{
    if(formId==="connect-informations-form")
    {
        if(validateFirstRegistartionForm())
        {
          var  form1=document.getElementById("personal-informations-form");
          var  form2=document.getElementById("connect-informations-form");
          form1.style.display="none";
          form2.style.display="block"
        }
    }
    if(formId==="personal-informations-form")
    {
      
          var  form1=document.getElementById("personal-informations-form");
          var  form2=document.getElementById("connect-informations-form");
          form2.style.display="none";
          form1.style.display="block"
           
    }
}

function alphaNumeriqueSpecialEmail(chaine)
{   
    var returnValue=true;
    chaine=chaine.toString();
    var alphanum="0123456789azertyuioplkjhgfdsqwxcvbnmAZERTYUIOPLKJHGFDSQWXCVBNM_";
    for (var i=0;i<chaine.length;i++)
    {
        if(alphanum.indexOf(chaine.charAt(i))===-1)
        {
            returnValue=false;
        }
    }
    return ((returnValue)&&(nonVide(chaine)===true));
}
function validateEmail(email)
{
    var returnValue=true;
    email=email.toString();
    if((email.indexOf("@")===-1)||(email.indexOf(".")===-1))
    {
        returnValue=false;
    }
    if((email.indexOf("@"))!=(email.lastIndexOf("@")))
    {
        returnValue=false;
    }
    if((email.indexOf("."))!=(email.lastIndexOf(".")))
    {
        returnValue=false;
    }
    if(returnValue===true)
    {
        var username=email.substr(0,email.indexOf("@"));
        var service=email.substr(email.indexOf("@")+1,email.length-email.indexOf(".")+1);
        var domaine=email.substr(email.indexOf(".")+1);
        if((alphaNumeriqueSpecialEmail(username)===false)||(username.length<3))
        {
            returnValue=false;
        }
        if((alphabetique(service)===false)||(service.length<3))
        {
            returnValue=false;
        }
        if((alphabetique(domaine)===false)||((domaine.length<2)||(domaine.length>3)))
        {
            returnValue=false;
        }
        return returnValue;
    }
    else
    {
        return false;
    }
}
function validateUrl(url)
{
    var returnValue=true;
    url=url.toString();
    if((url.indexOf("."))===(url.lastIndexOf(".")))
    {
        returnValue=false;
    }
    return (returnValue);
}


function enableUpdatePersonalInfos()
{
    var editButton=document.getElementById("editPersonalInfosButton").parentNode;
    var saveButton=document.getElementById("savePersonalInfosButton").parentNode;
    var email=document.getElementById("email");
    var emailIcon=document.getElementsByClassName("emailIcon")[0];
    var emailZone=document.getElementById("emailZone");
    document.querySelector(".cameraToggler").classList.remove("d-none");
    var phone=document.getElementById("phone");
    var phoneIcon=document.getElementsByClassName("phoneIcon")[0];
    var phoneZone=document.getElementById("phoneZone");

    var linkedin=document.getElementById("linkedin");
    var linkedinIcon=document.getElementsByClassName("linkedinIcon")[0];
    var linkedinZone=document.getElementById("linkedinZone");
    email.classList.add("d-none")
    emailZone.classList.remove("d-none");
    emailIcon.classList.add("mt-2");
    phone.classList.add("d-none")
    phoneZone.classList.remove("d-none");
    phoneIcon.classList.add("mt-2");
    linkedin.classList.add("d-none")
    linkedinZone.classList.remove("d-none");
    linkedinIcon.classList.add("mt-2");
    editButton.classList.add("d-none");
    saveButton.classList.remove("d-none");
    var nom=document.getElementById("name");
    var nomZone=document.getElementById("nameZone");
    nomZone.value=nom.textContent;
    nom.classList.add("d-none");
    nomZone.classList.remove("d-none");
    
    var prenom=document.getElementById("firstName");
    var prenomZone=document.getElementById("firstNameZone");
    prenomZone.value=prenom.textContent;
    prenom.classList.add("d-none");
    prenomZone.classList.remove("d-none");

    var genre=document.getElementById("genre");
    var group=document.getElementsByClassName("radioGroup")[0];
    var genderMale=document.getElementById("genderMale");
    var genderFemale=document.getElementById("genderFemale");
    var genderOther=document.getElementById("genderOther");        
    group.classList.remove("d-none");
    genre.classList.add("d-none");
    if(genre.textContent==="Homme")
    {
        genderMale.checked=true;
    }
    else if(genre.textContent==="Femme")
    {
        genderFemale.checked=true;
    }
    else
    {
        genderOther.checked=true;
    }

    var dateNais=document.getElementById("dateNaissance");
    var dateNaissance=dateNais.textContent;
    var day=dateNaissance.substr(0,dateNaissance.indexOf("-"));
    var month=dateNaissance.substr(dateNaissance.indexOf("-")+1,dateNaissance.lastIndexOf("-")-dateNaissance.indexOf("-")-1);
    var year=dateNaissance.substr(dateNaissance.lastIndexOf("-")+1);
    var dateContainer=document.getElementsByClassName("dateContainer")[0];
    dateContainer.classList.replace("d-none","d-flex");
    dateNais.classList.add("d-none");
    document.getElementById("day").value=day;
    document.getElementById("year").value=year;
    var val;
    switch(month) 
    {
        case "Mois de naissance":{val=0;break;}
        case "Janvier":{val=1;break;}
        case "Février":{val=2;break;}
        case "Mars":{val=3;break;}
        case "Avril":{val=4;break;}
        case "Mai":{val=5;break;}
        case "Juin":{val=6;break;}
        case "Juillet":{val=7;break;}
        case "Août":{val=8;break;}
        case "Septembre":{val=9;break;}
        case "Octobre":{val=10;break;}
        case "Novembre":{val=11;break;}
        case "Décembre":{val=12;break;}
        default :{val=0;break;}
    }
    document.getElementById("month").selectedIndex=val;
    var adresse=document.getElementById("adresse").textContent;
    var ville=adresse.substr(0,adresse.indexOf("-"));
    var pays=adresse.substr(adresse.indexOf("-")+1,adresse.lastIndexOf("-")-adresse.indexOf("-")-1);
    var code=adresse.substr(adresse.lastIndexOf("-")+1);
    document.getElementById("country").value=pays;
    document.getElementById("city").value=ville;
    document.getElementById("postale_code").value=code;
    document.getElementsByClassName("adresseContainer")[0].classList.replace("d-none","d-flex");
    document.getElementById("adresse").classList.add("d-none");
    saveButton.classList.remove("d-none");
    editButton.classList.add("d-none");
}
function editSchoolInfos()
{
    document.getElementById("editSchoolInfosButton").parentNode.classList.add("d-none");
    document.getElementById("saveSchoolInfosButton").parentNode.classList.remove("d-none");
    var studies=document.getElementsByClassName("study");
    if(studies.length>0)
    {
    for(var c=0;c<studies.length;c++)
    {
        let study=studies[c];
        study.getElementsByClassName("courseCertificate")[0].classList.add("d-none");
        study.getElementsByClassName("courseDescription")[0].classList.add("d-none");
        study.getElementsByClassName("courseInstitut")[0].classList.add("d-none");
        study.getElementsByClassName("courseAnnee")[0].classList.add("d-none");
        study.getElementsByClassName("courseDomaine")[0].classList.add("d-none");

        study.getElementsByClassName("certificat")[0].classList.remove("d-none");
        study.getElementsByClassName("description")[0].classList.remove("d-none");
        study.getElementsByClassName("institut")[0].classList.remove("d-none");
        study.getElementsByClassName("annee")[0].classList.remove("d-none");
        study.getElementsByClassName("domaine")[0].classList.remove("d-none");
    };
    }
    var studyTemplate=document.getElementsByClassName("newStudy")[0].cloneNode(true);
    studyTemplate.classList.remove("d-none");
    document.getElementsByClassName("studies")[0].appendChild(studyTemplate.cloneNode(true));

}

function addNewStudy(event)
{
    studyTemplate=document.getElementsByClassName("newStudy")[0].cloneNode(true);
    studyTemplate.classList.remove("d-none");
    document.getElementsByClassName("studies")[0].appendChild(studyTemplate.cloneNode(true));
}
function editSkills()
{
    document.getElementById("editSkillsButton").parentNode.classList.add("d-none");
    document.getElementById("saveSkillsButton").parentNode.classList.remove("d-none");
    var icon=document.getElementsByClassName("removeIcon");
   for(var i=0;i<icon.length;i++)
   {
       icon[i].classList.remove("d-none");
   }
   document.querySelector(".addPanel").classList.remove("d-none");
}
function validatecontactinfos()
{
var email=document.getElementById("emailZone");
var phone=document.getElementById("phoneZone");
var linkedin=document.getElementById("linkedinZone");
if(validateEmail(email.value)===false)
{
    email.classList.add("is-invalid");
    return false;
}
else
{
    email.classList.remove("is-invalid");
    email.classList.add("is-valid");
}
if((entier(phone.value)===false)||(phone.value.length<8))
{
    phone.classList.add("is-invalid");
    return false;
}
else
{
    phone.classList.remove("is-invalid");
   phone.classList.add("is-valid");
}
if(linkedinZone.value!="")
{
    if((validateUrl(linkedin.value)===false))
    {
        linkedin.classList.add("is-invalid");
        return false;
    }
}
else
{
   linkedin.classList.remove("is-invalid");
   linkedin.value="www.linkedin.com";
   linkedin.classList.add("is-valid");
}
return true;
}

document.getElementById("addSkillButton").addEventListener("click",function(){
    var com=document.getElementById("skill").value;
    if(com.length>0)
    {
        let skillModel=document.getElementById('skillModel').cloneNode(true);
        skillModel.classList.remove("d-none");
        skillModel.getElementsByClassName("descSKill")[0].textContent=com;
        document.getElementById("skills").appendChild(skillModel);
    }
});
var skills=document.getElementsByClassName("removeSkillButton");
for(var i=0;i<skills.length;i++)
{
    skills[i].addEventListener('click',function(){
        this.parentNode.classList.add("d-none");
    });
}
document.getElementById("saveSkillsButton").addEventListener("click",function(){
    var data=[];
    var skills=document.getElementsByClassName("skill");
    var descriptions=document.getElementsByClassName("descSKill");
    for(var i=0;i<skills.length;i++)
    {
        if(skills[i].classList.contains("d-none")===false)
        {
            data[i]=descriptions[i].textContent;
        }
    }
    $.ajax({
        'url':'/api/skills/update/',
        'method':'POST',
        data:{data}
    }).done(function(response){
        location.assign("/EditMyProfile");
    });
});
document.getElementById("savePersonalInfosButton").addEventListener('click',function(){
    var email=document.getElementById("emailZone").value;
    var phone=document.getElementById("phoneZone").value;
    var linkedin=document.getElementById("linkedinZone").value || 'www.linkedin.com';
    var nom=document.getElementById("nameZone").value;
    var prenom=document.getElementById("firstNameZone").value;
    var gender=document.getElementById("gender");
    if(document.getElementById("genderMale").checked)
    {
        gender='Homme';
    }
    else if(document.getElementById("genderFemale").checked)
    {
        gender='Femme';
    }
    else
    {
        gender='Autre';
    }
    var day=document.getElementById("day").value;
    var month=document.getElementById("month").value;
    var year=document.getElementById("year").value;
    var country=document.getElementById("country").value;
    var city=document.getElementById("city").value;
    var postale_code=document.getElementById("postale_code").value;
    var d=document.getElementById("bgPhoto").style.backgroundImage;
    var photo=d.substring(d.indexOf('/assets'),d.indexOf('png')+3);
    var data={email,phone,linkedin,nom,prenom,gender,day,month,year,country,city,postale_code,photo};
    $.ajax({
        'url':'/api/profile/update/',
        'method':'PUT',
        data:{data}
    }).done(function(response){
        location.assign("/EditMyProfile");
    });
});
function saveUpdatedSchoolInfos()
{
   var studies=document.getElementsByClassName("course");
   var cleanData=[];
  for(var i=0;i<studies.length;i++)
  {
      if(studies[i].classList.contains("d-none")==false)
      {
      var certificat=studies[i].getElementsByClassName("certificat")[0].value;
      var description=studies[i].getElementsByClassName("description")[0].value;
      var domaine=studies[i].getElementsByClassName("domaine")[0].value;
      var institut=studies[i].getElementsByClassName("institut")[0].value;
      var annee=studies[i].getElementsByClassName("annee")[0].value;
      if(certificat&&description&&domaine&&institut&&annee)
      {
      cleanData[cleanData.length]={certificat,description,institut,annee,domaine};
      }

      }
  }
 if(cleanData)
 {
    $.ajax({
        'url':'/api/studies/update/',
        'method':'POST',
        data:{cleanData}
    }).done(function(response){
        location.assign("/EditMyProfile");
    });
 }
}