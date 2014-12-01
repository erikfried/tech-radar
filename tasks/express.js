'use strict';
module.exports = function express(grunt) {
	// Load task
    grunt.loadNpmTasks('grunt-express-server');;

	// Options
	return {
        options: {
            background: false,
            port: 8000
        },
        dev: {
            options: {
                script: 'index.js'
            }
        }
	};
};
