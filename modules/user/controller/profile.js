class Profile {
	static async handler(req, res) {
		const {
			username,
			age,
		} = req.user;

		return res.json({
			data: {
				username,
				age,
			}
		});
	}
}

module.exports = Profile;