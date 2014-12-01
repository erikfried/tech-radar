'use strict';
module.exports = function react(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-react');;
    // Options
    return {
        dynamic_mappings: {
            files: [
                {
                    expand: true,
                    cwd: 'public/jsx',
                    src: ['**/*.jsx'],
                    dest: 'public/js',
                    ext: '.js'
                }
            ]
        }
    };
};
