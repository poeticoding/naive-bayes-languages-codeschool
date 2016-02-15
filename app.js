"use strict";

let phrase = process.argv[2];
if(!phrase) {
	console.error("Error, you need to specify a phrase to classify")
	return -1
}

let LanguageClassifier = require('./language_classifier');

let clf = new LanguageClassifier();

clf.trainLanguages().then(()=>{
	let label = clf.classify(phrase);
	console.log(`${phrase} --> ${label}`);

})
.catch((error)=>{
	console.log(error);
});