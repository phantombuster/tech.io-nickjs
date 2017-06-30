import 'babel-polyfill'
import Nick from 'nickjs'
import Promise from 'bluebird'

const nick = new Nick()

nick.newTab().then(async function(tab) {
	await tab.open('nickjs.org')
	// ...
	// Continue here
	// ...
})
.then(() => nick.exit())
.catch((err) => {
	console.log('Oops, an error occurred: ' + err)
	nick.exit(1)
})