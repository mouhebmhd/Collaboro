
var xValues = [];
for(var i=1;i<31;i++)
{
  xValues.push(i)
}
var yValues = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
new Chart("myChart1", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
    label:"Nombre de tâches terminées par jour ",
      fill: false,
      lineTension: 0,
      backgroundColor: "#0091B3",
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
