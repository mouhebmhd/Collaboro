let natural=require('natural');
let stopWordsRemover=require('remove-stopwords');
let wink=require('wink-lemmatizer');
const axios = require('axios');
const { default: similarity } = require('wink-nlp/utilities/similarity');
let model={};
//this function a used to lowercase a sentence .It accepts a string as input and return a string as output also
model.toLowerCase=function(sentence)
{
return sentence.toLowerCase();
}
//this function is used to tokenize a sentence .It accepts  string as input and returns a vector
model.tokenization=function(sentence)
{
let tokenizer=new natural.WordTokenizer();
return tokenizer.tokenize(sentence);
}
//this function is used to remove stop words from a sentence .It accepts a vector  and returns a string
model.stopWordsRemover=function(sentenceVector)
{

return stopWordsRemover.removeStopwords(sentenceVector);
}
//this function is used to stem a word.For example,when the word doing is stemmed,it will replaced by do 
model.stemming=function(word)
{
   return natural.PorterStemmer.stem(word);
}
//this function is used to plurize a noun
model.plurizeNoun=function(word)
{
let nounInflector=new natural.NounInflector();
return nounInflector.pluralize(word);
}
//this function is used to singularize a noun
model.singularizeNoun=function(word)
{
let nounInflector=new natural.NounInflector();
return nounInflector.singularize(word);
}
//this function is used to plurize a verb
model.plurizeVerb=function(word)
{
let verbInflector=new natural.PresentVerbInflector();
return verbInflector.pluralize(word);
}
//this function is used to singularize a verb
model.singularizeVerb=function(word)
{
let verbInflector=new natural.PresentVerbInflector();
return verbInflector.singularize(word);
}
//this function is used to to lemmatiza a word .Example better will be replaced by good
model.lemmatize=function(word)
{
if(wink.adjective(word)!=word)
{
    return wink.adjective(word);
}
else if(wink.noun(word)!=word)
{
    return wink.noun(word);
}
else
{
    return wink.verb(word);
}
return wink.noun(word)
}
function getSynonyms(word)
{
word=word.replace(':','');
word=model.toLowerCase(word);
word=model.lemmatize(word);
let stemmedWord =model.stemming(word);
let synonymsVector=[];
	let synonyms=require('../../assets/js/synonyms');
	for(var i=0;i<synonyms.length;i++)
	{
        synonyms[i].lemma=synonyms[i].lemma.toLowerCase();
		if((synonyms[i].lemma).indexOf(word)>=0)
		{
		
		synonymsVector.push(synonyms[i].synonyms);
				
			
		}
	}
	return(synonymsVector);
}
model.getSynonyms=function(word)
{
return getSynonyms(word);
}
model.cosineSimilarity=function(vector1,vector2)
{
    let product=0;
    let euclideanNorme1=00,euclideanNorme2=00;
    if(vector1.length>vector2.length)
    {
        while(vector2.length<vector1.length)
        {
            vector2.push(0);
        }
    }
    if(vector2.length>vector1.length)
    {
        while(vector1.length<vector2.length)
        {
            vector1.push(0);
        }
    }
    for(var i=0;i<vector1.length;i++)
    {
        product+=vector1[i]*vector2[i];
        euclideanNorme1+=vector1[i]*vector1[i];
        euclideanNorme2+=vector2[i]*vector2[i];
    }
    euclideanNorme1=Math.sqrt(euclideanNorme1); 
    euclideanNorme2=Math.sqrt(euclideanNorme2); 
    return (product/(euclideanNorme1*euclideanNorme2));

}
model.termFrequency=function(vector,word)
{
    return ((vector.filter(element=>element==word).length)/vector.length);
}
model.isSimilarTo= function(word1,word2)
{
	word1=model.lemmatize(word1);
	word1=model.stemming(word1);
	word2=model.lemmatize(word2);
	word2=model.stemming(word2);
	/*let synos=getSynonyms(word1);
		let exist;
		exist=synos.filter(element=>element.indexOf(word2)>=0);*/
		return(word2==word1);
    
}
model.measureSimilarity=function(storyVector,dictionary){
    let similarityVector=[];
    var counter;
    for(var i=0;i<dictionary.length;i++)
    {
         counter=0;
        for(var j=0;j<storyVector.length;j++)
        {
            axios.get('http://localhost:8080/similarities/isSimilarTo/'+dictionary[i]+'/'+storyVector[j])
            .then(function(response){
                if(response==true)
                {
                    return response;
                }
            })
            .catch(error=>{
                similarityVector.push(false)
            });
        }
        similarityVector.push(counter/storyVector.length);
    }
    return similarityVector;
}
model.calculateOwnVector=function(vector)
{
    let ownVector=[];
    var temp;
    for(var i=0;i<vector.length;i++)
    {
         temp=0;
        for(var counter=0;counter<vector.length;counter++)
        {
            if(vector[i]==vector[counter])
            {
                temp++;
            }
        }
        ownVector.push(temp);
    }
    return ownVector;
}
model.convertToBinary=function(digit)
{
let result='';
while(digit!=0)
{
    result=((digit%2).toString())+result;
    digit=Math.floor(digit/2);
}
return result;
}
model.hammingDistance=function(vector1,vector2)
{
let result=0;
if(vector1.length<vector2.length)
{
    while(vector1.length<vector2.length)
    {
        vector1='0'+vector1;
    }
}
if(vector1.length>vector2.length)
{
    while(vector1.length>vector2.length)
    {
        vector2='0'+vector2;
    }
}
for(var i=0;i<vector1.length;i++)
{
    if((vector1[i]!=vector2[i]))
    {
    result++;
    }
}
return (result);
}
function compare( a, b ) {
    if ( a.similarity> b.similarity){
      return -1;
    }
    else if ( a.similarity > b.similarity ){
      return 1;
    }
    return 0;
  }
function compare1( b, a ) {
    if ( a.similarity> b.similarity){
      return -1;
    }
    else if ( a.similarity > b.similarity ){
      return 1;
    }
    return 0;
}
model.predictWithDecisionTreeKNN=function(objet,k)
{
let objectToPredict=objet.objectToPredict;
let dataset=objet.dataset;
if(objectToPredict.teamStatus=='local')
{
    objectToPredict.teamStatus=1;
}
else
{
    objectToPredict.teamStatus=0;
}
for(var i=0;i<dataset.length;i++)
{
    if(dataset[i].teamStatus==objectToPredict.teamStatus)
    {
        dataset[i].teamStatus=objectToPredict.teamStatus;
    }
    else
    {
        if(objectToPredict.teamStatus==1)
        {
            dataset[i].teamStatus=0;
        }
        else
        {
            dataset[i].teamStatus=1;
        }
    }
}
  dataset=dataset.sort(compare);
  let finalResult=[];
  let binaryRequest=model.convertToBinary((objectToPredict.similarity*10000).toFixed(0)+objectToPredict.teamStatus+objectToPredict.teamStrength);
  for(var i=0;i<dataset.length;i++)
  {
    finalResult.push(model.hammingDistance((model.convertToBinary((dataset[i].similarity*10000).toFixed(0)+dataset[i].teamStatus+dataset[i].teamStrength)),binaryRequest))
  }
  finalResult=finalResult.sort(compare1);
  return(finalResult);
}
module.exports=model;