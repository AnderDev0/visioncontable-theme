'use strict';

const { src, dest, watch, series, parallel } = require('gulp');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const paths = {
  css: {
    src: 'assets/css/screen.css',
    dest: 'assets/built/'
  }
};

function css(done) {
  src(paths.css.src, { sourcemaps: true })
    .pipe(postcss([
      postcssImport(),
      autoprefixer(),
      cssnano({ preset: 'default' })
    ]))
    .pipe(dest(paths.css.dest, { sourcemaps: '.' }));
  done();
}

function watcher() {
  watch('assets/css/**/*.css', css);
}

const build = series(css);
const dev = series(build, watcher);

exports.build = build;
exports.default = dev;
