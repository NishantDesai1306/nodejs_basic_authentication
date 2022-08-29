const express = require('express');
const router = express.Router();

const userRoutes = require('@user/routes/v1');

router.get('/', (req, res) => {
	res.status(200).send(`OK - ${req.baseUrl}`);
});

router.use('/user', userRoutes);

module.exports = router;