const moduleAlias = require('module-alias');

moduleAlias.addAliases({ 
	'@boot': `${__dirname}/boot`,
	'@middleware': `${__dirname}/middleware`,
	'@common': `${__dirname}/common`,
	'@db': `${__dirname}/db-client`,
	'@api': `${__dirname}/api`,

	// modules
	'@user': `${__dirname}/modules/user`,
})