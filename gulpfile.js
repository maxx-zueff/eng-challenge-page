const gulp = require('gulp');
const webpack = require('webpack-stream');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');


let devBuild = (process.env.NODE_ENV !== 'production');
let webpack_config = {
	dev: {
		output: {
			filename: 'script.js',
		},
		mode: 'development'
	},
	prod: {
		output: {
			filename: 'script.js',
		},
		mode: 'production',
		optimization: {
			minimizer: [
				new UglifyJsPlugin({
					uglifyOptions: {
						warnings: false,
						compress: true,
						drop_console: true,
						unsafe:       true,
						output: {
							comments: false,
							beautify: false,
						}
					}
				})
			]
		}
	}
};

let config = webpack_config.dev;
if (!devBuild) config = webpack_config.prod;

gulp.task('styles', function() {
	return gulp.src('build/styles/common.scss')
		.pipe(sass().pipe(sass({outputStyle: 'compressed'}))
			.on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(gulp.dest('public/'));
});

gulp.task('core', function() {
	return gulp.src('build/core/app.js')
		.pipe(webpack(config))
		.pipe(gulp.dest('public/'));
});

gulp.task('watchs', function() {
	gulp.watch('build/styles/**/*.scss', gulp.series('styles'))
		.on('all', function(event, path, stats) {
			console.log('File ' + path + ' was ' + event + ', running tasks...');
		});

	gulp.watch('build/core/**/*.js', gulp.series('core'))
		.on('all', function(event, path, stats) {
			console.log('File ' + path + ' was ' + event + ', running tasks...');
		});

});

gulp.task('default', gulp.series('styles', 'core', 'watchs'));