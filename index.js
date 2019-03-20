const scraper = require('./src/scraper')
const trackTime = require('./src/utils/trackTime')
const Collector = require('./src/collect-likes')

const URL = 'https://twitter.com/ZanonNicola'

async function scrape() {
	const stop = trackTime(process.hrtime())
	await scraper.setup()
	// START
	await scraper.page.setViewport({
		width: 1440,
		height: 900
	})
	await scraper.page.goto(URL, {
		waitUntil: 'networkidle2'
	})
	console.log(`Page title:`, await scraper.page.title())

	const collector = new Collector(scraper)
	const a = await collector.collect()
	console.log(a)

	console.info('Scraped in %ds', stop())

	// END
	await scraper.teardown()
}

scrape()
