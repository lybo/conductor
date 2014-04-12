module.exports = function(grunt) {
  grunt.initConfig({
    shell: {
      'mocha-phantomjs': {
        command: 'mocha-phantomjs -R dot http://localhost/conductor/testrunner.html',
        options: {
          stdout: true,
          stderr: true
        }
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "app",
          mainConfigFile: "require.conf.js",
          include: "./app.js",
          out: "app/app.min.js"
        }
      }
    },
    watch: {
      jsFiles: {
        files: ['app/**/*.js', 'test.js', 'require.conf.js'],
        tasks: ['shell:mocha-phantomjs']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.registerTask('develop', ['shell:mocha-phantomjs', 'watch']);
  grunt.registerTask('built', ['requirejs']);
};