# Run NickJS

@[Test NickJS]({ "stubs": ["nick.js"], "command": "/usr/src/wdir/node_modules/babel-cli/bin/babel.js /usr/src/wdir/src -d /usr/src/wdir/lib && /usr/src/wdir/node_modules/casperjs/bin/casperjs /usr/src/wdir/lib/test.js" })