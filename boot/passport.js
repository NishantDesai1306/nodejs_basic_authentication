const { Strategy: LocalStrategy } = require('passport-local');
const passwordComplexity = require('joi-password-complexity');
const passport = require('passport');

const UserModel = require('@user/model');
const { PASSWORD_POLICY } = require('@common');

function setupPassport(app) {
	passport.serializeUser((user, done) => {
		done(null, user.username);
	});

	passport.deserializeUser(async (id, done) => {
		const username = id;
		const user = await UserModel.getUserByUsername(username);
		
		if (user) {
			done(null, user);
		}
	});

	passport.use('local-login', new LocalStrategy(async (username, password, done) => {
		const user = await UserModel.getUserByUsername(username);
		
		if (!user) {
			done({
				status: 404,
				message: 'invalid username or password',
			});
			return;
		}

		const areCredentialsValid = await user.validatePassword(password);

		if (areCredentialsValid) {
			done(null, user);
		}
		else {
			done({
				status: 401,
				message: 'invalid username or password',
			});
		}
	}));

	passport.use('local-signup', new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
		const {
			age,
		} = req.body;
		const existingUser = await UserModel.getUserByUsername(username);

		if (existingUser) {
			done({
				status: 400,
				message: 'username already exists',
			});
			return;
		}

		const passwordComplexityResult = passwordComplexity(PASSWORD_POLICY).validate(password);

		if (passwordComplexityResult.error) {
			done({
				status: 422,
				message: `password should have ${PASSWORD_POLICY.min} - ${PASSWORD_POLICY.max} characters, and it must include ${PASSWORD_POLICY.lowerCase} lowercase character(s), ${PASSWORD_POLICY.upperCase} uppercase character(s), ${PASSWORD_POLICY.numeric} number(s) and ${PASSWORD_POLICY.symbol} symbol(s)`,
			});
			return;
		}

		const newUser = await UserModel.saveUser({
			username,
			password,
			age,
		});

		done(null, newUser);
	}));

	app.use(passport.initialize());
	app.use(passport.session());
}

module.exports = setupPassport;