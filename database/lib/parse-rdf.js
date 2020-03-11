'use strict';
const cheerio = require('cheerio');

module.exports = rdf => {
	const $ = cheerio.load(rdf);

	const book = {};

	book.id = +$('pgterms\\:ebook').attr('rdf:about').replace('ebooks/','');
	book.title = $('dcterms\\:title').text();
	book.authors = $('pgterms\\:agent pgterms\\:name').toArray()
	.map(elem => $(elem).text());
	book.subjects = $('[rdf\\:resource$="/LCSH"]')
	.parent().find('rdf\\:value')
	.toArray().map(elem => $(elem).text());

	//Extracting Classification Codes
	book.lcc = $('[rdf\\:resource$="/LCC"]')
	.parent().find('rdf\\:value').text();

	//Extracting Sources
	book.sources = $('dcterms\\:hasFormat').toArray().map(e => {
		var object = {
		"source": $(e).find('pgterms\\:file').attr('rdf:about'),
		"format": $(e).find('rdf\\:value').text()
		}
		return object;
	});


	return book;
};
