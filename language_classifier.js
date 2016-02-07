"use strict";
var fs = require('fs');
var Q = require('q');

class LanguageClassifier {
	
	constructor() {
		const Classifier = require('classifier');		
		this.clf = new Classifier.Bayesian();
		this.languages = ["english", "french", "italian"]
	}

	/* uses trainLanguage to train each single supported language */
	trainLanguages() {
		let self=this;
		return Q.all(this.languages.map((language)=>{
			return self.trainLanguage(language);
		}));
	}

	/* Laods the txt and splits it in phrases, one each line.
	 * Each phrase il will be used to train the language label
	 */
	trainLanguage(language) {
		let self = this;
		let deferred = Q.defer();
		let path = `training_data/${language}.txt`;
		fs.readFile(path,(err,data)=>{
			var phrases = data.toString().split("\n");
			phrases.forEach((phrase)=>{
				self.clf.train(phrase,language);
			});	
			console.log(phrases.length + " phrases in "+language);
			deferred.resolve()
		});
		return deferred.promise;
	}

	/* returnes the result as label */
	classify(phrase) {
		return this.clf.classify(phrase)
	}
}


let clf = new LanguageClassifier();
clf.trainLanguages().then(()=>{
	let phrase = "Ciao, Où peut-on obtenir des billets?";
	let label = clf.classify(phrase);
	console.log(`${phrase} --> ${label}`);
})
.catch((error)=>{
	console.log(error);
});