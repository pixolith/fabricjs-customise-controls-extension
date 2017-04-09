'use strict';
module.exports = function(grunt) {
    require('jit-grunt')(grunt, {});

    grunt.initConfig({
        uglify: {
            dist: {
                options: {
                    sourceMap: false,
                },
                files: {
                    'dist/customiseControls.min.js': 'dist/customiseControls.js',
                },
            },
        },
        watch: {
            options: {
                spawn: false,
                interrupt: false,
                debounceDelay: 50,
            },
            js: {
                files: [
                    'dist/*.js',
                ],
                tasks: [
                    'js',
                ],
            },
        },
    });

    grunt.registerTask('default', [
        'js',
    ]);
    grunt.registerTask('js', [
        'uglify:dist',
    ]);
};
