const IsLoggedIn = require('./is-logged-in');
const DataValidator = require('./data-validator');

const middleware = {
	IsLoggedIn,
	DataValidator,
}

module.exports = middleware;