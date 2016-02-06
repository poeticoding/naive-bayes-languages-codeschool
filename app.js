var fs = require('fs');
var Q = require('q');
var Classifier = require('classifier');

var clf = new Classifier.Bayesian();

//train using our dataset of phrases in english, italian and french
function trainLanguageWithPath(language,path) {
	var deferred = Q.defer();

	fs.readFile(path,function(err,data){
		var phrases = data.toString().split("\n");
		phrases.forEach(function(phrase){
			clf.train(phrase,language);
		});	
		console.log(phrases.length + " phrases in "+language);
		deferred.resolve()
	});

	return deferred.promise;
}

trainLanguageWithPath("english", "training_data/english.txt")
.then(function(){
	return trainLanguageWithPath("italian", "training_data/italian.txt");
})
.then(function(){
	return trainLanguageWithPath("french", "training_data/french.txt");
})
.catch(function(error){
	console.log(error);
})
.done(function(){
	console.log(clf.classify("bonjour, comment allez-vous?"));
})