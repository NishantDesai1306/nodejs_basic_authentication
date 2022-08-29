class DataValidator {
	static getValidationErrors (schema, json) {
		const { error } = schema.validate(json);
		return error;
	}

	static handler(schema, fieldToValidate = 'body') {
		return (req, res, next) => {
			const json = req[fieldToValidate];
			const error = DataValidator.getValidationErrors(schema, json);

			if (error) {
				res.status(422);
				res.json({
					status: 'error',
					message: error,
				});
				return;
			}

			next();
		};
	}
}

module.exports = DataValidator;