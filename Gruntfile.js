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
        lineending: {
            options: {
                eol: 'lf',
                overwrite: true
            },
            js: {
                files: {
                    '': [ 'assets/js/*' ]
                }
            }
        },
        watch: {
            // These options slow down the Grunt watcher so that it does not eat so much CPU
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
        },
        release: {
            options: {
                github: {
                    repo: 'pixolith/fabricjs-customise-controls-extension' //put your user/repo here

                },
                npm: false
            }
        }
    } );

    grunt.registerTask( 'default', [
        'js'
    ] );
    grunt.registerTask( 'js', [
        'uglify:dist',
        'lineending:js'
    ] );

    grunt.registerTask( 'release-the-shit', [
        'release'
    ] );
};
