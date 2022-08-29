const bcrypt = require('bcrypt');
const redis = require('@db/redis');

class User {
	username;
	password;
	age;

	constructor(username, password, age) {
		this.username = username;
		this.password = password;
		this.age = age;
	}

	static fromJsonString(jsonString) {
		const {
			username,
			password,
			age,
		} = JSON.parse(jsonString);

		return new User(username, password, age);
	}

	toJsonString() {
		const user = {
			username: this.username,
			password: this.password,
			age: this.age,
		};

		return JSON.stringify(user);
	}

	async validatePassword(plainPassword) {
		const isPasswordValid = await bcrypt.compare(plainPassword, this.password);
		return isPasswordValid;
	}
}

class UserService {
	async saveUser(userData) {
		const {
			username,
			password,
			age,
		} = userData;
		const userKey = this.getRedisUserKey(username);
		const encryptedPassword = await this.encryptPassword(password);
		const user = new User(username, encryptedPassword, age);

		await redis.set(userKey, user.toJsonString());

		return user;
	}

	async getUserByUsername(username) {
		const userKey = this.getRedisUserKey(username);
		const userObjString = await redis.get(userKey);

		if (!userObjString) {
			return null;
		}

		return User.fromJsonString(userObjString);
	}

	getRedisUserKey(username) {
		return `user:${username}`;
	};

	async encryptPassword(password) {
		const salt = await bcrypt.genSalt(10);
		const hash = bcrypt.hash(password, salt);

		return hash;
	}
};

module.exports = new UserService();