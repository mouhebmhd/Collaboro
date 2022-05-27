var yValues=[];
var modelResult=0;
function estimateStoryPoints()
{
    var description=document.getElementById('usDescription').value;
    while(description.charAt(description.length-1)==' ')
    {
        description=description.substr(0,description.length-2)
    }
    while(description.charAt(0)==' ')
    {
        description=description.substr(1,description.length-1)
    }
    while(description.indexOf('  ')>-1)
    {
        description=description.replace('  ',' ');
    }
    $.ajax({
        'url':'http://localhost:8080/similarities/getSimilarities/'+$.param({description}),
        'method':'GET',
    }).then(function(response){
        modelResult=response.sentenceSimilarity;
        document.getElementById('charCount').textContent=description.length;
        if(description.length==0)
        {
            document.getElementById('wordCount').textContent=0;
        }
        else
        {
            document.getElementById('wordCount').textContent=description.split(' ').length;
        }
        document.getElementById('dataSetSize').textContent=response.similarities.length;
        document.getElementsByClassName('maxSimilarity')[0].textContent=((response.maxSimilarity*100).toString()).substring(0,4)+'%';
        document.getElementsByClassName('minSimilarity')[0].textContent=((response.minSimilarity*100).toString()).substring(0,4)+'%';
        document.getElementById('similarityAverage').textContent=((response.averageSimilarity*100).toString()).substring(0,4)+'%';
        yValues=response.similarities;
        var xValues = [];
        for(var i=1;i<=487;i++)
        {
            xValues.push(i);
        }
        for(var i=0;i<486;i++)
        {
            yValues[i]*=100;
        }
        new Chart("myChart1", {
            type: "scatter",
            data: {
            labels: xValues,
            datasets: [{
            label:"Similarités des points dans le dataset",
                fill: false,
                lineTension: 0,
                backgroundColor: "#4B49AC",
                borderColor: "rgba(0,0,255,0.1)",
                data: yValues
            },
            {
                label:"Similarité de la nouvelle description",
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "#02D1A6",
                    borderColor: "rgba(0,0,255,0.1)",
                    data: [modelResult]            
                }
            ]
            },
            options: {
            legend: {display: false},
            responsive:true,
            maintainAspectRatio: false,
          
            }
        });


    })
}
