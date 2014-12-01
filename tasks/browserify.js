'use strict';


module.exports = function browserify(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-browserify');

	// Options
	return {
		admin: {
			files: {
                '.build/js/admin.js': ['public/js/admin.js']
			},
            options:      {
//                transform:  [ require('grunt-react').browserify ]

            }
		},
        main: {
			files: {
                '.build/js/app.js': ['public/js/app.js']
			},
            options:      {
//                transform:  [ require('grunt-react').browserify ]

            }
		}
	};
};
