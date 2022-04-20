var d=new Date().getMonth();
let months=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre','Octobre','Novembre','Décembre'];
let d1,d2,d3,d4;
var yValues=[];
d1=d-1;
d2=d-2;
d3=d-3;
d4=d-4;
if(d1<0)
{
    d1+=12;
}
if(d2<0)
{
    d2+=12;
}
if(d3<0)
{
    d3+=12;
}
if(d4<0)
{
    d4+=12;
}
var xValues = [months[d4],months[d3],months[d2],months[d1],months[d]];
let id=document.getElementsByClassName('userID')[0].id;
$.ajax({
  'url':'http://localhost:8080/user/projects/'+id,
  'method':'get'
})
.done(function(data){
  for(var i=0;i<xValues.length;i++)
  {
    let counter=0;
    for(var j=0;j<data.length;j++)
    {
     if(data[j].dateDebut.indexOf(xValues[i])>=0)
      {
        counter++;
      }
    }
    yValues.push(counter);
  }
  new Chart("myChart", {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
      label:"Nombre de projets",
        fill: false,
        lineTension: 0,
        backgroundColor: "#4B49AC",
        borderColor: "rgba(0,0,255,0.1)",
        data: yValues
      }]
    },
    options: {
      legend: {display: false},
      responsive:true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{ticks: {min: 6, max:16}}],
      }
    }
  });
  
});

