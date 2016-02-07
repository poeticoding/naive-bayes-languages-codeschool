"use strict";

let LanguageClassifier = require('./language_classifier');

let clf = new LanguageClassifier();

clf.trainLanguages().then(()=>{

	let phrase = "Hello man, Où peut-on obtenir des billets?";
	let label = clf.classify(phrase);
	console.log(`${phrase} --> ${label}`);

})
.catch((error)=>{
	console.log(error);
});