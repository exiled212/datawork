module.exports = (app, path)=>{
	require('rootpath')();
	// Obetenemos los módulos
	const	modules = require(path.join('.','config','modules.json'));

	// Agregamos los modulos de la lista
	modules.map(item=>{
		let route = require(path.join('.','modules',item.name, 'routes.js'));
		app.use(item.path, route);
	});

}