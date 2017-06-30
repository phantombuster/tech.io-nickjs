# How to scrape HackerNews

Hello and welcome to the very first tutorial for NickJS.

Today we are going to see how to scrape the famous HackerNews forum in 3 easy steps:
* Accessing the forum
* Getting the data
* Returning the data

## First step:

We first need to access the site thanks to NickJS so we need to load the page and here we start:
```language-javascript
import 'babel-polyfill'   // To be sure that all the code will be ES5

import Nick from "nickjs" // Import our librairy
const nick = new Nick()   // Instantiate your "browser"$$

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

# Run NickJS

@[Test NickJS]({ "stubs": ["src/nick.js"], "command": "./build-launch.sh" })