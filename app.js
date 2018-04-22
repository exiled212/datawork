(()=>{
	require('rootpath')();

	const 	createError		=	require('http-errors'),
			express			=	require('express'),
			cookieParser	=	require('cookie-parser'),
			logger			=	require('morgan'),
			path			=	require('path');

	app	=	express();
	
	// view engine setup
	app	.set('views', path.join(__dirname, 'views'))
		.set('view engine', 'pug')
	
		.use(logger('dev'))
		.use(express.json())
		.use(express.urlencoded({ extended: false }))
		.use(cookieParser())
		.use(express.static(path.join(__dirname, 'public')))
	
	require(path.join('.','config','modules.js'))(app, path);

	
	// catch 404 and forward to error handler
	app
		.use(function(req, res, next) {
			next(createError(404));
		})
	
	// error handler
		.use(function(err, req, res, next) {
			// set locals, only providing error in development
			res.locals.message = err.message;
			res.locals.error = req.app.get('env') === 'development' ? err : {};
		
			// render the error page
			res	.status(err.status || 500).render('error');
		});
	
	module.exports = app;
})();
