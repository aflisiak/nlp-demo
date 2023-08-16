import nlp from 'compromise';

export default class TextAnalysis{
	constructor(docs){
		this.docs = docs
		this.mergedDocs = nlp(
			this.docs.map(obj => obj.text).join()
		)
	}

	tf(d, occ){
		// Takes a document and N occurrances of a term
		// Returns the term frequency (tf)
		// tf = (occurrances of search term/N terms)
		return (occ/nlp(d.text).terms().out('array').length)
	}

	idf(t){
		// Takes a term
		// Returns the inverse document frequency (idf)
		// idf = log_e(N documents/N documents containing
		// the search term)

		var nDocs = this.docs.length
		var nMatches = this.docs.filter(
			doc=>{
				var matched = doc.text.match(t)
				if(matched){
					return true}
				else{
					return false}
				}
		).length

		var result = nDocs / nMatches
		if (!isFinite(result)){
			return 0
		}else{
		return Math.log(result)
		}
	}

	tfIdf(doc){
		// Takes a document from this.docs
		// Returns a sorted array of objects in the form:
		// {term:<String>, weight:<Float>}
		// This is a vector of terms and Tf-Idf weights



		var tfIdfVector = nlp(doc.text).terms().out('freq').map((d)=>{
			var t = d['normal']


			var tf = this.tf(doc, d['count'])

			var idf = this.idf(t)

			return {term: t, weight:tf*idf}
			}
		)

		var sortedTfIdfVector = tfIdfVector.sort((obj0, obj1)=>{
			var w0 = obj0.weight
			var w1 = obj1.weight
			if (w0 < w1){
				return 1
			}
			if (w0 > w1){
				return -1
			}
			return 0
		})

		return sortedTfIdfVector

	}

	randomTfIdf(){
		// see: https://stackoverflow.com/questions/4550505/
		// /getting-a-random-value-from-a-javascript-array
		var rand = this.docs[Math.floor(Math.random() * this.docs.length)];

		return this.tfIdf(rand)
	}

	getDocs(){
		return this.docs
	}

	mergedTokensDoc(opts){
		// TODO: filter opt to only get texts e.g. for a given set of user

		// Pass an opt to the nlp.out method, else 'text'
		try{return this.mergedDocs.out(`${opts.out}`)}catch(error){
			return this.mergedDocs.out('text')
		}
	}



	cardData(opts){
		// Used for AnalysisCard.js
		var rTfIdf = this.randomTfIdf()
		return [
				{
					title: "Term Frequency (Overall)",
					chartData: {labels: this.mergedDocs.terms().out(
						'freq').slice(0, 5).map(
						obj=>{
							return obj.normal
						}),
						series:[this.mergedDocs.terms().out(
						'freq').slice(0, 5).map(
						obj=>{
							return obj.count
						})]},
					chartType: 'Bar',
					chartOpts: {
						chartPadding:{left:50, right:50},
					}
				},
				{
					title: "TF-IDF Top Weights in random Message",
					chartData: {
						labels: rTfIdf.slice(0, 5).map(obj=>{return obj.term}),
						series:[rTfIdf.slice(0, 5).map(obj=>{return obj.weight})],
					},
					chartType: 'Bar',
					chartOpts: {
						chartPadding:{left:50, right:50},
						horizontalBars:true,
						axisX:{showLabel:false,},
					}
				},
				{
					title: "Named Entities",
					chartData: {
						labels: this.mergedDocs.topics(
							).out('freq').slice(0, 5).map(
								data=>{return data.normal}
						),
						series:[this.mergedDocs.topics(
							).out('freq').slice(0, 5).map(
								data=>{return data.count}
						)]},
					chartType: 'Bar',
					chartOpts: {
						chartPadding:{left:50, right:50},
						horizontalBars:true,
						axisX:{onlyInteger:true,},
						height: '200px',
						labelOffset:{x:-45}
					}
				},
				{
					title: "Parts of Speech",
					chartData: {
						labels: ["Noun", "Verb", "Adjective"],
						series:[
						this.mergedDocs.match('#Noun'
							).out('array').length,
						this.mergedDocs.match('#Verb'
								).out('array').length,
						this.mergedDocs.match('#Adjective'
								).out('array').length
						]},
					chartType: 'Pie',
					chartOpts: {
						chartPadding: 30,
						labelOffset: 30,
						labelDirection: 'explode'
					}
				},
				]
	}
}