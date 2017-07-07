module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',              
            'js/**/*.js'                          
             ],
        dest: 'build/js/<%= pkg.name %>.min.js'
      }
    },

    cssmin: {
        options: {
            mergeIntoShorthands: false,
            roundingPrecision: -1
        },
        target: {
            files: {
                'build/css/output.css': [
                    'node_modules/bootstrap/dist/css/bootstrap.min.css',
                    'ode_modules/bootstrap/dist/css/bootstrap-theme.min.css',
                    'css/**/*.css'                    
                ]
            }
        }
    },
      
    watch: {
        scripts: {
            files: ['js/*.js', 'css/**/*.css'],
            tasks: ['dev'],
            options: {
                spawn: false,
            },
        },
    }  
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');    
  grunt.loadNpmTasks('grunt-contrib-cssmin');        

  // Default task(s).
  grunt.registerTask('dev', ['uglify', 'cssmin']);
  grunt.registerTask('default', ['watch']);

};