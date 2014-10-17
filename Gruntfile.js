module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jsopkg: grunt.file.readJSON('lib/jsorolla/package.json'),
        def: {
            name: 'genome-maps',
            build: 'build/<%= pkg.version %>',
            jsorolla: 'lib/jsorolla'
        },

        concat: {
            dist: {
                src: [
                    'src/eva-adapter.js',
                    'src/eva-manager.js',
                    'src/gm-plugins-config.js',
                    'src/gm-plugins-config.js',
                    'src/gm-navigation-bar.js',
                    'src/gm-status-bar.js',
                    'src/genome-maps.js'
                ],
                dest: '<%= def.build %>/<%= def.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= def.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    '<%= def.build %>/<%= def.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        copy: {
            build: {
                files: [
                    {   expand: true, cwd: './<%= def.jsorolla %>', src: ['vendor/platform.js'], dest: '<%= def.build %>/'  },
                    {   expand: true, cwd: './<%= def.jsorolla %>', src: ['vendor/platform.js.map'], dest: '<%= def.build %>/'  },
                    {   expand: true, cwd: './<%= def.jsorolla %>', src: ['vendor/underscore-min.js'], dest: '<%= def.build %>/'  },
                    {   expand: true, cwd: './<%= def.jsorolla %>', src: ['vendor/backbone-min.js'], dest: '<%= def.build %>/'  },
                    {   expand: true, cwd: './<%= def.jsorolla %>', src: ['vendor/backbone-min.map'], dest: '<%= def.build %>/'  },
                    {   expand: true, cwd: './<%= def.jsorolla %>', src: ['vendor/font-awesome/**'], dest: '<%= def.build %>/'  },
                    {   expand: true, cwd: './<%= def.jsorolla %>', src: ['vendor/jquery.min.js'], dest: '<%= def.build %>/'  },
                    {   expand: true, cwd: './<%= def.jsorolla %>', src: ['vendor/jquery.qtip.min.css'], dest: '<%= def.build %>/'  },
                    {   expand: true, cwd: './<%= def.jsorolla %>', src: ['vendor/jquery.qtip.min.js'], dest: '<%= def.build %>/'  },
                    {   expand: true, cwd: './<%= def.jsorolla %>', src: ['vendor/jquery.mousewheel.min.js'], dest: '<%= def.build %>/'  },
                    {   expand: true, cwd: './<%= def.jsorolla %>', src: ['vendor/gl-matrix-min.js'], dest: '<%= def.build %>/'  },
                    {   expand: true, cwd: './<%= def.jsorolla %>', src: ['vendor/ChemDoodleWeb.css'], dest: '<%= def.build %>/'  },
                    {   expand: true, cwd: './<%= def.jsorolla %>', src: ['vendor/ChemDoodleWeb.js'], dest: '<%= def.build %>/'  },
                    {   expand: true, cwd: './<%= def.jsorolla %>', src: ['vendor/jquery.cookie.js'], dest: '<%= def.build %>/'  },
                    {   expand: true, cwd: './<%= def.jsorolla %>', src: ['vendor/purl.min.js'], dest: '<%= def.build %>/'  },
                    {   expand: true, cwd: './<%= def.jsorolla %>', src: ['vendor/jquery.sha1.js'], dest: '<%= def.build %>/'  },
                    {   expand: true, cwd: './<%= def.jsorolla %>', src: ['vendor/ext-5/**'], dest: '<%= def.build %>/'  },
                    {   expand: true, cwd: './<%= def.jsorolla %>', src: ['vendor/cryptojs/**'], dest: '<%= def.build %>/'  },


                    {   expand: true, cwd: './<%= def.jsorolla %>', src: ['styles/**'], dest: '<%= def.build %>/'  },
                    {   expand: true, cwd: './<%= def.jsorolla %>/src/lib', src: ['worker*'], dest: '<%= def.build %>/' },

                    {   expand: true, cwd: './src', src: ['gm-config.js'], dest: '<%= def.build %>/' },
                    {   expand: true, cwd: './src', src: ['components/**'], dest: '<%= def.build %>/' },

                    {   expand: true, cwd: './<%= def.jsorolla %>/build/<%= jsopkg.version %>/genome-viewer/', src: ['genome-viewer*.js', 'gv-config.js'], dest: '<%= def.build %>/' }
                ]
            }
        },
        clean: {
            dist: ['<%= def.build %>/']
        },
        processhtml: {
            options: {
                strip: true
            },
            dist: {
                files: {
                    '<%= def.build %>/index.html': ['src/<%= def.name %>.html']
                }
            }
        },
        hub: {
            'genome-viewer': {
                src: ['lib/jsorolla/Gruntfile.js'],
                tasks: ['gv']
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-hub');

    grunt.registerTask('log-deploy', 'Deploy path info', function (version) {
        grunt.log.writeln("DEPLOY COMMAND: scp -r build/" + grunt.config.data.pkg.version + " cafetero@mem16:/httpd/bioinfo/www-apps/" + grunt.config.data.def.name + "/");
    });

    // Default task.
    grunt.registerTask('default', ['hub','clean', 'concat', 'uglify', 'copy', 'processhtml', 'log-deploy']);

};
