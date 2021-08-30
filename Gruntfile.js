module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        copy: {
            font: {
                files: [
                    {
                        cwd: 'src',
                        src: [
                            'Androgyne.ttf.*',
                        ],
                        expand: true,
                        dest: 'dist/'
                    },
                ]
            }
        },
        uglify: {
            main: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/*.js'],
            options: {
                "eqnull": true,
                "globals": {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        'dart-sass': {
            target: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'dist/enjoyhint.css': 'src/jquery.enjoyhint.scss'
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-dart-sass');

    grunt.registerTask("default", ["concat", "copy:font", "uglify", "dart-sass"]);

};
