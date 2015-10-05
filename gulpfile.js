var gulp = require("gulp"),
	browserSync = require('browser-sync');

var less = require('gulp-less');


//LESS task
gulp.task('less', function(){
	gulp.src('app/less/main.less')
	.pipe(less())
	.pipe(gulp.dest('app/css/'))
});


gulp.watch('app/less/**/*.less', [less]);

//Сервер
gulp.task('server', function (){
	browserSync({
		port: 9000,
		server: {
			baseDir: 'app'
		}
	});
});

// Слежка
gulp.task('watch', function (){

	gulp.watch([
		'app/*.html',
		'app/js/**/*.js',
		'app/css/**/*.css'
	]).on('change', browserSync.reload);

	gulp.watch([
		'app/less/**/*.less'
	]).on('change', less);

});



gulp.task('default', ['server', 'watch', 'less']);




