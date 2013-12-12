/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        meta: {
            version: '3.1.6',
            jsorolla: {
                dir: '/lib/jsorolla/',
                //genome viewer contains cellbse and utils
                'genomeviewer': {
                    version: '1.0.3',
                    dir: '<%= meta.jsorolla.dir %>build/genome-viewer/<%= meta.jsorolla.genomeviewer.version %>/'
                },
                //opencga does not contains utils
                opencga: {
                    version: '1.0.0',
                    dir: '<%= meta.jsorolla.dir %>build/opencga/<%= meta.jsorolla.opencga.version %>/'
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
//                    'src/gm-config.js',
                    'src/gm-plugins-config.js',
                    'src/gm-navigation-bar.js',
                    'src/gm-status-bar.js',
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
        copy: {
            build: {
                files: [
                    {   expand: true, cwd: './src', src: ['gm-config.js'], dest: 'build/<%= meta.version %>/' },
                    {   expand: true, cwd: './<%= meta.jsorolla.dir %>', src: ['vendor/**'], dest: 'build/<%= meta.version %>/' },
                    {   expand: true, cwd: './<%= meta.jsorolla.dir %>', src: ['styles/**'], dest: 'build/<%= meta.version %>/' }, // includes files in path and its subdirs
                    {   expand: true, cwd: './<%= meta.jsorolla.genomeviewer.dir %>', src: ['genome-viewer*.js', 'gv-config.js'], dest: 'build/<%= meta.version %>/' },
                    {   expand: true, cwd: './<%= meta.jsorolla.opencga.dir %>', src: ['opencga*.js', 'worker*'], dest: 'build/<%= meta.version %>/' }
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
                            'build/<%= meta.version %>/vendor/underscore*.js',
                            'build/<%= meta.version %>/vendor/backbone*.js',
                            'build/<%= meta.version %>/vendor/jquery.min.js',
                            'build/<%= meta.version %>/vendor/bootstrap-*-dist/js/bootstrap.min.js',
                            'build/<%= meta.version %>/vendor/typeahead.min.js',
                            'build/<%= meta.version %>/vendor/jquery.mousewheel*.js',
                            'build/<%= meta.version %>/vendor/gl-matrix-min*.js',
                            'build/<%= meta.version %>/vendor/ChemDoodleWeb*.js',
                            'build/<%= meta.version %>/vendor/jquery.cookie*.js',
                            'build/<%= meta.version %>/vendor/purl*.js',
                            'build/<%= meta.version %>/vendor/jquery.sha1*.js',
                            'build/<%= meta.version %>/vendor/jquery.qtip*.js',
                            'build/<%= meta.version %>/vendor/rawdeflate*.js',
                            'build/<%= meta.version %>/vendor/xml2json.js',
//                            'build/<%= meta.version %>/vendor/jquery-ui-1.10.3*/js/jquery-ui*min.js'

                        ],
                        gv: [
                            'build/<%= meta.version %>/opencga*.min.js',
                            'build/<%= meta.version %>/genome-viewer*.min.js'
                        ],
                        gvconfig: [
                            'build/<%= meta.version %>/gv-config.js'
                        ]
                    },
                    styles: {
                        'css': ['<%= stylesPath %>/css/style.css'],
                        'vendor': [
                            'build/<%= meta.version %>/vendor/jquery.qtip*.css',
                            'build/<%= meta.version %>/vendor/ChemDoodleWeb*.css',
                            'build/<%= meta.version %>/vendor/bootstrap-*-dist/css/bootstrap.min.css',
                            'build/<%= meta.version %>/vendor/typeahead.js-bootstrap.css'
//                            'build/<%= meta.version %>/vendor/jquery-ui-1.10.3*/css/**/jquery-ui*min.css'
                        ]
                    }
                }
            }
        },
        'curl-dir': {

        },
        rename: {
            html: {
                files: [
                    {src: ['build/<%= meta.version %>/genome-maps.html'], dest: 'build/<%= meta.version %>/index.html'}
                ]
            }
        },
        hub: {
            all: {
                src: ['lib/jsorolla/Gruntfile.js'],
                tasks: ['opencga', 'gv']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-hub');

    grunt.registerTask('log-deploy', 'Deploy path info', function (version) {
        grunt.log.writeln("DEPLOY COMMAND: scp -r build/"+grunt.config.data.meta.version+" cafetero@mem16:/httpd/bioinfo/www-apps/genome-maps/");
    });

    // Default task.
    grunt.registerTask('default', ['clean', 'concat', 'uglify', 'hub:all', 'copy', 'htmlbuild', 'rename:html', 'log-deploy']);

};
