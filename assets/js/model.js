let natural=require('natural');
let stopWordsRemover=require('remove-stopwords');
let wink=require('wink-lemmatizer');
const Reverso = require('reverso-api');
const axios = require('axios');
const reverso = new Reverso();
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
model.getSynonyms=function(word)
{
axios.get('http://localhost:8080/words/getSynonyms/'+word.toString())
.then(function(response){
    return response.data.synonyms;
})
}
model.cosineSimilarity=function(vector1,vector2)
{
if(vector1.length!=vector2.length)
{
    return 0;
}
else
{
    let product=0;
    let euclideanNorme1=00,euclideanNorme2=00;
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
}
model.termFrequency=function(vector,word)
{
    return ((vector.filter(element=>element==word).length)/vector.length);
}
module.exports=model;