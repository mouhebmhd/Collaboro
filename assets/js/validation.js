function validateLoginForm()
{

    var email=document.getElementById("Email");
    var password=document.getElementById("Password");
    var returnValue=true;

    if(email.value==="") 
    {
        email.classList.add("is-invalid");
        returnValue=false;
    }
    else
    {
        email.classList.add("is-valid");
    }
    if(password.value==="")
    {
        password.classList.add("is-invalid");
       returnValue=false;   
    }
    else
    {
        password.classList.add("is-valid");

    }
    return returnValue;

}
  