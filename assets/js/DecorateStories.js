window.addEventListener("load",function()
{
var cards=document.getElementsByClassName("userStoryCard");
var header=document.getElementsByClassName("userStoryHeader");
var randomColors=["#3F3E91","#00A7AA","#00C899","#C75450","#A69BFF"];
for(var i=0;i<cards.length;i++)
{
    var index=Math.floor(Math.random() *randomColors.length);
    cards[i].style.borderLeft="2px solid "+randomColors[index];
}
});

