var args = require('yargs').argv,
    _ = require('underscore'),
    fs = require('fs'),
    path = require('path'),
    gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    gulpsync = $.sync(gulp),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    PluginError = $.util.PluginError,
    del = require('del'),
    karmaServer = require('karma').Server,
    protractor = $.protractor.protractor,
    webdriver = $.protractor.webdriver,
    // replace = require('gulp-replace'),
    replace = require('gulp-replace-task'),
    express = require('express');
   
var s3 = require("gulp-s3");
var knownEnvVars = ['local', 'demo', 'dev', 'prod'];

// by default app environment is 'local'
var ENV = 'local';
var setEnv = function(env){

    var known = false;
    if(env){
        env = env.toLowerCase();
        for (var i = knownEnvVars.length - 1; i >= 0; i--) {
            if(knownEnvVars[i] == env){
                known = true;
                break;
            }
        }
        if(known){
            ENV = env
        }else{
            log('Environment: "'+env+'" not found');
            log("List of available environment names: "+ knownEnvVars.toString())
        }
    }
    log('Setting Up App environment env: '+ENV)

};

setEnv(args.env);
// VALUES TO REPLACE SOME CODE VARIABLES VALUE DEPENDING ON REQUIRED ENVIRONMENT

var ENV_VARS = {
    local: {
        apiBaseUrl: "http://localhost:1337"
    }
};
// gulp-replace pattern
var replaceBaseUrl = {
    pattern: /[\s\t]*gulp:overrideApiBaseUrl\s*(\n|\r|.)*?(gulp:endOverrideApiBaseUrl)/gi,
    replacement: ' gulp:overrideApiBaseUrl \napiBaseUrl = \''+ENV_VARS[ENV].apiBaseUrl+'\';\n\/\/ gulp:endOverrideApiBaseUrl'
};

// console.log('replaceBaseUrl.replacement: ',replaceBaseUrl.replacement)

// production mode (see build task)
var isProduction = false;
// styles sourcemaps
var useSourceMaps = false;

// Switch to sass mode.
// Example:
//    gulp --usesass
var useSass = args.usesass;

// Angular template cache
// Example:
//    gulp --usecache
var useCache = args.usecache;

// ignore everything that begins with underscore
var hidden_files = '**/_*.*';
var ignored_files = '!' + hidden_files;

// MAIN PATHS
var paths = {
    app: '../app/',
    markup: 'jade/',
    styles: 'less/',
    scripts: 'js/'
};

// if sass -> switch to sass folder
if (useSass) {
    log('Using SASS stylesheets...');
    paths.styles = 'sass/';
}


// VENDOR CONFIG
var vendor = {
    // vendor scripts required to start the app
    base: {
        source: require('./vendor.base.json'),
        js: 'base.js',
        css: 'base.css'
    },
    // vendor scripts to make the app work. Usually via lazy loading
    app: {
        source: require('./vendor.json'),
        dest: '../vendor'
    }
};


// SOURCES CONFIG
var source = {
    scripts: [
        paths.scripts + 'app.module.js',
        paths.scripts + 'app.config.js',
        // template modules
        paths.scripts + 'components/**/*.module.js',
        paths.scripts + 'components/**/*.js',
        // modules modules
        paths.scripts + 'modules/**/*.module.js',
        paths.scripts + 'modules/**/*.js'

    ],
    templates: {
        index: [paths.markup + 'index.*'],
        views: [paths.markup + '**/*.*', '!' + paths.markup + 'index.*']
    },
    styles: {
        app: [paths.styles + '*.*'],
        themes: [paths.styles + 'themes/*'],
        watch: [paths.styles + '**/*', '!' + paths.styles + 'themes/*']
    }
};

// BUILD TARGET CONFIG
var build = {
    scripts: paths.app + 'js',
    styles: paths.app + 'css',
    templates: {
        index: '../',
        views: paths.app,
        cache: paths.app + 'js/' + 'templates.js'
    }
};

// PLUGINS OPTIONS

var prettifyOpts = {
    indent_char: ' ',
    indent_size: 3,
    unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u', 'pre', 'code']
};

var vendorUglifyOpts = {
    mangle: {
        except: ['$super'] // rickshaw requires this
    }
};

var compassOpts = {
    project: path.join(__dirname, '../'),
    css: 'app/css',
    sass: 'master/sass/',
    image: 'app/img'
};

var compassOptsThemes = {
    project: path.join(__dirname, '../'),
    css: 'app/css',
    sass: 'master/sass/themes/', // themes in a subfolders
    image: 'app/img'
};

var tplCacheOptions = {
    root: 'app',
    filename: 'templates.js',
    //standalone: true,
    module: 'app.core',
    base: function(file) {
        return file.path.split('jade')[1];
    }
};

var injectOptions = {
    name: 'templates',
    transform: function(filepath) {
        return 'script(src=\'' +
            filepath.substr(filepath.indexOf('app')) +
            '\')';
    }
};

var cssnanoOpts = {
    safe: true,
    discardUnused: false, // no remove @font-face
    reduceIdents: false // no change on @keyframes names
};


//---------------
// TASKS
//---------------


// JS APP
gulp.task('scripts:app', function() {
    log('Building scripts..');
    // Minify and copy all JavaScript (except vendor scripts)
    return gulp.src(source.scripts)
        .pipe($.jsvalidate())
        .on('error', handleError)
        .pipe($.if(useSourceMaps, $.sourcemaps.init()))
        .pipe($.concat('app.js'))
        .pipe($.ngAnnotate())
        .on('error', handleError)
        .pipe($.if(isProduction, $.uglify({
            preserveComments: 'some'
        })))
        .on('error', handleError)
        .pipe($.if(useSourceMaps, $.sourcemaps.write()))
        .pipe(gulp.dest(build.scripts))
        .pipe(reload({
            stream: true
        }));
});
 
gulp.task('env:vars:replace', function () {
  gulp.src(source.scripts[0])
    .pipe(replace({
      patterns: [
        {
          match: replaceBaseUrl.pattern,
          replacement: replaceBaseUrl.replacement
        }
      ]
    }))
    .pipe(gulp.dest(function(file) {
        console.log('file: ', file.base);
        return file.base;
    }));
});
// EVN VARIABLES REPLACEMENT TASK
/*gulp.task('env:vars:replace', function(){
    console.log('replaceBaseUrl.replacement: ', replaceBaseUrl.replacement)
    return gulp.src(["./js/app.module.js"])
        .pipe(replace(replaceBaseUrl.pattern, replaceBaseUrl.replacement))
        .pipe(gulp.dest(function(file) {
            console.log('file: ', file.base)
            return file.base;
        }));
});*/

// VENDOR BUILD
gulp.task('vendor', gulpsync.sync(['vendor:base', 'vendor:app']));

// Build the base script to start the application from vendor assets
gulp.task('vendor:base', function() {
    log('Copying base vendor assets..');

    var jsFilter = $.filter('**/*.js', {
        restore: true
    });
    var cssFilter = $.filter('**/*.css', {
        restore: true
    });

    return gulp.src(vendor.base.source)
        .pipe($.expectFile(vendor.base.source))
        .pipe(jsFilter)
            .pipe($.concat(vendor.base.js))
            .pipe($.if(isProduction, $.uglify()))
            .pipe(gulp.dest(build.scripts))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
            .pipe($.concat(vendor.base.css))
            .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
            .pipe(gulp.dest(build.styles))
        .pipe(cssFilter.restore())
        ;
});

// copy file from bower folder into the app vendor folder
gulp.task('vendor:app', function() {
    log('Copying vendor assets..');

    var jsFilter = $.filter('**/*.js', {
        restore: true
    });
    var cssFilter = $.filter('**/*.css', {
        restore: true
    });

    return gulp.src(vendor.app.source, {
            base: 'bower_components'
        })
        .pipe($.expectFile(vendor.app.source))
        .pipe(jsFilter)
        .pipe($.if(isProduction, $.uglify(vendorUglifyOpts)))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
        .pipe(cssFilter.restore())
        .pipe(gulp.dest(vendor.app.dest));

});

// APP LESS
gulp.task('styles:app', function() {
    log('Building application styles..');
    return gulp.src(source.styles.app)
        .pipe($.if(useSourceMaps, $.sourcemaps.init()))
        .pipe(useSass ? $.compass(compassOpts) : $.less())
        .on('error', handleError)
        .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
        .pipe($.if(useSourceMaps, $.sourcemaps.write()))
        .pipe(gulp.dest(build.styles))
        .pipe(reload({
            stream: true
        }));
});

// APP RTL
gulp.task('styles:app:rtl', function() {
    log('Building application RTL styles..');
    return gulp.src(source.styles.app)
        .pipe($.if(useSourceMaps, $.sourcemaps.init()))
        .pipe(useSass ? $.compass(compassOpts) : $.less())
        .on('error', handleError)
        .pipe($.rtlcss()) /* RTL Magic ! */
        .pipe($.if(isProduction, $.cssnano(cssnanoOpts)))
        .pipe($.if(useSourceMaps, $.sourcemaps.write()))
        .pipe($.rename(function(path) {
            path.basename += "-rtl";
            return path;
        }))
        .pipe(gulp.dest(build.styles))
        .pipe(reload({
            stream: true
        }));
});

// LESS THEMES
gulp.task('styles:themes', function() {
    log('Building application theme styles..');
    return gulp.src(source.styles.themes)
        .pipe(useSass ? $.compass(compassOptsThemes) : $.less())
        .on('error', handleError)
        .pipe(gulp.dest(build.styles))
        .pipe(reload({
            stream: true
        }));
});

// JADE
gulp.task('templates:index', ['templates:views'], function() {
    log('Building index..');

    var tplscript = gulp.src(build.templates.cache, {
        read: false
    });
    return gulp.src(source.templates.index)
        .pipe($.if(useCache, $.inject(tplscript, injectOptions))) // inject the templates.js into index
        .pipe($.jade())
        .on('error', handleError)
        .pipe($.htmlPrettify(prettifyOpts))
        .pipe(gulp.dest(build.templates.index))
        .pipe(reload({
            stream: true
        }));
});

// JADE
gulp.task('templates:views', function() {
    log('Building views.. ' + (useCache ? 'using cache' : ''));

    if (useCache) {

        return gulp.src(source.templates.views)
            .pipe($.jade())
            .on('error', handleError)
            .pipe($.angularTemplatecache(tplCacheOptions))
            .pipe($.if(isProduction, $.uglify({
                preserveComments: 'some'
            })))
            .pipe(gulp.dest(build.scripts))
            .pipe(reload({
                stream: true
            }));
    } else {

        return gulp.src(source.templates.views)
            .pipe($.if(!isProduction, $.changed(build.templates.views, {
                extension: '.html'
            })))
            .pipe($.jade())
            .on('error', handleError)
            .pipe($.htmlPrettify(prettifyOpts))
            .pipe(gulp.dest(build.templates.views))
            .pipe(reload({
                stream: true
            }));
    }
});

//---------------
// WATCH
//---------------

// Rerun the task when a file changes
gulp.task('watch', function() {
    log('Watching source files..');

    gulp.watch(source.scripts, ['scripts:app','env:vars:replace']);
    gulp.watch(source.styles.watch, ['styles:app', 'styles:app:rtl']);
    gulp.watch(source.styles.themes, ['styles:themes']);
    gulp.watch(source.templates.views, ['templates:views']);
    gulp.watch(source.templates.index, ['templates:index']);

});

// Serve files with auto reaload
gulp.task('browsersync', function() {
    log('Starting BrowserSync..');

    browserSync({
        notify: false,
        port: 3011,
        server: {
            baseDir: '..'
        }
    });

});

// lint javascript
gulp.task('lint', function() {
    return gulp
        .src(source.scripts)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe($.jshint.reporter('fail'));
});

// Remove all files from the build paths
gulp.task('clean', function(done) {
    var delconfig = [].concat(
        build.styles,
        build.scripts,
        build.templates.index + 'index.html',
        build.templates.views + 'views',
        build.templates.views + 'pages',
        vendor.app.dest
    );

    log('Cleaning: ' + $.util.colors.blue(delconfig));
    // force: clean files outside current directory
    del(delconfig, {
        force: true
    }, done);
});

//---------------
// MAIN TASKS
//---------------

// build for production (minify)
gulp.task('build', gulpsync.sync([
    'env:vars:replace',
    'vendor',
    'assets',
    'scripts:app',
    'styles:app',
    'styles:app:rtl',
    'styles:themes',
    'templates:views',
    'templates:index'
]));


gulp.task('prod', function() {
    log('Starting production build...');
    isProduction = true;
});
/*
aws_config.json
Supposed to look like this:
{
    key:"",
    secret:""
}

*/
gulp.task('s3deploy', function () {
    if(ENV !='local'){
        var aws_config;
        try{
            aws_config  = JSON.parse(fs.readFileSync('./aws_config.'+ENV+'.json'));
        }catch(e){
            throw('master/aws_config.json file missing')
        }
        if(aws_config.key && aws_config.secret && aws_config.bucket){
            gulp.src('../app/**').pipe(s3(aws_config, {uploadPath: "app/"}));
            gulp.src('../vendor/**').pipe(s3(aws_config, {uploadPath: "vendor/"}));
            gulp.src('../server/**').pipe(s3(aws_config, {uploadPath: "server/"}));
            return gulp.src('../index.html').pipe(s3(aws_config))
        }else{
            throw('invalid aws_config.json\n key, secret, bucket - parameters expected')
        }
    }else{
        throw('unable to deploy with local environment \nplease start this task with --env [ENV]\n available ENV [prod,demo,dev]')
    }
});

gulp.task('deploy', gulpsync.sync([
    'env:vars:replace',
    'build',
    's3deploy'
]), done);

// Server for development
gulp.task('serve', gulpsync.sync([
    'env:vars:replace',
    'default',
    'browsersync'
]), done);

// Server for production
gulp.task('serve-prod', gulpsync.sync([
    'env:vars:replace',
    'build',
    'browsersync'
]), done);

// build with sourcemaps (no minify)
gulp.task('sourcemaps', ['usesources', 'default']);
gulp.task('usesources', function() {
    useSourceMaps = true;
});

// default (no minify)
gulp.task('default', gulpsync.sync([
    'vendor',
    'assets',
    'watch'
]));

gulp.task('assets', [
    'scripts:app',
    'styles:app',
    'styles:app:rtl',
    'styles:themes',
    'templates:index',
    'templates:views'
]);

/// Testing tasks

gulp.task('test:unit', function(done) {
    startKarmaTests(true, done);
});

gulp.task('webdriver', webdriver);
gulp.task('test:e2e', ['webdriver'], function(cb) {

    var testFiles = gulp.src('test/e2e/**/*.js');

    testServer({
        port: '4444',
        dir: './app/'
    }).then(function(server) {
        testFiles.pipe(protractor({
            configFile: 'tests/protractor.conf.js'
        })).on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        }).on('end', function() {
            server.close(cb)
        });
    });

});

gulp.task('test', ['test:unit', 'test:e2e']);

/////////////////////

function done() {
    log('************');
    log('* All Done * You can start editing your code, BrowserSync will update your browser after any change..');
    log('************');
}

// Error handler
function handleError(err) {
    log(err.toString());
    this.emit('end');
}

// log to console using
function log(msg) {
    $.util.log($.util.colors.blue(msg));
}

function testServer(params) {

    var app = express();

    app.use(express.static(params.dir));

    return new Promise(function(res, rej) {
        var server = app.listen(params.port, function() {
            res(server)
        });
    });
}

function startKarmaTests(singleRun, done) {

    var excludeFiles = [];

    var server = new karmaServer({
        configFile: __dirname + '/tests/karma.conf.js',
        exclude: excludeFiles,
        singleRun: !!singleRun
    }, karmaCompleted);

    server.start();

    ////////////////

    function karmaCompleted(karmaResult) {
        log('Karma completed');

        if (karmaResult === 1) {
            done('\n********************************'+
                 '\nkarma: tests failed with code ' + karmaResult +
                 '\n********************************');
        } else {
            done();
        }
    }
}
