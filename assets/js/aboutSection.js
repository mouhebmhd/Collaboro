function switchView(view1,view2,which)
{
    document.getElementsByClassName(view1)[0].classList.remove("d-none");
    document.getElementsByClassName(view2)[0].classList.add("d-none");
    if(which==1)
    {
        document.getElementsByClassName("btnView2")[0].classList.add("active");
        document.getElementsByClassName("btnView1")[0].classList.remove("active");
    }
    else
    {
        document.getElementsByClassName("btnView1")[0].classList.add("active");
        document.getElementsByClassName("btnView2")[0].classList.remove("active");
    }

}