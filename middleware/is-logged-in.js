class IsLoggedIn {
	static handler(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		else {
			res.status(401);
			res.json({
				status: 'error',
				message: 'Unauthorized access',
			});
			return;
		}
	}
}

module.exports = IsLoggedIn;