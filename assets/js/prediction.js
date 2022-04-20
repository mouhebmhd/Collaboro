function fibonacciNumber(position)
{
    if(position<=0)
    {
        return 0;
    }
    else if(position==1)
    {
        return 1;
    }
    else
    {
    let a=0;
    let b=1;
    for(var i=0;i<position;i++)
    {
        c=a+b;
        a=b;
        b=c;
    }
    return c;
    }
}
function itemFrequency(item,doc)
{
    let itemFrequencyResult=0;
    let notEmptyElements=0;
    doc.trim();
    doc=doc.replace('...',' ');
    doc=doc.replace('.',' ');
    doc=doc.replace(',',' ');
    doc=doc.replace('é','e');
    doc=doc.replace('à','a');
    doc=doc.replace('è','e');
    doc=doc.replace('c','ç');
    doc=doc.replace('!',' ');
    doc=doc.replace('-',' ');
    doc=doc.replace('_',' ');
    doc=doc.replace('?',' ');
    doc=doc.replace(';',' ');
    let list=doc.split(' ');
    for(var i=0;i<list.length;i++)
    {
        if(list[i].indexOf(item)!=-1)
        {
            itemFrequencyResult+=1;
        }
        if(list[i]!=' ')
        {
            notEmptyElements+=1;
        }
    }
    
    return itemFrequencyResult/notEmptyElements;
}
function inverseDocumentFrequency(item,docs)
{
    let idf=0;
    for(var i=0;i<docs.length;i++)
    {
        if(itemFrequency(item,docs[i])>0)
        {
            idf+=1;
        }
    }
    return Math.log(idf/docs.length);
}
function splitSentenceiIntoWords(doc)
{
    doc=doc.replace('...',' ');
    doc=doc.replace('.',' ');
    doc=doc.replace('_',' ');
    doc=doc.replace(',',' ');
    doc=doc.replace('!',' ');
    doc=doc.replace('?',' ');
    doc=doc.replace('-',' ');
    doc=doc.replace(';',' ');
    let list=doc.split(' '); 
    let result=[];
    for(var i=0;i<list.length;i++)
    {
        if(list[i]!='')
        {
            result.push(list[i]);
        }
    }
    return result;
}
//Forming the dataset 
//Features are : teamStrength,localOrRemote,tf-idf,declaredissues,declaredRisks,
//Labels are : user story points
function wordCount(doc)
{
let list=splitSentenceiIntoWords(doc);
return list.length;
}
//Forming the dataset 
//Features are : teamStrength,localOrRemote,tf-idf,declaredissues,declaredRisks,
//Labels are : user story points
