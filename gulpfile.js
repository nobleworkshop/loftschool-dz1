/* global require */
var gulp = require("gulp"),
	browserSync = require('browser-sync'),
	less = require('gulp-less');


/*******************************************
 * APP
 ******************************************/
// Запускаем локальный сервер
gulp.task('server', function (){
	browserSync({
		port: 9000,
		server: {
			baseDir: 'app'
		}
	});
});


//LESS task для компиляции для компиляции LESS файлов
gulp.task('less', function(){
	gulp.src('app/less/main.less')
	.pipe(less())
	.pipe(gulp.dest('app/css/'))
});


gulp.watch('app/less/**/*.less', [less]);


// Следим за файлами
gulp.task('watch', function (){

	// Слежка за обычными файлами и livereload
	gulp.watch([
		'app/*.html',
		'app/js/**/*.js',
		'app/css/**/*.css'
	]).on('change', browserSync.reload);

	// Слежка за LESS файлами и их компиляция
	gulp.watch([
		'app/less/**/*.less'
	]).on('change', less);

});


// Дефолтный таск для команды gulp по умолчанию
gulp.task('default', ['server', 'watch', 'less']);




