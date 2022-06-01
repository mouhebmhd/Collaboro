
var yValues=[];
var modelResult=0;
function WordCount(str) {
    return str.split(' ').length;
  }
function estimateStoryPoints()
{
    var description=document.getElementById('usDescription').value;
    var teamStrength=document.getElementById('teamStrength').value;
    var teamStatusRemote=document.getElementById('remote');
    var teamStatusLocal=document.getElementById('local');
    let teamStatus;
    var response;
    if(teamStatusRemote.checked)
    {
         teamStatus='local';
    }
    else
    {
         teamStatus='remote';
    }
    teamStrength=parseInt(teamStrength);
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
        'url':'http://localhost:8080/similarities/getSimilarity/'+description.toString()+'/'+teamStrength.toString()+'/'+teamStatus.toString(),
        'method':'GET',
        
    })
    .done(function(respo){
        document.getElementById('charCount').textContent=description.length;
        document.getElementById('wordCount').textContent=WordCount(description);
        document.getElementById('dataSetSize').textContent=respo.similarities.length;
        response=respo;
        var xValues = [];
        var yValues = [];
        let maxSimilarity=response.similarities[0].similarity;
        let minSimilarity=response.similarities[0].similarity;
        let averageSimilarity=0;
        var yValues1 = [];
        for(var i=0;i<=response.similarities.length;i++)
        {
            xValues.push(i);
        }
        for(var counter=0;counter<respo.similarities.length;counter++)
        {
            if(respo.similarities[counter].similarity>maxSimilarity)
            {
                maxSimilarity=respo.similarities[counter].similarity;
            }
            if (respo.similarities[counter].similarity<minSimilarity)
            {
                minSimilarity=respo.similarities[counter].similarity;
            }
            averageSimilarity+=respo.similarities[counter].similarity;
        }
        document.getElementsByClassName('maxSimilarity')[0].textContent=((maxSimilarity*100).toFixed(2)).toString()+'%';
        document.getElementsByClassName('minSimilarity')[0].textContent=((minSimilarity*100).toFixed(2)).toString()+'%';
        document.getElementById('similarityAverage').textContent=(((averageSimilarity/respo.similarities.length)*100).toFixed(2)).toString()+'%';
        document.getElementsByClassName('result')[0].textContent="Story de classe "+respo.minimumClass;
        for(var i=0;i<response.similarities.length;i++)
        {
            if(response.minimumOnes.indexOf(i)==-1)
            {
                yValues[i]=response.similarities[i].similarity;
            }
            else
            {
                yValues1.push(response.similarities[i].similarity);
            }
        }
                 new Chart("myChart3", {
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
                label:"Les stories les plus proches selon la similarité",
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "#02D1A6",
                    borderColor: "rgba(0,0,255,0.1)",
                    data: yValues1           
                }
            ]
            },
            options: {
            legend: {display: false},
            responsive:true,
            maintainAspectRatio: false,
          
            }
        });
    });
}
