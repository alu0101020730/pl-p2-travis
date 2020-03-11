var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task("setup", shell.task(
    'cd .. && ' +
    'mkdir data  && ' +
    'cd data &&' +
    'curl -O https://www.gutenberg.org/cache/epub/feeds/rdf-files.tar.bz2 &&' +
    'tar -xvjf rdf-files.tar.bz2'
));

