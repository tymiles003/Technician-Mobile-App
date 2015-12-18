/// <reference path="vendor/angular-messages/angular-messages.js" />
/// <reference path="vendor/angular-touch/angular-touch.js" />
/// <reference path="vendor/angular-touch/angular-touch.js" />
/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    /**
     * The `build_dir` folder is where our projects are compiled during
     * development and the `compile_dir` folder is where our app resides once it's
     * completely built.
     */
    build_dir: 'build',
    compile_dir: 'bin',

    /**
     * This is a collection of file patterns that refer to our app code (the stuff in `src/`). 
     * These file paths are used in the configuration of build tasks. 
     * `js` is all project javascript, less tests. 
     * `jsunit` are our test files
     * `ctpl` contains our reusable components' (`src/common`) template HTML files, while
     * `atpl` contains the same, but for our app's code. 
     * `html` is just our main HTML file, 
     * `less` is our main stylesheet, and 
     * `unit` contains our app's unit tests.
     */
    app_files: {
        //js: ['src/**/*.js', '!src/**/*_test.js', '!src/assets/**/*.js', '!src/lib/**/*.*', '!src/test/e2e/*.*'],
        js: ['src/app/**/*.js',
            'src/common/**/*.js',
            '!src/**/*_test.js'
        ],
        jsunit: ['src/**/*_test.js'],

        atpl: [
            'src/app/**/*.tpl.html',
            'src/common/**/*.tpl.html'
        ],

        html: ['src/index.html'],

        less: [
            'src/assets/less/app.less'
        ]
    },

    /**
     * This is a collection of files used during testing .
     */
    test_files: {
        js: [
          'vendor/angular-mocks/angular-mocks.js'
        ]
    },


    /**
     * This is the same as `app_files`, except it contains patterns that
     * reference vendor code (`vendor/`) that we need to place into the build
     * process somewhere. While the `app_files` property ensures all
     * standardized files are collected for compilation, it is the user's job
     * to ensure non-standardized (i.e. vendor-related) files are handled
     * appropriately in `vendor_files.js`.
     *
     * The `vendor_files.js` property holds files to be automatically
     * concatenated and minified with our project source files.
     *
     * The `vendor_files.css` property holds any CSS files to be automatically
     * included in our app.
     *
     * The `vendor_files.assets` property holds any assets to be copied along
     * with our app's assets. This structure is flattened, so it is not
     * recommended that you use wildcards.
     */
    vendor_files: {
        js: [
          'vendor/jquery/jquery.js',
          'vendor/angular/angular.js',
          'vendor/angular-messages/angular-messages.js',
          'vendor/angular-i18n/angular-locale_fr-fr.js',
          'vendor/angular-bootstrap/ui-bootstrap-tpls.js',
          'vendor/angular-ui-router/release/angular-ui-router.js',
          'vendor/angular-ui-utils/modules/route/route.js', // do we need this
          'vendor/angular-ui-utils/modules/validate/validate.js',
          'vendor/angular-ui-utils/modules/mask/mask.js',

          'vendor/bootstrap/dist/js/bootstrap.js',
          'vendor/angular-webstorage/angular-webstorage.js',

          'src/lib/leaflet/dist/leaflet.js',

          'src/lib/custom-init.js',
          'src/lib/dataTables/js/jquery.dataTables.js',
          'src/lib/dataTables/js/dataTables.bootstrap.js',
          'src/lib/jquery.flexslider.js',
          'src/lib/jquery.smooth-scroll.js',
          'src/lib/jquery/jquery.checkable.js',
          'src/lib/modernizr.js',
          'src/lib/overlay.js',
          'src/lib/waypoints.min.js'
        ],
        jsCopyOnly: [
            // we want to copy cordova files to the server destination folder but we do NOT want to add a script tag for those.
            //"src/lib/cordova/**/*.js"
        ],
        css: [
            'vendor/bootstrap/dist/css/bootstrap.css',

            'src/lib/leaflet/dist/leaflet.css',

            'src/lib/timeline/css/timeline.css',
            'src/lib/dataTables/css/dataTables.bootstrap.css',
            'src/lib/flexslider.js',
            'src/lib/styles.css',
            'src/lib/queries.css',
            'src/lib/animate.css'

        ],
        images:[

        ],
        assets: [
        ],
        fonts: [
            'vendor/bootstrap/fonts/glyphicons-halflings-regular.svg',
            'vendor/bootstrap/fonts/glyphicons-halflings-regular.woff',
            'vendor/bootstrap/fonts/glyphicons-halflings-regular.eot',
            'vendor/bootstrap/fonts/glyphicons-halflings-regular.ttf'
        ]
    }
};
