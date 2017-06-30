import "babel-polyfill"

import Nick from "nickjs"
const nick = new Nick()

// Simple scraping function, getting all the infos using jQuery and returning them with the callback "done"
const scrape = (arg, done) => {
    var persons = document.querySelectorAll(".person")
    var result = []
    for (i in persons) {
        if (i >= 0 && i <= 100) {
        	result.push({
        	    name: persons[i].querySelector(".name.property-value").innerText,
        	    birth_year: persons[i].querySelector(".birth_year.property-value").innerText,
        	    death_year: persons[i].querySelector(".death_year.property-value").innerText,
        	    gender: persons[i].querySelector(".gender.property-value").innerText
        	})
        }
    }
    done(null, result)
}

nick.newTab().then(async (tab) => {
	// Open the webpage
	await tab.open("http://scraping-challenges.phantombuster.com/onepage")
	// Wait for the data to be visible
	await tab.waitUntilVisible(".person")
	// Launch the scrape function in the page context
	const result = await tab.evaluate(scrape)
	// Take a screenshot of the whole page
	await tab.screenshot("screenshot.jpg")
	// Send the data in the result object
	console.log(JSON.stringify(result, null, 2))
})
.then(() => {
	nick.exit(0)
})
.catch((err) => {
	console.log(`Something went wrong: ${err}`)
	nick.exit(1)
})
