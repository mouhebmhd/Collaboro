function toggleNavbar()
{
        var sidebar=document.getElementById("sidebar");
        var mobile_sidebar=document.getElementById("mobile-sidebar");
        if(sidebar.style.display==="none")
        {
                sidebar.style.display="flex";
                mobile_sidebar.style.display="none";
                setTimeout(() => {
                        sidebar.style.display="none";
                        mobile_sidebar.style.display="flex";
                },4000);
        }
        else
        {
                
                sidebar.style.display="none";
                mobile_sidebar.style.display="flex";
        }
}
