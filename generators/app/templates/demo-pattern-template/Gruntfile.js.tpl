module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    bower: {
        target: {
            rjsConfig: 'config.js'
        }
    },
    requirejs: {
        compile: {
            options: {
                name: '<%= patternNameLower %>',
                mainConfigFile: 'config.js',
                out: "<%= patternNameLower %>-packed.js"
            }
        }
    },
    bowerbuster: {
        path: 'bowerbuster.json'
    },
    buster: {
        test: {
            config: 'buster.js'
        },
        server: {
            port: 1111
        }
    }
  });

  grunt.loadNpmTasks('grunt-requirejs');
  grunt.loadNpmTasks('grunt-bower-requirejs');
  grunt.loadNpmTasks('grunt-bower-busterjs');
  grunt.loadNpmTasks('grunt-buster');

  grunt.registerTask('default', ['bower', 'requirejs']);
  grunt.registerTask('test', ['bower', 'bowerbuster', 'buster']);
};
