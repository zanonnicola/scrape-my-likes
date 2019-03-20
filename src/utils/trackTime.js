const convertHrtime = require('convert-hrtime')

module.exports = function trackTime(start) {
	return _ => convertHrtime(process.hrtime(start)).seconds
}
