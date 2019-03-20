class Collector {
	constructor(scraper, options = {}) {
		this._options = {
			limit: 5,
			// Container for the infinite list of Tweets
			streamId: '#stream-items-id',
			writeTo: 'memory',
			...options
		}
		this._scraper = scraper
		this._likes = new Array()
	}

	get likes() {
		return this._likes
	}

	processTweets(tweets) {
		return tweets.map(node => ({
			id: node.dataset.itemId
		}))
	}

	async scrollWindow() {
		await this._scraper.page.evaluate(() => {
			window.scrollBy(0, document.body.scrollHeight)
		})
	}

	async collect() {
		try {
			let previousHeight
			// while (this._likes.length < this._options.limit) {
			await scrollWindow()
			const tweets = await this._scraper.page.evaluate(() => {
				return Array.from(document.querySelectorAll(`.js-stream-tweet`))
			})
			this._likes.push(...this.processTweets(tweets))
			// 	previousHeight = await this._scrapers.page.evaluate(
			// 		'document.scrollingElement.scrollHeight'
			// 	)
			// 	console.log(previousHeight, tweetstweets)
			// 	await scrollWindow()
			// 	await this._scrapers.page.waitForFunction(
			// 		`document.body.scrollHeight > ${previousHeight}`
			// 	)
			// 	await this._scrapers.page.waitFor(1000)
			// }
		} catch (e) {
			console.error(new Error(e))
		}
		return this._likes
	}
}

module.exports = Collector
