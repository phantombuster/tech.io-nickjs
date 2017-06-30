# Run NickJS

@[Test NickJS]({ "stubs": ["nick.js"], "command": "ls && npm run build && ./node_modules/casperjs/bin/casperjs lib/test.js" })