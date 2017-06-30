# Run NickJS

@[Test NickJS]({ "stubs": ["nick.js"], "command": "babel /usr/src/wdir/src -d /usr/src/wdir/lib && /usr/src/wdir/node_modules/casperjs/bin/casperjs /usr/src/wdir/lib/test.js" })