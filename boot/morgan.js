const morgan = require('morgan');

function setupMorgan(app) {
	app.use(morgan('common'));
}

module.exports = setupMorgan;