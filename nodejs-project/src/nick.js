import "babel-polyfill"

import Nick from "nickjs"
const nick = new Nick()

const fs = require("fs")

// Simple scraping function, getting all the infos using jQuery and returning them with the callback "done"
const scrape = (arg, done) => {
	var data = $("div.person > div.panel-body").map(function () {
		return({
			name: $(this).find(".name").text().trim(),
			birth_year: $(this).find(".birth_year").text().trim(),
			death_year: $(this).find(".death_year").text().trim(),
			gender: $(this).find(".gender").text().trim(),
			marital_status: $(this).find(".marital_status").text().trim(),
			spouse: $(this).find(".spouse").text().trim(),
			pclass: $(this).find(".pclass").text().trim(),
			ticket_num: $(this).find(".ticket_num").text().trim(),
			ticket_fare: $(this).find(".ticket_fare").text().trim(),
			residence: $(this).find(".residence").text().trim(),
			job: $(this).find(".job").text().trim(),
			companions_count: $(this).find(".companions_count").text().trim(),
			cabin: $(this).find(".cabin").text().trim(),
			first_embarked_place: $(this).find(".first_embarked_place").text().trim(),
			destination: $(this).find(".destination").text().trim(),
			died_in_titanic: $(this).find(".died_in_titanic").text().trim(),
			body_recovered: $(this).find(".body_recovered").text().trim(),
			rescue_boat_num: $(this).find(".rescue_boat_num").text().trim()
		})
	})
	done(null, $.makeArray(data))
}

nick.newTab().then(async (tab) => {
	// Open the webpage
	await tab.open("http://scraping-challenges.phantombuster.com/onepage")
	// Wait for the data to be visible
	await tab.waitUntilVisible(".panel-body")
	// Inject jQuery to manipulate the page easily
	console.log('Injecting jQuery...')
	await tab.inject('jquery.js')
	// Launch the scrape function in the page context
	console.log("Début du scraping")
	const result = await tab.evaluate(scrape)
	console.log("Fin du scraping")
	// Take a screenshot of the whole page
	await tab.screenshot("screenshot.jpg")
	// Send the data in the result object
	fs.writeFileSync(JSON.stringify(result, null, 2))
	// console.log(JSON.stringify(result, null, 2))
})
.then(() => {
	nick.exit(0)
})
.catch((err) => {
	console.log(`Something went wrong: ${err}`)
	nick.exit(1)
})
