## Getting Started

1. clone the repo.
2. create a new `.env-cmdrc` file at root level using `sample.env-cmdrc` as reference.
3. install dependencies by running `npm install`.
4. ensure that the redis is running and accepting connections.
5. start the project by running `npm start`.

## Project
### Project structure
- `boot` - contains files which are used to setup the app when it boots up.
- `common` - contains services, utilities and constants that are common across the project.
- `db-client` - contains files necessary to setup database connection.
- `middleware` - contains various middlewares used for the express app.
- `modules` - contains various API modules of the app.
    - `modules.$.model`: contains model for that particular module, it will include services for performing operation on model.
    - `modules.$.controller`: contains implementation of various API routes supported by the modules.
    - `modules.$.routes`: contains definitions of different API routes supported by the module.
- `api` - configures top level routes with the repestive modules

### Flow of Control
When app is started, it will start the express web server and configure it as per 3rd party middlewares installed in the app, after that's done app is not ready to accept HTTP requests.

When the server receives a request, it is first routed to correct `module` via top-level routes defined under `api` directory, then the rest of the request's url is matched against the API routes supported by that module. If a match is found for the incoming request then the app passes the request through various `middelwares` configured for that route (if any) if request passes through all configured middlewares then the app executes the handler function for that route and responds back to the client with corresponding status code and JSON body in response. 

### API Routes
The project contains a [Postman](https://www.postman.com/) collection in file `nodejs authentication.postman_collection.json`. Below table lists out the supported api routes.

| Method | Route | Description |
| ------ | ------ | ------ |
| POST | /user/login | Validates provided credentials and logs user in for the session.
| POST | /user/signup | Creates new user account.
| GET | /user/profile | If user is logged in then a JSON representing logged in user's profile is returned.
| POST | /user/logout | Logs user out for the current session.

### Key Libraries used
App uses [redis](https://www.npmjs.com/package/redis) to connect to the redis database.

App uses [passportjs](passportjs.org), to handler the authentication and registration endpoints of the app and to ensure that the session is not lost it is being saved to the redis using combination of [express session](https://www.npmjs.com/package/express-session) and [connect redis](https://www.npmjs.com/package/connect-redis) and to securely store password into the database app uses [bcrypt](https://www.npmjs.com/package/bcrypt) to hash them out first before storing them.

To validate schema of data submitted by client (viz request body, query params, etc) the app uses [joi](https://joi.dev/api/?v=17.6.0) and [joi password complexity](https://www.npmjs.com/package/joi-password-complexity).

## Future Improvements
1. Unit testing
2. Use various redis modules like RedisSearch and RedisJSON
3. use Typescript for better typed definitions and dev experience
4. write process logs to a rotating file (can use [winston](https://www.npmjs.com/package/winston))