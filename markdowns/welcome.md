# How to scrape HackerNews with NickJS, the next gen scraping library

Hello and welcome to this very first **NickJS** tutorial!

**Headless Web browsers** are amazingly powerful but yet complicated to use.
NickJS is the easiest wrapper on **Headless Chrome** and **PhantomJS**.
It gives you access to all the features you need with less than 15 methods.

Let's take a look at a simple use case.

If you want to scrape a web page, you'll always need to repeat the same three steps.
* Do actions that will get you closer to the data. There are only four possible choices: open a page, fill a form, simulate user input (mouse/keyboard event) and trigger a DOM event.
* Wait for the actions to have an effect. There are only two possible things we can do: wait for specific DOM elements to appear or disappear.
* Extract data from the page. Running a few lines of jQuery directly inside the DOM works every time.

The scraping **"Hello World"** is a scraper for **Hacker News**. To do so, we'll apply the same three steps seen below.
* Accessing the web page using its URL
* Waiting for the data to be loaded
* Get the data using jQuery

This example will take us **less than 5 minutes**. You only need to be familiar with **JavaScript ES2016+**.

# 0- The NickJS context

All we need is an instance of NickJS and to create a new tab. The promise pattern will automatically handle all the potential errors.

```javascript

// To be sure that all the code will be ES2016+
import 'babel-polyfill'

// Import the library
import Nick from "nickjs"

// Instantiate the web browser
const nick = new Nick()

// Create a new tab to browse the web
nick.newTab(async (tab) => { 
	//
	// Now we have our tab available we'll be able to load URLs
	//
})
.then(() => {
	// When everything is sucessfully done we exit with the usual code '0'
	nick.exit(0)
})
.catch((err) => {
	// When there is an error we quit with code '1' or whatever number that makes sens.
	console.log(err)
	nick.exit(1)
})
```

# 1- Accessing news.ycombinator.com

We first need to load the web page using:

```javascript
nick.newTab(async (tab) => {
	// We'll load the URL using open
	await tab.open("news.ycombinator.com")
	// Careful! Here, we're not sure the page is fully loaded!
})
```

# 2- Waiting for the wanted data to appear

To be sure the DOM element – containing the data we need – is loaded, we'll ask our Web browser to wait until it's added.

```javascript
nick.newTab(async (tab) => {
	await tab.open("news.ycombinator.com")
	await tab.waitUntilVisible("#hnmain")
	//
	// The element we need, matching "#hnmain", is loaded.
	//
})
```

# 3- Inject client side libraries:

The Web page is not ready to be scraped yet. We'll use jQuery to manipulate the DOM and extract an array of data. Hacker News doesn't provide this library; no worries, we'll insert it ourselves using the `inject()` method.

```javascript
nick.newTab(async (tab) => {
	await tab.open("news.ycombinator.com")
	await tab.waitUntilVisible("#hnmain")

	// Inject also works with a CDN's URL.
	await tab.inject("https://code.jquery.com/jquery-3.2.1.slim.min.js")
	// jQuery is accessible in the web page context. So $("*") doesn't work here! For more informations take a look to the next section.
})
```

# 4- Returning the data:

Now, the best part! The scraping of the title and URL of each article and return an Array of Objects. The `evaluate()` method allows us to execute a function in the web page context. All the client-side libraries are available. There are two contexts:
* The web browser (Nick).
* The web page itself, accessible using the `evaluate()` method.
Check out the example.

```javascript
nick.newTab(async (tab) => {
	await tab.open("news.ycombinator.com")
	await tab.waitUntilVisible("#hnmain")
	await tab.inject("https://code.jquery.com/jquery-3.2.1.slim.min.js")

	// The content of data will be copied to the hackerNewsLinks const variable.
	const hackerNewsLinks = await tab.evaluate((arg, callback) => {
		// Here we're in the page context. It's like being in the web browser's inspector tool
		const data = []
		$(".athing").each((index, element) => {
			data.push({
				title: $(element).find(".storylink").text(),
				url: $(element).find(".storylink").attr("href")
			})
		})
		// The callback() function must be called when the scraping algorithm is done.
		callback(null, data) // \o/
	})
})
```

# 5- Print the result:

We are all set. We'll `console.log()` our result.
Here is a complete recap'.

```javascript
import 'babel-polyfill'
import Nick from "nickjs"

const nick = new Nick()

nick.newTab(async (tab) => {
	await tab.open("news.ycombinator.com")
	await tab.waitUntilVisible("#hnmain")
	await tab.inject("https://code.jquery.com/jquery-3.2.1.slim.min.js")

	const hackerNewsLinks = await tab.evaluate((arg, callback) => {
		const data = []
		$(".athing").each((index, element) => {
			data.push({
				title: $(element).find(".storylink").text(),
				url: $(element).find(".storylink").attr("href")
			})
		})
		callback(null, data)
	})
	console.log(JSON.stringify(hackerNewsLinks, null, 2))
})
.then(() => {
	nick.exit(0)
})
.catch((err) => {
	console.log(err)
	nick.exit(1)
})
```

Here we are. We successfully scraped Hacker News in less than two minutes using only 5 methods.
You can now try it by yourself and create more (careful, on Tech.io the script is limited to 30 seconds of execution)

# Run NickJS

@[Test NickJS]({ "stubs": ["src/nick.js"], "command": "./build-launch.sh" })

# Do you want to know more?

- You can clone the repo on <https://github.com/phantombuster/nickjs>.
- The full documentation is available [here](https://github.com/phantombuster/nickjs/blob/master/README.md).
- Any questions? Feel free to ask on <NickJS.org>.
