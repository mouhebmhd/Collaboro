
var xValues = [];
for(var i=1;i<31;i++)
{
  xValues.push(i)
}
var yValues = [24,18,41,48,35,15,14,25,36,96,68,54,25,35,02,22,21,25,65,34,17,];
new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
    label:"Nombre de tâches restantes par jour ",
      fill: false,
      lineTension: 0,
      backgroundColor: "#4B49AC",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
    legend: {display: true},
    responsive:true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{ticks: {min: 6, max:16}}],
    }
  }
});
