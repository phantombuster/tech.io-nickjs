# Run NickJS

@[Test NickJS]({ "stubs": ["nick.js"], "command": "cat package.json && npm run build && ./node_modules/casperjs/bin/casperjs lib/test.js" })