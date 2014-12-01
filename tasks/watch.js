'use strict';


module.exports = function watch(grunt) {
	// Load task
    grunt.loadNpmTasks('grunt-contrib-watch');;

	// Options
	return {
        configFiles: {
            files: [ 'Gruntfile.js', 'tasks/*.js' ],
            options: {
                reload: true
            }
        },
        jsx: {
            files: ['public/jsx/**/*.jsx'],
            tasks: ['react', 'build']
        },
		scripts: {
			files: ['public/js/**/*.js'],
            tasks: ['build'],
			options: {

            }
		},
        serverSide: {
            files: ['index.js', 'controllers/**/*.js', 'lib/**/*.js'],
            tasks: ['build']
        },
        test : {
            files: ['test/**/*.js'],
            tasks: ['test']
        }
	};
};
