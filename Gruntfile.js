module.exports = function(grunt){
  grunt.initConfig({
    concat: {
      dist: {
        src: [
          '_lib/jquery/dist/jquery.js',
          '_lib/jquery-pjax/jquery.pjax.js',
          '_src/js/base.js',
          '_src/js/calendar.js',
          '_src/js/calendar.data.js',
          '_src/js/calendar.i18n.js',
          '_src/js/ana.js',
          '_src/js/ready.js'
        ],
        dest: '_dist/js/zen.js'
      }
    },
    uglify:{
      dist: {
        src: ['<%= concat.dist.dest %>'],
        dest: '_dist/js/zen.min.js'
      }
    },
    less: {
      dist: {
        src: [
          '_src/css/zen.less'
        ],
        dest: '_dist/css/zen.css'
      }
    },
    cssmin: {
      dist: {
        src: '<%= less.dist.dest %>',
        dest: '_dist/css/zen.min.css'
      }
    },
    copy: {
      dist: {
        expand: true,
        cwd: '_src/img/',
        src: ['**'],
        dest: '_dist/img/'
      },
      source: {
        expand: true,
        cwd: '_dist/',
        src: ['**'],
        dest: 'source/'
      }
    },
    clean: {
      dist: ['_dist'],
      source: ['source/*'],
      tmp: [
        'source/js/zen.js',
        'source/css/zen.css'
      ]
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('dist', ['clean:dist', 
                              'copy:dist', 
                              'concat:dist',
                              'uglify:dist',
                              'less:dist',
                              'cssmin:dist']);
  grunt.registerTask('source', ['clean:source', 'copy:source', 'clean:tmp']);
  grunt.registerTask('default', ['dist', 'source']);
};
