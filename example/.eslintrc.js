const { Neutrino } = require('neutrino')

const rules = Neutrino()
	.use('.neutrinorc.js')
	.call('eslintrc')

module.exports = rules
