const babel = require('gulp-babel');
const del = require('del');
const { src, dest, watch, series, parallel } = require('gulp');
const minifyCSS = require('gulp-clean-css');
const eslint = require('gulp-eslint');
const ghPages = require('gulp-gh-pages');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const uglify = require('gulp-uglify');
const fractal = require('./fractal.js');
const { spawn } = require('child_process');

// Public Tasks:

exports.default = parallel(sasswatch, jswatch, fractalstart, watcher);

exports.build = series(clean, sassbuild, scsslint, jslint, jsbuild, fractalbuild, githubpages, runpercy);

// Fractal to Gulp Integration:

const logger = fractal.cli.console; // keep a reference to the fractal CLI console utility

function fractalstart() {
  const server = fractal.web.server({
    sync: true
  });
  server.on('error', err => logger.error(err.message));
  return server.start().then(() => {
    logger.success(`Fractal now running`);
  });
}

function fractalbuild(cb) {
  const builder = fractal.web.builder();
  builder.on('progress', (completed, total) => logger.update(`Exported ${completed} of ${total} items`, 'info'));
  builder.on('error', err => logger.error(err.message));
  return builder.build().then(() => {
    logger.success('Fractal build completed');
  })
  cb();
}

// General Tasks:

function clean(cb) {
  return del(['./dist/**', './ui-assets/css/sourcemaps'])
  cb();
}

function watcher(cb) {
  watch('./scss/*.scss', parallel(sasswatch, scsslint));
  watch('./js/*.js', parallel(jswatch, jslint));
  cb();
}

function sasswatch(cb) {
  return src('./scss/*.scss', { sourcemaps: true })
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss())
  .pipe(dest('./ui-assets/css', { sourcemaps: 'sourcemaps' }))
  cb();
}

function sassbuild(cb) {
  return src('./scss/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss())
  .pipe(minifyCSS())
  .pipe(dest('./ui-assets/css'))
  cb();
}

function scsslint(cb) {
  return src('./scss/*.scss')
  .pipe(sassLint({
    configFile: 'sass-lint-config.yml'
  }))
  .pipe(sassLint.format())
  .pipe(sassLint.failOnError())
  cb();
}

function jslint(cb) {
  return src(['./js/*.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  cb();
}

function jswatch(cb) {
  return src('./js/*.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(dest('./ui-assets/js'))
  cb();
}

function jsbuild(cb) {
  return src(['./js/*.js'])
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify())
  .pipe(dest('./ui-assets/js'))
  cb();
}

function githubpages(cb) {
  return src('./dist/**/*')
  .pipe(ghPages())
  cb();
}

function runpercy() {
  return spawn('npm run percy', {
    stdio: 'inherit',
    shell: true
  });
}
