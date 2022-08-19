const gulp = require('gulp');
const del = require('del');
const gp_rename = require('gulp-rename');
const environments = require('gulp-environments');

const BUILD_PATH = './build';

const QA_ROBOTS_TXT = 'robots-development.txt';
const PRODUCTION_ROBOTS_TXT = 'robots-production.txt';

const isProduction = environments.production;

const executeRobotsTxtPath = isProduction() ? PRODUCTION_ROBOTS_TXT : QA_ROBOTS_TXT;

// handle Robots.txt rename as per respective build
function handleRobotsTxt() {
  return gulp
    .src(`${BUILD_PATH}/${executeRobotsTxtPath}`)
    .pipe(gp_rename('./robots.txt'))
    .pipe(gulp.dest(BUILD_PATH));
}

// exclude Robots.txs as per build
function deleteRobotsTxt() {
  return del([`${BUILD_PATH}/${QA_ROBOTS_TXT}`, `${BUILD_PATH}/${PRODUCTION_ROBOTS_TXT}`]);
}

// exclude sitemap for QA build
function deleteSitemap(cb) {
  if (isProduction()) {
    cb();
    return false;
  }
  return del([`${BUILD_PATH}/sitemap.xml`]);
}

const build = gulp.series(handleRobotsTxt, deleteRobotsTxt, deleteSitemap);

exports.build = build;
