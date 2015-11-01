/*global module: false, require: false */

module.exports = function( grunt ) {
    'use strict';

    require( 'jit-grunt' )( grunt, {} );

    grunt.initConfig( {
        uglify: {
            dist: {
                options: {
                    sourceMap: false
                },
                files: {
                    'dist/customiseControls.min.js': 'dist/customiseControls.js'
                }
            }
        },
        watch: {
            options: {
                spawn: false,
                interrupt: false,
                debounceDelay: 50
            },
            js: {
                files: [
                    'dist/*.js'
                ],
                tasks: [
                    'js'
                ]
            }
        }
    } );

    grunt.registerTask( 'default', [
        'js'
    ] );
    grunt.registerTask( 'js', [
        'uglify:dist'
    ] );
};
