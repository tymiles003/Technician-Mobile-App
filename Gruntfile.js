module.exports = function (grunt) {

    /** 
     * Load required Grunt tasks. These are installed based on the versions listed
     * in `package.json` when you do `npm install` in this directory.
     * this loads exactly all dependencies.
     */
    require('load-grunt-tasks')(grunt);

    /**
     * Load in our build configuration file.
     */
    var userConfig = require('./build.config.js');
    /**
     * This is the configuration object Grunt uses to give each plugin its 
     * instructions.
     */
    var taskConfig = {
        /**
         * We read in our `package.json` file so we can access the package name and
         * version. It's already there, so we don't repeat ourselves here.
         */
        pkg: grunt.file.readJSON("package.json"),

        /**
         * The banner is the comment that is placed at the top of our compiled 
         * source files. It is first processed as a Grunt template, where the `<%=`
         * pairs are evaluated based on this very configuration object.
         */
        meta: {
            banner:
              '/**\n' +
              ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
              ' * <%= pkg.homepage %>\n' +
              ' *\n' +
              ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
              ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
              ' */\n'
        },

        /**
         * Creates a changelog on a new version.
         */

        //    changelog: {
        //      options: {
        //        dest: 'CHANGELOG.md',
        //        template: 'changelog.tpl'
        //      }
        //    },

        /**
         * Increments the version number, etc.
         */
        //    bump: {
        //      options: {
        //        files: [
        //          "package.json",
        //          "bower.json"
        //        ],
        //        commit: false,
        //        commitMessage: 'chore(release): v%VERSION%',
        //        commitFiles: [
        //          "package.json",
        //          "client/bower.json"
        //        ],
        //        createTag: false,
        //        tagName: 'v%VERSION%',
        //        tagMessage: 'Version %VERSION%',
        //        push: false,
        //        pushTo: 'origin'
        //      }
        //    },

        /**
         * The directories to delete when `grunt clean` is executed.
         */
        clean: [
          '<%= build_dir %>',
          '<%= compile_dir %>'
        ],

        /**
         * The `copy` task just copies files from A to B. We use it here to copy
         * our project assets (images, fonts, etc.) and javascripts into
         * `build_dir`, and then to copy the assets to `compile_dir`.
         */
        copy: {
            //copy everything from src/assets into dest/assets
            build_app_assets: {
                files: [
                  {
                      src: ['**'],
                      dest: '<%= build_dir %>/assets/',
                      cwd: 'src/assets',
                      expand: true
                  }
                ]
            },
            build_app_json: {
                files: [
                    {
                        src: ['**'],
                        dest: '<%= build_dir %>/data/',
                        cwd: 'src/app/data',
                        expand: true
                    }
                ]
            },
            build_app_lib: {
                files: [
                    {
                        src: ['**/**/**/**/*.*'],
                        dest: '<%= build_dir %>/lib/',
                        cwd: 'src/app/lib',
                        expand: true
                    }
                ]
            },
            build_vendor_assets: {
                files: [
                  {
                      src: ['<%= vendor_files.assets %>'],
                      dest: '<%= build_dir %>/assets/',
                      cwd: '.',
                      expand: true,
                      flatten: true
                  }
                ]
            },
            build_vendor_fonts: {
                files: [
                  {
                      src: ['<%= vendor_files.fonts %>'],
                      dest: '<%= build_dir %>/assets/fonts/',
                      cwd: '.',
                      expand: true,
                      flatten: true
                  }
                ]
            },
            build_appjs: {
                files: [
                  {
                      src: ['<%= app_files.js %>'],
                      dest: '<%= build_dir %>/',
                      cwd: '.',
                      expand: true
                  }
                ]
            },
            build_vendorjs: {
                files: [
                  {
                      // include vendor files and copy only files
                      src: [
                          '<%= vendor_files.js %>',
                          '<%= vendor_files.jsCopyOnly %>'
                      ],
                      dest: '<%= build_dir %>/',
                      cwd: '.',
                      expand: true
                  }
                ]
            },
            compile_assets: {
                files: [
                  {
                      src: ['**'],
                      dest: '<%= compile_dir %>/assets',
                      cwd: '<%= build_dir %>/assets',
                      expand: true
                  }
                ]
            },
            compile_vendorjs: {
                files: [
                  {
                      // include vendor files and copy only files
                      src: ['<%= vendor_files.jsCopyOnly %>'],
                      dest: '<%= compile_dir %>/',
                      cwd: '.',
                      expand: true
                  }
                ]
            },

        },

        /**
         * `grunt concat` concatenates multiple source files into a single file.
         */
        concat: {
            /**
             * The `build_css` target concatenates compiled CSS and vendor CSS
             * together.
             */
            build_css: {
                src: [
                  '<%= vendor_files.css %>',
                  '<%= less.build.dest %>'
                ],
                dest: '<%= less.build.dest %>'
            },
            /**
             * The `compile_js` target is the concatenation of our application source
             * code and all specified vendor source code into a single file.
             */
            compile_js: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                src: [
                  '<%= vendor_files.js %>',
                  'module.prefix',
                  '<%= build_dir %>/src/**/*.js',
                  /* do not concat cordova plugins*/
                  //'!<%= build_dir %>/src/lib/cordova/**/*.js',
                  '<%= html2js.app.dest %>',
                  'module.suffix'
                ],
                dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },

        /**
        * `ng-annotate` annotates the sources before minifying. That is, it allows us to code without the array syntax.
        */
        ngAnnotate: {
            compile: {
                options: {
                    // Task-specific options go here.
                    add: true,
                },
                files: [
                  {
                      src: ['<%= app_files.js %>'],
                      cwd: '<%= build_dir %>',
                      dest: '<%= build_dir %>',
                      expand: true
                  }
                ]
            }
        },

        /**
         * Minify the sources!
         */
        uglify: {
            compile: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                files: {
                    '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
                }
            }
        },

        /**
         * `less` handles our LESS compilation and uglification automatically.
         * Only our `main.less` file is included in compilation; all other files
         * must be imported from this file.
         */
        less: {
            build: {
                src: ['<%= app_files.less %>'],
                dest: '<%= build_dir %>/assets/css/<%= pkg.name %>-<%= pkg.version %>.css',
                options: {
                    compress: false
                }
            },
            compile: {
                src: ['<%= less.build.src %>'],
                dest: '<%= less.build.dest %>',
                options: {
                    compress: true,
                    nncss: true
                }
            }
        },

        /**
         * `jshint` defines the rules of our linter as well as which files we should check. 
         * This file, all javascript sources, and all our unit tests are linted based on the policies listed in `options`. 
         * But we can also specify exclusionary patterns by prefixing them with an exclamation point (!); 
         * this is useful when code comes from a third party but is nonetheless inside `src/`.
         */
        jshint: {

            src: [
              '<%= app_files.js %>',
              // exclude lib : this contains (non bower) libraries and our ugly code :)
              '!src/lib/**/*.js',
              '!src/app/xprmnt/camera/**/*.js'
            ],
            //test: [
            //  '<%= app_files.jsunit %>'
            //],
            gruntfile: [
            ],
            options: {
                /* 
                Enforcing options
                */

                // makes curly braces mandatory
                curly: true,
                // forces camelcase on all variables
                //camelcase: true,
                //  prohibits the use of immediate function invocations without wrapping them in parentheses.
                immed: true,
                // requires you to capitalize names of constructor functions.
                newcap: true,
                // prohibits the use of arguments.caller and arguments.callee
                noarg: true,
                // prohibits the use of explicitly undeclared variables.
                undef: true,
                // warns when you define and never use your variables
                //unused: true,

                /*
                Relaxing options
                */

                // suppresses warnings about using [] notation when it can be expressed in dot notation:
                sub: true,
                // suppress warnings about the use of assignments in cases where comparisons are expected
                boss: true,
                // suppresses warnings about == null comparisons.
                eqnull: true,
                // This option suppresses warnings about the use of global strict mode.
                globalstrict: true,

                /* 
                Environments
                */

                // ignore console.log, alert etc.
                devel: true,
                //suppresses warnings about the debugger statements in your code.
                debug: true,
                // ignore 'use strict'
                strict: false,

                esnext: true,

                globals: {
                    'angular': true,
                    '$': true, // jquery global
                    'window': true,
                    'document': true,
                    'localStorage': true,

                    /* jasmin */
                    'describe': true,
                    'it': true,
                    'beforeEach': true,
                    'afterEach': true,
                    'expect': true,
                    'module': true,
                    'inject': true,
                    /* protractor */
                    'browser':true,
                    'L': true,
                    'geocoder': true,
                    'google': true,
                    'lat':true,
                    'lon':true,
                    'Camera':true,
                    'navigator':true,
                    'LocalFileSystem': true
                }
            }
        },

        /**
         * HTML2JS is a Grunt plugin that takes all of your template files and
         * AngularJS's template cache. This means that the templates too become
         * part of the initial payload as one JavaScript file. Neat!
         */
        html2js: {
            /**
             * These are the templates from `src/app`.
             */
            app: {
                options: {
                    base: 'src/app'
                },
                src: ['<%= app_files.atpl %>'],
                dest: '<%= build_dir %>/templates-app.js'
            }

            /**
             * These are the templates from `src/common`.
             */
            //      common: {
            //        options: {
            //          base: 'src/common'
            //        },
            //        src: [ '<%= app_files.ctpl %>' ],
            //        dest: '<%= build_dir %>/templates-common.js'
            //      }
        },

        /**
        * Start a connect web server.
        */
        connect: {
            livereload: {
                options: {
                    open: {
                        target: 'http://localhost:8000/index.html'
                    },
                    base: ['build'],
                    livereload: true, // injection du script du reload
                    hostname: 'localhost', // utiliser 0.0.0.0 pour autoriser le livereload depuis d'autres devices                
                    useAvailablePort : true
                }
            },
            // used to test compiled version adhoc, you can start a persitent server by typeing "grunt connect:adhoc"
            adhoc: {
                options: {
                    open: {
                        target: 'http://localhost:8000/index.html'
                    },
                    base: ['bin'],
                    keepalive: true,
                    hostname: 'localhost', // utiliser 0.0.0.0 pour autoriser le livereload depuis d'autres devices                
                }
            }
        },

        /**
         * The Karma configurations.
         */
        karma: {
            unit: {
                singleRun: true,
                background: true
            },
            options: {
                configFile: '<%= build_dir %>/karma-unit.js'
            },
            continuous: {
                background: true
            }
        },

        /**
         * The `index` task compiles the `index.html` file as a Grunt template. CSS
         * and JS files co-exist here but they get split apart later.
         */
        index: {

            /**
             * During development, we don't want to have wait for compilation,
             * concatenation, minification, etc. So to avoid these steps, we simply
             * add all script files directly to the `<head>` of `index.html`. The
             * `src` property contains the list of included files.
             */
            build: {
                dir: '<%= build_dir %>',
                src: [
                  '<%= vendor_files.js %>',
                  //'<%= build_dir %>/src/**/*.js',
                  '<%= app_files.js %>',
                  '<%= html2js.app.dest %>',
                  //'<%= vendor_files.css %>',
                  '<%= less.build.dest %>'
                ]
            },

            /**
             * When it is time to have a completely compiled application, we can
             * alter the above to include only a single JavaScript and a single CSS
             * file. Now we're back!
             */
            compile: {
                dir: '<%= compile_dir %>',
                src: [
                  '<%= concat.compile_js.dest %>',
                  '<%= vendor_files.css %>',
                  '<%= less.compile.dest %>'
                ]
            }
        },

        /**
         * This task compiles the karma template so that changes to its file array
         * don't have to be managed manually.
         */
        karmaconfig: {
            unit: {
                dir: '<%= build_dir %>',
                src: [
                  '<%= vendor_files.js %>',
                  '<%= html2js.app.dest %>',
                  '<%= test_files.js %>'
                ]
            }
        },

        /**
         * And for rapid development, we have a watch set up that checks to see if
         * any of the files listed below change, and then to execute the listed 
         * tasks when they do. This just saves us from having to type "grunt" into
         * the command-line every time we want to see what we're working on; we can
         * instead just leave "grunt watch" running in a background terminal. Set it
         * and forget it, as Ron Popeil used to tell us.
         *
         * But we don't need the same thing to happen for all the files. 
         */
        delta: {
            /**
             * By default, we want the Live Reload to work for all tasks; this is
             * overridden in some tasks (like this file) where browser resources are
             * unaffected. It runs by default on port 35729, which your browser
             * plugin should auto-detect.
             */
            options: {
                livereload: true
            },

            /**
             * When the Gruntfile changes, we just want to lint it. In fact, when
             * your Gruntfile changes, it will automatically be reloaded!
             */
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile'],
                options: {
                    livereload: false
                }
            },

            /**
             * When our JavaScript source files change, we want to run lint them and
             * run our unit tests.
             */
            jssrc: {
                files: [
                  '<%= app_files.js %>'
                ],
                tasks: ['jshint:src', 'karma:unit:run', 'copy:build_appjs']
            },


            /**
             * When assets are changed, copy them. Note that this will *not* copy new
             * files, so this is probably not very useful.
             */
            assets: {
                files: [
                  'src/assets/**/*'
                ],
                tasks: ['copy:build_assets']
            },

            /**
             * When index.html changes, we need to compile it.
             */
            html: {
                files: ['<%= app_files.html %>'],
                tasks: ['index:build']
            },

            /**
             * When our templates change, we only rewrite the template cache.
             */
            tpls: {
                files: [
                  '<%= app_files.atpl %>'
                ],
                tasks: ['html2js']
            },

            /**
             * When the CSS files change, we need to compile and minify them.
             */
            less: {
                files: ['src/**/*.less'],
                tasks: ['less:build']
            },

            /**
             * When a JavaScript unit test file changes, we only want to lint it and
             * run the unit tests. We don't want to do any live reloading.
             */
            jsunit: {
                files: [
                  '<%= app_files.jsunit %>'
                ],
                // don't want to lint test files
                //tasks: ['jshint:test', 'karma:unit:run'],
                tasks: [ 'karma:unit:run'],
                options: {
                    livereload: true
                }
            }

        },

        complexity: {
            generic: {
                src: [
                  '<%= app_files.js %>'
                ],
                exclude: [],
                options: {
                    breakOnErrors: false,
                    jsLintXML: 'report.xml',         // create XML JSLint-like report
                    checkstyleXML: 'checkstyle.xml', // create checkstyle report
                    errorsOnly: false,               // show only maintainability errors
                    cyclomatic: [3, 7, 12],          // or optionally a single value, like 3
                    halstead: [8, 15, 30],           // or optionally a single value, like 8
                    maintainability: 100,
                    hideComplexFunctions: false,      // only display maintainability
                    broadcast: false                 // broadcast data over event-bus
                }
            }
        }


    };

    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

    /**
     * In order to make it safe to just compile or copy *only* what was changed,
     * we need to ensure we are starting from a clean, fresh build. So we rename
     * the `watch` task to `delta` (that's why the configuration var above is
     * `delta`) and then add a new task called `watch` that does a clean build
     * before watching for changes.
     */

    grunt.renameTask('watch', 'delta');
    grunt.registerTask('watch', ['build', 'karma:unit', 'delta']);

    /*
    * the 'live' task gets your app running and starts brower and calls 'watch'
    */
    grunt.registerTask('live', ['connect:livereload', 'watch']);

    /**
     * The default task is to build and compile.
     */
    grunt.registerTask('default', ['build', 'compile']);

    /**
     * The `build` task gets your app ready to run for development and testing.
     */
    grunt.registerTask('build', [
      'clean',
      'html2js',
      'jshint',
      //'complexity:generic',
      'less:build',
      'concat:build_css',
      'copy:build_app_assets',
      'copy:build_app_json',
      'copy:build_app_lib',
      'copy:build_vendor_assets',
      'copy:build_vendor_fonts',
      'copy:build_appjs',
      'copy:build_vendorjs',
      'index:build',
      'karmaconfig',
      'karma:continuous'
    ]);

    /**
     * The `compile` task gets your app ready for deployment by concatenating and
     * minifying your code.
     */
    grunt.registerTask('compile', [
      'build',
      'less:compile',
      //'ngmin',
      'ngAnnotate',
      'copy:compile_assets',
      'copy:compile_json',
      'copy:compile_vendorjs',
      'concat:compile_js',
      'uglify',
      'index:compile'
    ]);

    /**
     * A utility function to get all app JavaScript sources.
     */
    function filterForJS(files) {
        return files.filter(function (file) {
            return file.match(/\.js$/);
        });
    }
    /**
     * A utility function to get all app CSS sources.
     */
    function filterForCSS(files) {
        return files.filter(function (file) {
            return file.match(/\.css$/);
        });
    }

    /** 
     * The index.html template includes the stylesheet and javascript sources
     * based on dynamic names calculated in this Gruntfile. This task assembles
     * the list into variables for the template to use and then runs the
     * compilation.
     */
    grunt.registerMultiTask('index', 'Process index.html template', function () {
        var dirRE = new RegExp('^(' + grunt.config('build_dir') + '|' + grunt.config('compile_dir') + ')\/', 'g');
        var jsFiles = filterForJS(this.filesSrc).map(function (file) {
            return file.replace(dirRE, '');
        });
        var cssFiles = filterForCSS(this.filesSrc).map(function (file) {
            return file.replace(dirRE, '');
        });

        grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
            process: function (contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config('pkg.version')
                    }
                });
            }
        });
    });

    /**
     * In order to avoid having to specify manually the files needed for karma to
     * run, we use grunt to manage the list for us. The `karma/*` files are
     * compiled as grunt templates for use by Karma. Yay!
     */
    grunt.registerMultiTask('karmaconfig', 'Process karma config templates', function () {
        var jsFiles = filterForJS(this.filesSrc);

        grunt.file.copy('karma/karma-unit.tpl.js', grunt.config('build_dir') + '/karma-unit.js', {
            process: function (contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles
                    }
                });
            }
        });
    });

};
