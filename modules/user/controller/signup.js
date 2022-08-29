const passport = require('passport');
const Joi = require('joi');

class Signup {
	static get bodySchema() {
		return Joi.object({
			username: Joi.string(),
			password: Joi.string(),
			age: Joi.number().min(18).max(110),
		});
	}

	static async handler (req, res) {
		passport.authenticate('local-signup', function (err, user) {
			if (err) {
				const {
					status,
					message,
				} = err;

				res.status(status);
				res.json({
					status: 'error',
					message,
				});
				return;
			}

			req.login(user, (err) => {
				if (err) {
					console.log(err);

					res.status(500);
					res.json({
						status: 'error',
						message: 'internal server error',
					});

					return;
				}

				return res.json({
					status: 'success',
				});
			});
		})(req, res);		
	}
}

module.exports = Signup;