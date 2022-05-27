let stories=require('./stories');
let model=require('./model')
let data=[];
let temp=[];
let dictionary=[];
let word;
for(var i=0;i<stories.length;i++)
{ 
temp=[];
let fibo=[3,5,8,13,21,34,55,89,144,233,377,610];
let x=Math.random()*(fibo.length-1);
x=x.toFixed();
let description=model.toLowerCase(stories[i].description);
description=model.tokenization(description);
description=model.stopWordsRemover(description);
for(var c=0;c<description.length;c++)
{    
    word=description[c];
    word=model.lemmatize(word);
   word=model.stemming(word);
   if(dictionary.indexOf(word)==-1)
   {
       dictionary.push(word);
   }
    temp.push(word)
}
let record={description:temp,storyPoints:fibo[x].toString()}
data.push(record);
}
module.exports={dataset:data,dictionary};
