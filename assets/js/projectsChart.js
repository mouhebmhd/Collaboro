new Chart("myChart1", {
  type: 'polarArea',
  data: {
    labels: ["En Cours", "En attente", "Terminées"],
    datasets: [
      {
        label: "Status des projets",
        backgroundColor: ["#494EB0","#F93939","#F80"],
        data: [12,10,24]
      }
    ]
  },
  options: {
    responsive:true,
    maintainAspectRatio: false
  }
});