var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css');

// Concat & Minify CSS 
gulp.task('css', function() {
    gulp.src([
            'node_modules/bootstrap/dist/css/bootstrap.css',
            'src/css/**/*.css'
        ])
        .pipe(minifyCSS())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('web/dist/css'));
});

// Concat & Minify JS files
gulp.task('js', function() {
    gulp.src([
            'node_modules/jquery/dist/jquery.js',
            'node_modules/bootstrap/dist/js/bootstrap.js',
            'node_modules/underscore/underscore.js',
            'node_modules/backbone/backbone.js',
            'node_modules/pubnub/dist/web/pubnub.js',
            'src/js/**/*.js'
        ])
        //.pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest('web/dist/js'));
});

// Copy images to dist folder
gulp.task('images', function() {
    gulp.src([
            'src/images/**/*'
        ])
        .pipe(gulp.dest('web/dist/images'));
});

// Default Tasks
gulp.task('default', function() {
    gulp.run('js', 'css', 'images');
});


// Watch for changes and run the default task
gulp.task('watch', function() {
        gulp.run('default');

        gulp.watch('src/css/**/*.css', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            gulp.run('css');
        });

        gulp.watch('src/js/**/*.js', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            gulp.run('js');
        });

        gulp.watch('src/images/**/*', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
            gulp.run('images');
        });
});



