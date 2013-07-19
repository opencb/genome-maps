/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        meta: {
            version: '3.1.1',
            commons: {
                dir: '../js-common-libs/',
                //genome viewer contains cellbse and utils
                'genomeviewer': {
                    version: '1.0.2',
                    dir: '<%= meta.commons.dir %>build/genome-viewer/<%= meta.commons.genomeviewer.version %>/'
                },
                //opencga does not contains utils
                opencga: {
                    version: '1.0.0',
                    dir: '<%= meta.commons.dir %>build/opencga/<%= meta.commons.opencga.version %>/'
                }
            }
        },
        banner: '/*! PROJECT_NAME - v<%= meta.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* http://PROJECT_WEBSITE/\n' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
            'OpenCB; Licensed GPLv2 */\n',
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            build: {
                src: [
                    'src/gm-config.js',
                    'src/gm-plugins-config.js',
                    'gm-navigation-bar.js',
                    'gm-status-bar.js',
                    'src/genome-maps.js'
                ],
                dest: 'build/<%= meta.version %>/genome-maps-<%= meta.version %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            build: {
                src: '<%= concat.build.dest %>',
                dest: 'build/<%= meta.version %>/genome-maps-<%= meta.version %>.min.js'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true
                }
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            lib_test: {
                src: ['lib/**/*.js', 'test/**/*.js']
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.lib_test.src %>',
                tasks: ['jshint:lib_test', 'qunit']
            }
        },

        copy: {
            build: {
                files: [
                    {   expand: true, cwd: './', src: ['vendor/**'], dest: 'build/<%= meta.version %>/' },
                    {   expand: true, cwd: './', src: ['styles/**'], dest: 'build/<%= meta.version %>/' } // includes files in path and its subdirs
                ]
            },
            genomeviewer: {
                files: [
                    {   expand: true, cwd: '<%= meta.commons.genomeviewer.dir %>', src: ['genome-viewer*.js'], dest: 'vendor' }
                ]
            },
            opencga: {
                files: [
                    {   expand: true, cwd: '<%= meta.commons.opencga.dir %>', src: ['opencga*.js','worker*'], dest: 'vendor' }
                ]
            },
            styles: {
                files: [
                    {   expand: true, cwd: '<%= meta.commons.dir %>styles/', src: ['**'], dest: 'styles' },
                    {   expand: true, cwd: '<%= meta.commons.dir %>vendor/', src: ['jquery-ui-*custom/**'], dest: 'vendor' }
                ]
            }
        },
        clean: {
            build: ["build/<%= meta.version %>/"]
        },

        vendorPath: 'build/<%= meta.version %>/vendor',
        stylesPath: 'build/<%= meta.version %>/styles',
        htmlbuild: {
            build: {
                src: 'src/genome-maps.html',
                dest: 'build/<%= meta.version %>/',
                options: {
                    beautify: true,
                    scripts: {
                        'js': 'build/<%= meta.version %>/genome-maps-<%= meta.version %>.min.js',
                        'vendor': [
                            'build/<%= meta.version %>/vendor/jquery.min.js',
                            'build/<%= meta.version %>/vendor/underscore*.js',
                            'build/<%= meta.version %>/vendor/backbone*.js',
                            'build/<%= meta.version %>/vendor/jquery.mousewheel*.js',
                            'build/<%= meta.version %>/vendor/gl-matrix-min*.js',
                            'build/<%= meta.version %>/vendor/ChemDoodleWeb*.js',
                            'build/<%= meta.version %>/vendor/jquery.cookie*.js',
                            'build/<%= meta.version %>/vendor/purl*.js',
                            'build/<%= meta.version %>/vendor/jquery.sha1*.js',
                            'build/<%= meta.version %>/vendor/jquery.qtip*.js',
                            'build/<%= meta.version %>/vendor/rawdeflate*.js',
                            'build/<%= meta.version %>/vendor/jquery-ui-1.10.3*/js/jquery-ui*min.js',

                            'build/<%= meta.version %>/vendor/genome-viewer*.min.js',
                            'build/<%= meta.version %>/vendor/opencga*.min.js'
                        ]
                    },
                    styles: {
                        'css': ['<%= stylesPath %>/css/style.css'],
                        'vendor': [
                            'build/<%= meta.version %>/vendor/ChemDoodleWeb*.css',
                            'build/<%= meta.version %>/vendor/jquery.qtip*.css',
                            'build/<%= meta.version %>/vendor/jquery-ui-1.10.3*/css/**/jquery-ui*min.css'
                        ]
                    }
                }
            }
        },
        'curl-dir': {
            
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
//    grunt.loadNpmTasks('grunt-contrib-qunit');
//    grunt.loadNpmTasks('grunt-contrib-jshint');
//    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-curl');

    // Default task.
    grunt.registerTask('default', ['clean', 'concat', 'uglify', 'copy', 'htmlbuild']);
    grunt.registerTask('vendor', ['curl-dir']);

    // dependencies from js-common-libs
    grunt.registerTask('commons', ['copy:genomeviewer','copy:opencga','copy:styles']);

};
