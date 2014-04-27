module.exports = function(grunt) {

  var baseUrl = 'http://vocabulary.remote/';
  //var baseUrl = 'http://localhost/~georgioslymperis/conductor/';


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
          "assets/css/style.css": "app/less/style.less"
        }
      }
    },
    'string-replace': {
      dist: {
        files: {
          'app/test/test.js': 'app/test/test.js',
          'index.html': 'index.html',
          'app/app.js': 'app/app.js',
          'app/util/features.js': 'app/util/features.js'
        },
        options: {
          replacements: [{
            pattern: /\/\*files\*\/(.*?)\/\*files\*\//g,
            replacement: function () {
              var files = grunt.file.expand({cwd:  'app/test/'}, '*');
              var testFiles = [];
              files.forEach(function (file) {
                if (file !== 'test.js') {
                  testFiles.push("'test/" + file.replace('.js', '') + "'");
                }
              });

              return "/*files*/" + testFiles.join(',') + "/*files*/";
            }
          },{
            pattern: /\<\!-- conductor: images -->(.*?)<\!-- \/conductor -->/g,
            replacement: function () {
              var images = grunt.file.expand({cwd:  'assets/images/'}, '*');

              var imagesMotified = [];
              images.forEach(function (file) {
                  imagesMotified.push("'assets/images/" + file + "'");
              });

              return "<!-- conductor: images --><script> window.preLoadedImages = [" + imagesMotified.join(',') + "]; </script><!-- /conductor -->";
            }
          },{
            pattern: /\/\* conductor: features \*\/(.*?)\/\* \/conductor \*\//g,
            replacement: function () {
              var controllers = grunt.file.expand({cwd:  'app/controller/'}, '*');

              var controllersMotified = [];
              controllers.forEach(function (file) {
                  controllersMotified.push("'controller/" + file.replace('.js', '') + "'");
              });

              return "/* conductor: features */" + controllersMotified.join(',') + "/* /conductor */";
            }
          }]
        }
      }
    },
    watch: {
      jsFiles: {
        files: ['app/**/*.js', 'require.conf.js', 'index.html'],
        tasks: ['string-replace', 'shell:mocha-phantomjs']
      },
      images: {
        files: ['assets/images/*'],
        tasks: ['string-replace']
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
  grunt.loadNpmTasks('grunt-string-replace');
  grunt.registerTask('develop', ['string-replace', 'shell:mocha-phantomjs', 'less', 'watch']);
  grunt.registerTask('built', ['requirejs']);
};