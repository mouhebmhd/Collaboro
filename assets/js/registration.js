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
function validateFirstRegistartionForm()
{
    var returnValue=true;
    var name=document.getElementById("name");
    var first_name=document.getElementById("first_name");
    var genderMale=document.getElementById("genderMale");
    var genderFemale=document.getElementById("genderFemale");
    var genderOther=document.getElementById("genderOther");
    var photo=document.getElementById("photo");
    var day=document.getElementById("day");
    var month=document.getElementById("month");
    var year=document.getElementById("year");
    var city=document.getElementById("city");
    var country=document.getElementById("country");
    var postale_code=document.getElementById("postale_code");
//verification que le nom saisie est purement alphabetique et non vide
    if(alphabetique(name.value)===false)
    {
        returnValue=false;
        name.classList.add("is-invalid");
    }
    else
    {
        name.classList.remove("is-invalid");
        name.classList.add("is-valid");
    }
//verification que le prenom saisie est purement alphabetique est non vide
    if(alphabetique(first_name.value)===false)
    {
        returnValue=false;
        first_name.classList.add("is-invalid");
    }
    else
    {
        first_name.classList.remove("is-invalid");
        first_name.classList.add("is-valid");
    }
//verification que l'utilisatuer a selectionner son genre
    if((genderMale.checked===false)&&(genderFemale.checked===false)&&(genderOther.checked===false))
    {
        genderFemale.classList.add("is-invalid");
        genderMale.classList.add("is-invalid");
        genderOther.classList.add("is-invalid");
        returnValue=false;
    }
    else
    {
        genderFemale.classList.remove("is-invalid");
        genderMale.classList.remove("is-invalid");
        genderOther.classList.remove("is-invalid");
        if(genderMale.checked)
        {
            genderMale.classList.add("is-valid");
        }
        else if(genderFemale.checked)
        {
            genderFemale.classList.add("is-valid");
        }
        else
        {
            genderOther.classList.add("is-valid");
        }
    }

    if((entier(day.value)===false)||(parseInt(day.value)>=31)||(parseInt(day.value)<0))
    {
        day.classList.add("is-invalid");
        returnValue=false;
    }
    else
    {
        day.classList.remove("is-invalid");
        day.classList.add("is-valid");
    }
    if((entier(year.value)===false)||((year.value)>="2022"))
    {
        year.classList.add("is-invalid");
        returnValue=false;
    }
    else
    {
       year.classList.remove("is-invalid");
       year.classList.add("is-valid");
    }
    if(((year.value)<"1900"))
    {
        year.classList.add("is-invalid");
        returnValue=false;
    }
    if(month.selectedIndex<="0")
    {
        returnValue=false;
        month.classList.add("is-invalid");
    }
    else
    {
        month.classList.remove("is-invalid");
        month.classList.add("is-valid");
    }
    if(alphabetique(city.value)===false)
    {
        returnValue=false;
        city.classList.add("is-invalid");
    }
    else
    {
        city.classList.remove("is-invalid");
        city.classList.add("is-valid");
    }
    var checkButtons=document.getElementsByClassName("radioChecker");
    var counter=0;
    for(var i=0;i<checkButtons.length;i++)
    {
        if(checkButtons[i].checked===false)
        {
            counter+=1;
        }
    }
    if(counter!=19)
    {
        alert("veuillez selectionner votre photo de profile");
        return false;
    }
    if(alphabetique(country.value)===false)
    {
        returnValue=false;
        country.classList.add("is-invalid");
    }
    else
    {
        country.classList.remove("is-invalid");
        country.classList.add("is-valid");
    }
    if(alphaNumerique(postale_code.value)===false)
    {
        returnValue=false;
        postale_code.classList.add("is-invalid");
    }
    else
    {
       postale_code.classList.remove("is-invalid");
        postale_code.classList.add("is-valid");
    }
return returnValue;
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
    return (returnValue && url!='');
}
function validateRegistrationForm()
{
    var email=document.getElementById("email");
    var password=document.getElementById("password");
    var repassword=document.getElementById("repassword");
    var phone=document.getElementById("phone");
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
    if(password.value.length<8)
    {
        password.classList.add("is-invalid");
        return false;
    }
    else
    {
        password.classList.remove("is-invalid");
        password.classList.add("is-valid");
    }
    if(repassword.value!=password.value)
    {
        repassword.classList.add("is-invalid");
        return false;
    }
    else
    {
        repassword.classList.remove("is-invalid");
        repassword.classList.add("is-valid");
    }
    if((phone.value.length<8)||(entier(phone.value)===false))
    {
        phone.classList.add("is-invalid");
        return false;
    }
    else
    {
        phone.classList.remove("is-invalid");
      phone.classList.add("is-valid");
      return true;
    }
    
}
function identifyPhoto(event)
{
    var checkStatusGroup=document.getElementsByClassName("checkStatus");
    var checkButtons=document.getElementsByClassName("radioChecker");
    for(var i=0;i<checkStatusGroup.length;i++)
    {
        if(checkStatusGroup[i].classList.contains("d-none")===false)
        {
        checkStatusGroup[i].classList.add("d-none");
        checkButtons[i].checked=false;
        }
    }
    event.target.getElementsByClassName("checkStatus")[0].classList.remove("d-none");
    event.target.getElementsByClassName("radioChecker")[0].checked=true;
}
function validerPhoto()
{
    var bg;
    var checkButtons=document.getElementsByClassName("radioChecker");
    var counter=0;
    for(var i=0;i<checkButtons.length;i++)
    {
        if(checkButtons[i].checked===false)
        {
            counter+=1;
        }
        else
        {
        bg=checkButtons[i].value;
        }
    }
    if(counter===19)
    {
    document.getElementsByClassName("photoBackground")[0].style.backgroundImage="url('.."+bg+"')";
    document.getElementsByClassName("photoBackground")[0].style.backgroundColor="transparent";
    var close=document.getElementById("closeButton");
    document.getElementById("camerIcon").style.opacity=0.2;
    close.click();
    }
    else
    {
        return false;
    }
}
function checkProjectForm()
{
    var titre=document.getElementById("titre");
    var description=document.getElementById("description");
     var day=document.getElementById("day");
    var mois=document.getElementById("month");
    var year=document.getElementById("year");
    var budget=document.getElementById("budget");
    var domaine=document.getElementById("domaine");
    var dod=document.getElementById("dod");
    var cahierCharge=document.getElementById("cahierCharge");
    var scrumMaster=document.getElementById("scrumMaster");
    if(titre.value==='')
    {
        titre.classList.add("is-invalid");
        return false;
    }
    else
    {
        titre.classList.remove("is-invalid");
        titre.classList.add("is-valid");
    }
    if(description.value==='')
    {
        description.classList.add("is-invalid");
        return false;
    }
    else
    {
        description.classList.remove("is-invalid");
        description.classList.add("is-valid");
    }
    if((entier(day.value)===false)||(parseInt(day.value)>=31)||(parseInt(day.value)<0))
    {
        day.classList.add("is-invalid");
        return false;
    }
    else
    {
       day.classList.remove("is-invalid");
       day.classList.add("is-valid");
    }
    if(month.selectedIndex<="0")
    {
        month.classList.add("is-invalid");
        return false;
    }
    else
    {
       month.classList.remove("is-invalid");
       month.classList.add("is-valid");
    }
    if((entier(year.value)===false))
    {
        year.classList.add("is-invalid");
        return false;
    }
    else
    {
        year.classList.remove("is-invalid");
        year.classList.add("is-valid");
    }
    if(((year.value)<"1900"))
    {
        year.classList.add("is-invalid");
        return false;
    }
   
    if(isNaN(budget.value)===true)
    {
        budget.classList.add("is-invalid");
        return false;
    }
    else
    {
        budget.classList.remove("is-invalid");
        budget.classList.add("is-valid");
    }
    if(cahierCharge.value==="")
    {
        cahierCharge.classList.add("is-valid");
    }
    else
    {
        if(validateUrl(cahierCharge.value)===false)
        {
            cahierCharge.classList.add("is-invalid");
            return false;
        }
        else
        {
            cahierCharge.classList.remove("is-invalid");
            cahierCharge.classList.add("is-valid");
        }
    }
    if(domaine.selectedIndex===0)
    {
        domaine.classList.add("is-invalid");
        return false;
    }
    else
    {
        domaine.classList.remove("is-invalid");
        domaine.classList.add("is-valid");
    }
    if(dod.value==="")
    {
        dod.classList.add("is-invalid");
        return false
    }
    else
    {
        dod.classList.remove("is-invalid");
        dod.classList.add("is-valid");
    }
    if(scrumMaster.selectedIndex===0)
    {
        scrumMaster.classList.add("is-invalid");
        return false;
    }
    else
    {
        scrumMaster.classList.remove("is-invalid");
        scrumMaster.classList.add("is-valid");
    }

    return true;
}
