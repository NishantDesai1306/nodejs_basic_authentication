const express = require('express');

require('./alias');

const apiRoutes = require('@api');
const boot = require('@boot');

const app = new express();

boot(app);

app.use(express.json());

app.use(apiRoutes);

app.listen(process.env.PORT || 8080, () => {
	console.log('server started');
});