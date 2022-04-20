new Chart("myChart2", {
  type: 'polarArea',
  data: {
    labels: ["En Cours", "En attente", "Terminées"],
    datasets: [
      {
        label: "Status des taches",
        backgroundColor: ["#DE4940","#DEBA14","#1FDE6A"],
        data: [8,3,5]
      }
    ]
  },
  options: {
    responsive:true,
    maintainAspectRatio: false
  }
});