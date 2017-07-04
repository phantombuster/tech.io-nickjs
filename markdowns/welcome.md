# How to scrape HackerNews

Hello and welcome to the very first tutorial for NickJS.

Today we are going to see how to scrape the famous HackerNews forum in 3 easy steps:
* Accessing the forum
* Getting the data
* Returning the data

This will take less than 2 minutes and you only know how to code in JavaScript (async/await syntax).

# 1- Accessing the forum:

We first need to access the site thanks to NickJS so we need to load the page and here we start:
```javascript
import 'babel-polyfill'   // To be sure that all the code will be ES5

import Nick from "nickjs" // Import our librairy
const nick = new Nick()   // Instantiate your "browser"

nick.newTab(async (tab) => { // Create a new tab to browse the web
	await tab.open("news.ycombinator.com")
	// Now we have our tab and the url targeted by open loading
})
.then(() => {
	nick.exit(0) // When we have finished our actions we quit with code '0'
})
.catch((err) => {
	console.log(err)
	nick.exit(1) // When there is an error we quit with code '1'
})
```

# 2- Getting the data:

Then we need to be sure the data is loaded, to do that nothing more simple:
```javascript
nick.newTab(async (tab) => {
	await tab.open("news.ycombinator.com")
	await tab.waitUntilVisible("#hnmain")
	// Now your page is totally loaded
})
```

And now we can scrape all the data we need with a little script and some jQuery.

```javascript
await tab.inject("https://code.jquery.com/jquery-3.2.1.slim.min.js") // We're going to use jQuery to scrape
const hackerNewsLinks = await tab.evaluate((arg, callback) => {
	// Here we're in the page context. It's like being in your browser's inspector tool
	const data = []
	$(".athing").each((index, element) => {
		data.push({
			title: $(element).find(".storylink").text(),
			url: $(element).find(".storylink").attr("href")
		})
	})
	callback(null, data)
}) // We have all our infos in hackerNewsLinks
```

# 3- Returning the data:

We need to return the data, in a normal case we could save it in a file like a .CSV or .JSON.
Here we are just going to `console.log()` it so we can see what we get:

```javascript
console.log(JSON.stringify(hackerNewsLinks, null, 2)) // Show the formatted data
```

And here we are, we have successfuly scraped Hacker News in less than two minutes and 5 functions.

Now go try it by your own and test other things (carefull the script is limited to 30 seconds execution)


# Run NickJS

@[Test NickJS]({ "stubs": ["src/nick.js"], "command": "./build-launch.sh" })