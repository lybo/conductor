module.exports = function(grunt) {

  //var baseUrl = 'http://localhost/conductor/';
  var baseUrl = 'http://localhost/~georgioslymperis/conductor/';
  

  grunt.initConfig({
    shell: {
      'mocha-phantomjs': {
        command: 'mocha-phantomjs -R dot ' + baseUrl + 'testrunner.html',
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
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          // target.css file: source.less file
          "app/css/style.css": "app/less/style.less"
        }
      }
    },
    watch: {
      jsFiles: {
        files: ['app/**/*.js', 'test.js', 'require.conf.js', 'index.html'],
        tasks: ['shell:mocha-phantomjs']
      },
      styles: {
        // Which files to watch (all .less files recursively in the less directory)
        files: ['app/**/*.less'],
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.registerTask('develop', ['shell:mocha-phantomjs', 'watch']);
  grunt.registerTask('built', ['requirejs']);
};