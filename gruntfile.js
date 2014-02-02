module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jsfiles: {
      client: [
        '*.js',
        'src/**/*.js',
        'examples/*.js',
        'test/*.js',
        '!lib/bower_components/**'
      ]
    },

    jshint: {
      options: {jshintrc: '.jshintrc'},
      all: ['<%= jsfiles.client %>']
    },

    watch: {
      js: {
        files: ['<%= jsfiles.client %>'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['jshint']);
  grunt.registerTask('dev', ['build', 'watch']);

  grunt.registerTask('default', ['build']);

};
