const { createClient } = require('redis');
const session = require('express-session');
const redisStore = require('connect-redis')(session);

function setupExpressSession(app) {
	const redisClient = createClient({ legacyMode: true });
	redisClient.connect().catch(console.error);

	app.set('trust proxy', 1);
	app.use(session({
		store: new redisStore({ client: redisClient }),
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	}));
};

module.exports = setupExpressSession;