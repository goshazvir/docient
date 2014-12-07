(function() {
	module.exports = function(grunt) {

		grunt.initConfig({

			concat: {
				main: {
					src: [
						'src/js/libs/jquery.js',
						'src/js/libs/modernizr.min.js',
						'src/js/libs/jquery-1.11.0.min.js',
						'src/js/libs/jquery-ui-1.10.4.custom.min.js',
						'src/js/libs/jquery.ui.touch-punch.min.js',
						'src/js/libs/jquery.mousewheel.min.js',
						'src/js/libs/jquery.mCustomScrollbar.min.js',
						'src/js/libs/jquery.scrollTo.js',
						'src/js/libs/jquery.raty.js',
						'src/js/libs/jquery.tooltipster.min.js',
						'src/js/cf_elements.js',
						'src/js/placeholder_fix.js',
						'src/js/docient.js',
						'src/js/common.js'
					],
					dest: 'build/js/scripts.js'
				}
			},

			uglify: {
				main: {
					files: {
						'build/js/scripts.min.js': '<%= concat.main.dest %>'
					}
				}
			},

			includes: {
				files: {
					src: ["src/html/*.html"],
					dest: "build/html",
					flatten: true,
					cwd: ".",
					options: {
						silent: false,
						filenamePrefix: "../includes/",
						filenameSuffix: ".html"
					}
				}
			},

			clean: {
				files: ["build/html/_*.html", "build/js/*.js", "!build/js/*.min.js"]
			},

			copy: {
				main: {
					files: [
						{
							expand: true,
							cwd: "src/img/",
							src: ["**"],
							dest: "build/img"
						},
						{
							expand: true,
							cwd: "src/html/*.html",
							src: ["**"],
							dest: "build/html/"
						},{
							expand: true,
							cwd: "src/fonts",
							src: ["**"],
							dest: "build/fonts"
						},{
							expand: true,
							cwd: "src/css",
							src: ["**"],
							dest: "build/css"
						}, {
							expand: true,
							cwd: "src/css/",
							src: ["**"],
							dest: "build/css/"
						}
					]
				}
			},

			watch: {
				files: ["src/html/*.html", "src/includes/*.html", "src/css/*.css", "src/js/*.js", "src/js/libs/*.js", "src/img/", "src/fonts/", "src/img/icons*.png"],
				tasks: ['includes', 'concat', 'uglify', 'copy', 'clean']
			}

		});
		require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-contrib-uglify');

		grunt.registerTask('default', ['watch']);
		return grunt.registerTask("a", ['includes', 'concat', 'uglify', 'copy', 'clean']);

	};

}).call(this);
