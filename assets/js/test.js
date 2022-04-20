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
