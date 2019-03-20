const puppeteer = require('puppeteer')

class Scraper {
	async setup() {
		this.browser = await puppeteer.launch({
			headless: false,
			slowMo: 250,
			args: [
				'--no-sandbox',
				'--disable-dev-shm-usage',
				'--disable-setuid-sandbox'
			],
			ignoreHTTPSErrors: true
		})
		process.on('unhandledRejection', (reason, p) => {
			console.error(
				'Unhandled Rejection at: Promise',
				p,
				'reason:',
				reason
			)
			this.browser.close()
		})
		this.page = await this.browser.newPage()
		this.page.setDefaultNavigationTimeout(50000)
		// Makes possible to use console.log inside page.evaluate() callback
		this.page.on('console', msg => {
			for (let i = 0; i < msg.args.length; ++i) {
				console.log(`${i}: ${msg.args[i]}`)
			}
		})
		this.page.on('pageerror', err => {
			console.error('Page error: ' + err.toString())
		})
		this.page.on('error', err => {
			console.error('Error: ' + err.toString())
		})
		// this.page.on('requestfailed', request => {
		// 	console.error(request.url() + ' ' + request.failure().errorText)
		// })
		// await this.page.setRequestInterception(true)
		// this.page.on('request', request => {
		// 	// Do nothing in case of non-navigation requests.
		// 	request.resourceType() === 'image'
		// 		? request.abort()
		// 		: request.continue()
		// })
	}

	async teardown() {
		await this.browser.close()
	}
}

module.exports = new Scraper()
