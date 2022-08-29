class Logout {
	static async handler(req, res) {
		req.logout((err) => {
			if (err) {
				console.log(err);
				res.status(500);
				res.json({
					status: 'error',
					message: err,
				});
				return;
			}

			res.json({
				status: 'success',
			});
		});
	}
}

module.exports = Logout;