
function afficher()
{
    var curr = 0;
    var elem = document.getElementById('brandMessage');
    var text=elem.textContent;
    elem.textContent="";
var Write = function write(){
    elem.textContent = elem.textContent + text.charAt(curr);
    curr++;
    if (curr < text.length)
        window.setTimeout(write, 75);
    if(curr===text.length)
    {
    document.getElementById("loginButtonLs").classList.remove("d-none");
    document.getElementById("registerButtonLs").classList.remove("d-none");
    }
};
Write();

}
window.addEventListener("load",afficher);