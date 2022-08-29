const setupPassport = require('./passport');
const setupExpressSession = require('./express-session');
const setupMorgan = require('./morgan');
const setupHelmet = require('./helmet');

const boot = (app) => {
	// because passport uses express session we have to setup express session before we configure passport
	setupExpressSession(app);
	setupPassport(app);
	
	setupMorgan(app);
	setupHelmet(app);
}

module.exports = boot;